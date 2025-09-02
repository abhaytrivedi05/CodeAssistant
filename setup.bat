@echo off
echo Setting up Problem Solver AI...
echo.

echo [1/4] Setting up Python backend...
cd backend
python -m venv venv
call venv\Scripts\activate
pip install -r req.txt
echo Backend setup complete!
echo.

echo [2/4] Setting up React frontend...
cd ..\frontend
call npm install
echo Frontend setup complete!
echo.

echo [3/4] Environment setup...
cd ..\backend
if not exist .env (
    copy .env.example .env
    echo Please edit backend\.env and add your GEMINI_API_KEY
) else (
    echo .env file already exists
)
echo.

echo [4/4] Setup complete!
echo.
echo To run the application:
echo 1. Start backend: cd backend && python app.py
echo 2. Start frontend: cd frontend && npm start
echo.
echo Don't forget to add your Gemini API key to backend\.env
pause