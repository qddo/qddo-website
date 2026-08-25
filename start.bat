@echo off
REM Inicia um servidor local na porta 8080 para visualizar o site.
REM Uso: clique 2x neste arquivo (start.bat)

cd /d "%~dp0"

echo.
echo  🚀 QDDO Central Hub — servidor local
echo.
echo     Abra no navegador: http://localhost:8080
echo     Para parar: Ctrl + C
echo.

where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  python -m http.server 8080
  goto :eof
)

where py >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  py -m http.server 8080
  goto :eof
)

where npx >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  npx serve -l 8080 .
  goto :eof
)

echo  Nenhum servidor encontrado. Instale Python 3 ou Node.js.
pause
