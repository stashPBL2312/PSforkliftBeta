@echo off
setlocal

REM Usage: double-click or run from terminal:
REM   start_server.bat [port]
REM If [port] is omitted, defaults to 3000.

set "PORT=%~1"
if "%PORT%"=="" set "PORT=3000"

REM Go to the directory of this script (project root)
pushd "%~dp0"

echo Starting Forklift Service server on http://localhost:%PORT%/
echo Admin panel will be enabled at /admin

REM Launch the server in a new console window and keep it open
start "Forklift Server" cmd /k "set ADMIN_ENABLED=1 && set PORT=%PORT% && node server.js"

popd
endlocal