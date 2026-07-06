# 187web-compiler.ps1 — Master Prompt Manifest compiler (Windows)
# Detects power mode, routes folder → persona, emits JSON for agent injection.
param(
    [string]$Prompt = "",
    [switch]$List,
    [switch]$Quiet,
    [switch]$Write,
    [switch]$Emit,
    [string]$Manifest = "",
    [string]$RelayUrl = ""
)

$ErrorActionPreference = "Stop"
$SkillDir = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
if (-not $SkillDir) { $SkillDir = Split-Path $PSScriptRoot -Parent }

$Registry = Join-Path $env:USERPROFILE ".187web\prompts\MANIFEST.xml"
$Fallback = Join-Path $PSScriptRoot "..\references\MANIFEST.xml" | Resolve-Path -ErrorAction SilentlyContinue

if ($Manifest) {
    $ManifestPath = $Manifest
} elseif (Test-Path $Registry) {
    $ManifestPath = $Registry
} elseif (Test-Path $Fallback) {
    $ManifestPath = $Fallback
} else {
    Write-Output '{"error":"MANIFEST.xml not found"}'
    exit 1
}

function Write-Log($msg) {
    if (-not $Quiet) { Write-Host "[187web-compiler] $msg" -ForegroundColor DarkGray }
}

function Get-PowerMode {
    if ($env:187WEB_POWER_MODE) { return $env:187WEB_POWER_MODE }

    $cores = [Environment]::ProcessorCount
    $onBattery = $false
    try {
        $batt = Get-CimInstance -ClassName Win32_Battery -ErrorAction SilentlyContinue
        if ($batt -and $batt.BatteryStatus -eq 1) { $onBattery = $true }
    } catch {}

    $hasGpu = $false
    try {
        $hasGpu = @(Get-CimInstance Win32_VideoController -ErrorAction SilentlyContinue |
            Where-Object { $_.Name -notmatch 'Microsoft|Basic' }).Count -gt 0
    } catch {}

    if ($onBattery -and $cores -lt 8) { return "low" }
    if ($hasGpu -and $cores -ge 8) { return "high" }
    if ($cores -ge 8) { return "high" }
    if ($cores -lt 4) { return "low" }
    return "standard"
}

$powerMode = Get-PowerMode
$cwd = if ($env:187WEB_CWD) { $env:187WEB_CWD } else { (Get-Location).Path }
Write-Log "power_mode=$powerMode cwd=$cwd"

[xml]$xml = Get-Content -Path $ManifestPath -Encoding UTF8

# Collect all prompts
$allPrompts = @()
foreach ($layer in $xml.manifest.layer) {
    foreach ($p in $layer.prompt) {
        $nt = $p.neuro_toxin
        $neuro = @{}
        if ($nt) {
            foreach ($attr in $nt.Attributes) { $neuro[$attr.Name] = $attr.Value }
        }
        $vars = @($p.vars.var | ForEach-Object { $_.name } | Where-Object { $_ })
        $allPrompts += [PSCustomObject]@{
            id        = $p.id
            alias     = $p.alias
            layer     = $layer.id
            layer_name = $layer.name
            skill     = if ($p.skill) { $p.skill } elseif ($p.skill_ref) { $p.skill_ref } else { $layer.skill }
            persona   = $p.persona
            power     = if ($p.power) { $p.power } else { "any" }
            directive = ($p.directive -as [string]).Trim()
            vars      = $vars
            neuro_toxin = $neuro
        }
    }
}

if ($List) {
    @{ prompts = @($allPrompts | ForEach-Object { $_.id }) } | ConvertTo-Json -Depth 4
    exit 0
}

$selectedId = $Prompt
if (-not $selectedId) {
    $normCwd = $cwd -replace '\\', '/'
    foreach ($route in $xml.manifest.folder_routing.route) {
        if ($normCwd -like "*$($route.path)*") {
            $selectedId = $route.prompt
            break
        }
    }
}

if (-not $selectedId) {
    $modeNode = $xml.manifest.power_routing.mode | Where-Object { $_.id -eq $powerMode } | Select-Object -First 1
    if ($modeNode) { $selectedId = $modeNode.default_prompt }
}

function Test-PowerOk($p) {
    return ($p.power -eq "any") -or ($p.power -eq $powerMode)
}

$chosen = $allPrompts | Where-Object { $_.id -eq $selectedId } | Select-Object -First 1
if (-not $chosen) {
    $pool = $allPrompts | Where-Object { Test-PowerOk $_ }
    $chosen = $pool | Select-Object -First 1
}

if (-not $chosen) {
    @{ error = "no matching prompt"; power_mode = $powerMode } | ConvertTo-Json
    exit 1
}

$out = @{
    ecosystem        = "187web"
    manifest_version = $xml.manifest.version
    power_mode       = $powerMode
    cwd              = $cwd
    prompt_id        = $chosen.id
    alias            = $chosen.alias
    layer            = $chosen.layer
    layer_name       = $chosen.layer_name
    skill            = $chosen.skill
    persona          = $chosen.persona
    directive        = $chosen.directive
    vars             = $chosen.vars
    neuro_toxin      = $chosen.neuro_toxin
    compiler         = "187web-compiler.ps1"
    compiled_at      = (Get-Date).ToUniversalTime().ToString("o")
}

$json = $out | ConvertTo-Json -Depth 6

$stateDir = Join-Path $env:USERPROFILE ".187web"
if ($Write -or $Emit) {
    New-Item -ItemType Directory -Force -Path $stateDir | Out-Null
    $lastFile = Join-Path $stateDir "last-compile.json"
    Set-Content -Path $lastFile -Value $json -Encoding UTF8
    Write-Log "wrote $lastFile"
}

if ($Emit) {
    $relay = if ($RelayUrl) { $RelayUrl } else { $env:E187WEB_RELAY_URL }
    if (-not $relay) { $relay = "http://localhost:18780" }
    try {
        Invoke-RestMethod -Uri "$relay/compile" -Method POST -Body $json -ContentType "application/json" | Out-Null
        Write-Log "emitted to $relay/compile"
    } catch {
        Write-Log "emit failed (relay offline?): $_"
    }
}

$json