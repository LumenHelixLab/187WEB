# 187web installer for Windows (PowerShell 5.1+ / PowerShell 7).
# Run from the root of the cloned 187webdesign repository:
#   .\install.ps1

$ErrorActionPreference = "Stop"

$RepoDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$BinDir = Join-Path $env:USERPROFILE ".187web\bin"
$PromptsDir = Join-Path $env:USERPROFILE ".187web\prompts"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "         187web CLI installer           " -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

New-Item -ItemType Directory -Force -Path $BinDir | Out-Null
New-Item -ItemType Directory -Force -Path $PromptsDir | Out-Null

Write-Host "> Installing manifest registry..." -ForegroundColor DarkGray
Copy-Item (Join-Path $RepoDir ".claude\skills\187web-manifest\references\MANIFEST.xml") $PromptsDir -Force

Write-Host "> Installing compiler and hook scripts..." -ForegroundColor DarkGray
Copy-Item (Join-Path $RepoDir ".claude\skills\187web-manifest\scripts\187web-compiler.ps1") $BinDir -Force
Copy-Item (Join-Path $RepoDir ".claude\skills\187web-manifest\scripts\install-compiler-hook.ps1") $BinDir -Force

$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
$pathParts = $userPath -split ";" | ForEach-Object { $_.TrimEnd("\\") }
if ($pathParts -notcontains $BinDir.TrimEnd("\\")) {
    Write-Host "> Adding $BinDir to your user PATH..." -ForegroundColor DarkGray
    [Environment]::SetEnvironmentVariable("Path", "$userPath;$BinDir", "User")
    $env:Path = "$env:Path;$BinDir"
} else {
    Write-Host "> $BinDir is already on PATH." -ForegroundColor DarkGray
}

Write-Host ""
Write-Host "OK 187web installed to $BinDir" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:"
Write-Host "  1. Install the cd hook:  .\install-compiler-hook.ps1"
Write-Host "  2. Run the compiler:     .\187web-compiler.ps1 -List"
Write-Host ""
