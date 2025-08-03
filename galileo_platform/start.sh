#!/bin/bash

echo "🚀 Starting GALILEO Platform..."

# Check if Docker is installed
if command -v docker &> /dev/null && command -v docker-compose &> /dev/null; then
    echo "✅ Docker detected. Starting with Docker Compose..."
    docker-compose up --build
else
    echo "⚠️  Docker not found. Starting services manually..."
    
    # Start backend in background
    echo "Starting backend API..."
    cd backend
    if [ ! -d "venv" ]; then
        python3 -m venv venv
    fi
    source venv/bin/activate
    pip install -r requirements.txt
    uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
    BACKEND_PID=$!
    cd ..
    
    # Start frontend
    echo "Starting frontend..."
    if [ ! -d "node_modules" ]; then
        npm install
    fi
    npm run dev &
    FRONTEND_PID=$!
    
    echo "✅ Services started!"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend API: http://localhost:8000/docs"
    echo ""
    echo "Press Ctrl+C to stop all services..."
    
    # Wait for interrupt
    trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
    wait
fi