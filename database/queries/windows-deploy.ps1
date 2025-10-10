# run-sql.ps1

# --- Import config file ---
. "$PSScriptRoot\mysql-config.ps1"

function Run-SqlFile {
    param($file)
    Write-Host "Running: $file"

    # Read the SQL file content and pipe it to mysql.exe
    Get-Content $file | & $mysqlExe --user=$user --password=$password $database

    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed: $file" -ForegroundColor Red
        exit 1
    } else {
        Write-Host "✅ Success: $file" -ForegroundColor Green
    }
}

# --- 1. Run DDL file(s) ---
Get-ChildItem -Path $baseDir -Recurse -Filter "*ddl*.sql" | Sort-Object FullName | ForEach-Object {
    
    Run-SqlFile $_.FullName
}

# --- 2. Run DML file(s) ---
Get-ChildItem -Path $baseDir -Recurse -Filter "*dml*.sql" | Sort-Object FullName | ForEach-Object {
    
    Run-SqlFile $_.FullName
}

# --- 3. Run all other SQL files ---
Get-ChildItem -Path $baseDir -Recurse -Filter "*.sql" | Where-Object {
    $_.Name -notmatch "ddl" -and $_.Name -notmatch "dml"
} | Sort-Object FullName | ForEach-Object {
    
    Run-SqlFile $_.FullName
}
