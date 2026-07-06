# install-revivescan.ps1 — Phase I hook: recompile persona on directory change
param([switch]$Uninstall)

$MarkerStart = "# >>> 187web revivescan >>>"
$MarkerEnd = "# <<< 187web revivescan <<<"
$Compiler = (Resolve-Path (Join-Path $PSScriptRoot "187web-compiler.ps1")).Path

$Hook = @"
$MarkerStart
`$global:187web_last_pwd = `$null
function global:187web-revivescan {
  if (`$global:187web_last_pwd -eq `$PWD) { return }
  `$global:187web_last_pwd = `$PWD
  & "$Compiler" -Quiet -Write -Emit | Out-Null
}
function global:prompt {
  187web-revivescan
  "PS `$((Get-Location).Path)> "
}
$MarkerEnd
"@

$profile = $PROFILE.CurrentUserAllHosts
$dir = Split-Path $profile -Parent
if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }

$content = if (Test-Path $profile) { Get-Content $profile -Raw } else { "" }

if ($Uninstall) {
  if ($content -match [regex]::Escape($MarkerStart)) {
    $pattern = "(?s)$([regex]::Escape($MarkerStart)).*$([regex]::Escape($MarkerEnd))\r?\n?"
    $content = [regex]::Replace($content, $pattern, "")
    Set-Content -Path $profile -Value $content.TrimEnd() -Encoding UTF8
    Write-Host "Removed 187web revivescan from $profile"
  } else {
    Write-Host "No revivescan hook found in $profile"
  }
  exit 0
}

if ($content -match [regex]::Escape($MarkerStart)) {
  Write-Host "Revivescan already installed in $profile"
  exit 0
}

Add-Content -Path $profile -Value "`n$Hook" -Encoding UTF8
Write-Host "Installed 187web revivescan → $profile"
Write-Host "Reload: . `$PROFILE"
Write-Host "Manual: 187web-revivescan"