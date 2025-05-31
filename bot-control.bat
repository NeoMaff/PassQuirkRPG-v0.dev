@echo off
title PassQuirk RPG - Control del Bot
color 0A

:menu
cls
echo ===================================
echo    CONTROL DEL BOT PASQUIRK RPG    
echo ===================================
echo 1. Iniciar bot
echo 2. Detener bot
echo 3. Reiniciar bot
echo 4. Ver logs
echo 5. Instalar dependencias
echo 6. Salir
echo ===================================
set /p opcion=Selecciona una opción (1-6): 

if "%opcion%"=="1" goto start_bot
if "%opcion%"=="2" goto stop_bot
if "%opcion%"=="3" goto restart_bot
if "%opcion%"=="4" goto show_logs
if "%opcion%"=="5" goto install_deps
if "%opcion%"=="6" goto exit

echo Opción no válida. Presiona cualquier tecla para continuar...
pause >nul
goto menu

:start_bot
if exist bot_pid.txt (
    echo El bot ya está en ejecución.
    timeout /t 2 >nul
    goto menu
)

echo Iniciando el bot...
start "PassQuirk Bot" /MIN cmd /c "node index.js & echo %errorlevel% > bot_pid.txt"
timeout /t 2 >nul
goto menu

:stop_bot
if not exist bot_pid.txt (
    echo No hay ningún bot en ejecución.
    timeout /t 2 >nul
    goto menu
)

echo Deteniendo el bot...
taskkill /F /FI "WINDOWTITLE eq PassQuirk Bot" >nul 2>&1
del /F /Q bot_pid.txt >nul 2>&1
echo Bot detenido correctamente.
timeout /t 2 >nul
goto menu

:restart_bot
call :stop_bot
timeout /t 1 >nul
call :start_bot
goto menu

:show_logs
if not exist logs (
    mkdir logs
)
if not exist logs\bot.log (
    echo No hay registros disponibles. > logs\bot.log
)
start notepad logs\bot.log
goto menu

:install_deps
echo Instalando dependencias...
call npm install
if %errorlevel% EQU 0 (
    echo Dependencias instaladas correctamente.
) else (
    echo Error al instalar las dependencias.
)
timeout /t 2 >nul
goto menu

:exit
echo Saliendo...
timeout /t 1 >nul
exit
