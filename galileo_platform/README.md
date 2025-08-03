
# GALILEO Platform

**Geospatial Analysis Language for Intelligent Learning of the Environment and Observations**

## 🚀 Features

- **Real-time Sensor Monitoring**: Live data from environmental sensors (temperature, salinity, air quality)
- **ML-Powered Anomaly Detection**: Automatic detection of unusual patterns in sensor data
- **Interactive 3D Maps**: Visualize sensor locations and data on interactive maps
- **WebSocket Support**: Real-time data streaming for live updates
- **RESTful API**: Full backend API for data management
- **Responsive Dashboard**: Modern UI with real-time metrics and visualizations

## 🏗️ Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Next.js UI    │────▶│  FastAPI Backend │────▶│   PostgreSQL    │
│   (React)       │     │   (Python)       │     │   (PostGIS)     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                        │
        └────── WebSocket ───────┘
```

## 🛠️ Tech Stack

### Frontend
- Next.js 14 (React framework)
- Tailwind CSS (Styling)
- Deck.gl (3D map visualization)
- React Map GL (Map components)

### Backend
- FastAPI (Python web framework)
- Uvicorn (ASGI server)
- AsyncPG (PostgreSQL driver)
- WebSockets (Real-time communication)

## 📦 Installation

### Option 1: Docker (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd galileo_platform

# Start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000/docs
```

### Option 2: Manual Setup

#### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

#### Frontend Setup
```bash
# In the root galileo_platform directory
npm install
npm run dev
```

## 🌐 Deployment

### GitHub Pages (Frontend Only)

The frontend is automatically deployed to GitHub Pages on push to main branch.

### Full Stack Deployment

For full functionality with backend:

1. Deploy backend to a cloud service (Heroku, AWS, etc.)
2. Update `NEXT_PUBLIC_API_URL` in `.env.production`
3. Deploy frontend with updated environment variables

## 📡 API Endpoints

### Sensors
- `GET /sensors/sample` - Get sample sensor data
- `POST /sensors` - Create new sensor reading

### Machine Learning
- `POST /ml/detect_anomalies` - Detect anomalies in sensor data

### WebSocket
- `WS /ws` - Real-time data stream

## 🔧 Environment Variables

```env
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_BASE_PATH=

# Backend
DATABASE_URL=postgresql://user:pass@localhost/galileo
```

## 📊 Features in Detail

### Live Dashboard
- Real-time sensor status monitoring
- Anomaly detection alerts
- System health metrics
- Live data streaming visualization

### Interactive Map
- Sensor location visualization
- Heat map overlay
- Interactive tooltips
- 3D terrain view

### ML Capabilities
- Anomaly detection algorithm
- Pattern recognition
- Predictive analytics (coming soon)

## 🧪 Development

```bash
# Run tests
npm test

# Lint code
npm run lint

# Build for production
npm run build
```

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For issues and questions, please open a GitHub issue.
