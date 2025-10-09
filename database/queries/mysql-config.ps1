# mysql-config.ps1

# --- Basic config ---
$mysqlExe = "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"
$baseDir = Split-Path -Parent $MyInvocation.MyCommand.Definition  # points to 'queries' folder

# --- Read credentials from environment variables ---
# Set these once in your PowerShell or system environment:
#   $env:MYSQL_USER="root"
#   $env:MYSQL_PASSWORD="your_password"
#   $env:MYSQL_DATABASE="your_database"

$user = $env:MYSQL_USER
$password = $env:MYSQL_PASSWORD
$database = $env:MYSQL_DATABASE

if (-not $user -or -not $password -or -not $database) {
    Write-Host "❌ Missing environment variables MYSQL_USER, MYSQL_PASSWORD, or MYSQL_DATABASE" -ForegroundColor Red
    Write-Host "Set these once in your PowerShell or system environment" -ForegroundColor Yellow
    exit 1
}
