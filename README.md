# Vector Database Search Engine

A modern product search engine built with Go backend, Weaviate vector database, and React frontend. Search for products using natural language and get intelligent recommendations powered by vector similarity.

## Features

- **Natural Language Search**: Search for products using descriptive queries like "professional camera for photography"
- **Vector Similarity**: Uses OpenAI embeddings through Weaviate for semantic search
- **Product Recommendations**: Get similar product suggestions based on your selections
- **Modern Dark UI**: Clean, responsive interface with smooth animations
- **Real-time Search**: Instant results as you type with debouncing

## Tech Stack

### Backend
- **Go**: High-performance API server
- **Weaviate**: Vector database for semantic search
- **Gin**: Web framework for REST API
- **OpenAI**: Text embeddings for vector generation

### Frontend
- **React 19**: Modern React with TypeScript
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Clean, modern icons
- **Axios**: HTTP client for API calls

## Setup Instructions

### Prerequisites
- Go 1.21 or higher
- Node.js 18 or higher
- Docker and Docker Compose
- OpenAI API key

### 1. Clone and Setup
```bash
git clone <repository-url>
cd vector-db-search
```

### 2. Environment Configuration
Create a `.env` file in the `backend` directory:
```env
WEAVIATE_HOST=localhost:8080
WEAVIATE_API_KEY=
OPENAI_API_KEY=your_openai_api_key_here
PORT=8080
```

### 3. Start Weaviate Database
```bash
# Start Weaviate with Docker Compose
docker-compose up -d
```

### 4. Install Dependencies and Start Backend
```bash
# Install Go dependencies
cd backend
go mod tidy

# Start the Go server
go run main.go
```

### 5. Start Frontend
```bash
# Install npm dependencies
npm install

# Start the React development server
npm start
```

### 6. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Weaviate: http://localhost:8080 (different port mapping in docker-compose)

## API Endpoints

### Search Products
```
POST /search
Content-Type: application/json

{
  "query": "laptop for coding",
  "limit": 10
}
```

### Get Recommendations
```
GET /recommendations?product=iPhone%2015%20Pro&limit=5
```

### Health Check
```
GET /health
```

## Sample Queries

Try these natural language searches:
- "professional camera for photography"
- "laptop for coding and development"
- "wireless headphones for music"
- "fitness tracker for running"
- "gaming console for entertainment"

## How It Works

1. **Data Indexing**: Product descriptions are vectorized using OpenAI embeddings and stored in Weaviate
2. **Search**: User queries are converted to vectors and matched against product vectors using cosine similarity
3. **Recommendations**: Similar products are found by comparing vectors of the selected product
4. **Real-time UI**: React frontend provides instant feedback with smooth animations

## Development

### Backend Development
```bash
cd backend
go mod tidy
go run main.go
```

### Frontend Development
```bash
npm start
```

### Production Build
```bash
npm run build
```

## Troubleshooting

### Common Issues

1. **Weaviate Connection Error**: Ensure Docker is running and Weaviate is accessible at localhost:8080
2. **OpenAI API Error**: Check your API key is valid and has sufficient credits
3. **CORS Issues**: Backend includes CORS middleware for localhost:3000
4. **Empty Search Results**: Ensure products are loaded by checking backend logs

### Logs
- Backend logs: Check terminal where `go run main.go` is running
- Frontend logs: Check browser console (F12)
- Weaviate logs: `docker-compose logs weaviate`

## License

This project is for educational purposes. Please ensure you have proper licenses for production use.#
