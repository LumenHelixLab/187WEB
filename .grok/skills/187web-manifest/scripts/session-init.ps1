# session-init.ps1 — Phase I + IV: PLAN.md loop + compile + emit
param(
    [string]$ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..\..")).Path
)

$Plan = Join-Path $ProjectRoot "PLAN.md"
$Compiler = Join-Path $PSScriptRoot "187web-compiler.ps1"
$Relay = Join-Path $PSScriptRoot "telemetry-relay.mjs"

Write-Host "`n=== 187web Session Init ===" -ForegroundColor Cyan

if (Test-Path $Plan) {
    Write-Host "`n--- PLAN.md ---" -ForegroundColor DarkGray
    Get-Content $Plan | Select-Object -First 25
} else {
    Write-Host "PLAN.md not found at $Plan" -ForegroundColor Yellow
}

# Start relay if not running
try {
    Invoke-RestMethod -Uri "http://localhost:18780/" -TimeoutSec 1 | Out-Null
} catch {
    if (Get-Command node -ErrorAction SilentlyContinue) {
        Write-Host "Starting telemetry relay on :18780..." -ForegroundColor DarkGray
        Start-Process -WindowStyle Hidden node -ArgumentList $Relay
        Start-Sleep -Seconds 1
    }
}

Write-Host "`n--- Compiler ---" -ForegroundColor DarkGray
& $Compiler -Write -Emit
Write-Host "`nOmniQube: http://localhost:3000/omniqube.html (with dev server)" -ForegroundColor Green
Write-Host "Relay SSE: http://localhost:18780/events`n" -ForegroundColor Green