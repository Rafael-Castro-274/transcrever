@echo off
title Transcrever - servidor local
cd /d "%~dp0"
echo.
echo  ============================================
echo   Transcrever. - audio para texto, local
echo  ============================================
echo.
echo  Abrindo no navegador: http://localhost:8737
echo  Deixe esta janela aberta enquanto usa o app.
echo  Para fechar, feche esta janela.
echo.
start "" "http://localhost:8737"
python -m http.server 8737 --bind 127.0.0.1
pause
