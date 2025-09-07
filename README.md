# CoursePool 

> **All of Computer Science Courses, in one place.**

CoursePool is a comprehensive course management platform that automatically curates and organizes computer science courses from GitHub repositories. Built with Next.js, it features intelligent data parsing, progress tracking, AI-powered search, and seamless course discovery.

##  Features

### **Intelligent Data Ingestion**
- **AST-Powered Parsing**: Automatically extracts course data from GitHub README files using Abstract Syntax Trees
- **Unified Format**: Parses structured markdown content using `remark-parse` and `unified` processors
- **Real-time Updates**: Fetches course data from [cs-video-courses](https://github.com/Developer-Y/cs-video-courses) repository
- **Smart Classification**: Automatically categorizes courses by subject and topic

###  **Progress Management System**
- **Individual Progress Tracking**: Monitor completion status for each course video
- **Persistent Storage**: Progress saved in browser localStorage for seamless experience
- **Visual Progress Indicators**: Real-time progress bars and completion percentages
- **Course Statistics**: Track total videos, completed videos, and remaining content
- **Session Management**: Resume courses exactly where you left off

###  **Advanced Search & Discovery**
- **RAG-Powered Search**: Retrieval-Augmented Generation using LangChain and Google Gemini AI
- **Vector Embeddings**: Course content embedded using `text-embedding-004` model
- **Semantic Search**: Find courses based on meaning, not just keywords
- **PostgreSQL Vector Store**: Powered by pgvector extension for efficient similarity search
- **Intelligent Recommendations**: AI-powered course suggestions based on user queries

###  **Subject-Based Filtering**
- **Dynamic Categories**: Automatically extracted subject classifications
- **Real-time Filtering**: Instant course filtering by subject area
- **Multiple Subjects**: Support for diverse CS topics (Algorithms, Web Development, AI/ML, etc.)
- **Clear Filter Options**: Easy-to-use dropdown interface with clear/reset functionality

###  **Enhanced Course Experience** (Future Enhancement)
- **YouTube Integration**: Seamless embedded video playback
- **Course Playlists**: Multi-video course support with navigation controls
- **Responsive Design**: Optimized for desktop and mobile viewing
- **External Link Handling**: Graceful fallback for non-embeddable content
- **Course Metadata**: Comprehensive course information display

###  **Authentication System** (Future Enhancement)
- **Google OAuth Integration**: Secure sign-in with Google accounts
- **Better Auth Framework**: Built with modern authentication patterns
- **Session Management**: Secure user sessions with configurable expiration
- **User Profiles**: Personalized dashboard and course enrollment tracking

##  Technology Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling

### **Backend & Database**
- **Prisma ORM** - Type-safe database client
- **PostgreSQL** - Robust relational database
- **pgvector Extension** - Vector similarity search
- **Better Auth** - Modern authentication solution

### **AI & ML**
- **LangChain** - AI application framework
- **Google Gemini AI** - Language model and embeddings
- **RAG Architecture** - Retrieval-Augmented Generation
- **Vector Embeddings** - Semantic search capabilities

### **Data Processing**
- **Unified/Remark** - Markdown processing pipeline
- **AST Parsing** - Abstract Syntax Tree manipulation
- **Axios** - HTTP client for data fetching

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database with pgvector extension
- Google API key for Gemini AI

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mildlybrutal/CourseHub.git
   cd CourseHub
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Configure your `.env` file:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/coursehub"
   
   # Authentication
   BETTER_AUTH_SECRET="your-secret-key"
   BETTER_AUTH_URL="http://localhost:3000"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   # AI Services
   GEMINI_API_KEY="your-gemini-api-key"
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   ```

5. **Seed the database with courses**
   ```bash
   npm run seed
   ```

6. **Generate vector embeddings** (Optional - for RAG search)
   ```bash
   # Call the ingestion endpoint after starting the server
   curl -X POST http://localhost:3000/api/ingest
   ```

7. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

##  Project Structure

```
course-next/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── courses/              # Course CRUD operations
│   │   ├── subjects/             # Subject filtering
│   │   ├── rag/                  # AI search endpoint
│   │   └── ingest/               # Vector embedding ingestion
│   ├── components/               # Reusable UI components
│   ├── courses/                  # Course pages
│   ├── data/                     # Data processing utilities
│   └── generated/                # Prisma generated client
├── components/ui/                # shadcn/ui components
├── lib/                          # Utility libraries
│   ├── auth.ts                   # Authentication configuration
│   ├── prisma-client.ts          # Database client
│   └── rag/                      # RAG implementation
│       ├── embeddings.ts         # Vector embeddings
│       ├── vector-store.ts       # PostgreSQL vector store
│       ├── rag-chain.ts          # LangChain RAG pipeline
│       └── client.ts             # AI model client
├── prisma/                       # Database schema and migrations
└── public/                       # Static assets
```

##  API Endpoints

### Course Management
- `GET /api/courses` - List courses with pagination and filtering
- `GET /api/courses/[id]` - Get individual course details
- `GET /api/subjects` - Get available subject categories

### AI & Search
- `POST /api/rag` - AI-powered course search and recommendations
- `POST /api/ingest` - Generate vector embeddings for semantic search

### Authentication
- `POST /api/auth/signin` - User authentication
- `POST /api/auth/signout` - User logout
- `GET /api/auth/session` - Get current session

##  Key Features in Detail

### **AST-Based Course Parsing**
The application uses a sophisticated parsing system that:
- Fetches README content from GitHub repositories
- Parses markdown using unified/remark AST processors
- Extracts structured course data (title, subject, URL)
- Handles Table of Contents navigation
- Processes hierarchical content structure

### **RAG Search Implementation**
Powered by LangChain and Google Gemini:
- **Embeddings**: Course content vectorized using `text-embedding-004`
- **Vector Store**: PostgreSQL with pgvector for similarity search
- **Retrieval**: Top-k similarity search for relevant courses
- **Generation**: AI-powered recommendations and explanations
- **Context**: Maintains conversation context for better results

### **Progress Tracking System**
Comprehensive learning progress management:
- **Video-level Tracking**: Individual video completion status
- **Persistent Storage**: Browser localStorage for offline persistence
- **Visual Indicators**: Progress bars, completion badges, statistics
- **Resume Functionality**: Continue courses from last position
- **Course Analytics**: Detailed progress insights

### **Subject-Based Organization**
Dynamic categorization system:
- **Auto-extraction**: Subjects parsed from course metadata
- **Real-time Filtering**: Instant course filtering by category
- **Clean Interface**: Dropdown selection with clear options
- **URL State**: Filter state preserved in URL parameters

##  Future Enhancements

### **Planned Features**
- [ ] **User Enrollment System**: Full course enrollment and management
- [ ] **Learning Paths**: Curated learning sequences and curricula
- [ ] **Social Features**: User reviews, ratings, and discussions
- [ ] **Mobile App**: React Native companion application
- [ ] **Offline Support**: Download courses for offline viewing
- [ ] **Certificates**: Course completion certificates
- [ ] **Advanced Analytics**: Detailed learning analytics dashboard

### **Technical Improvements**
- [ ] **Real-time Sync**: Real-time progress synchronization
- [ ] **Advanced Caching**: Redis caching for improved performance
- [ ] **Search Optimization**: Enhanced search with filters and sorting
- [ ] **Content Management**: Admin panel for course management
- [ ] **API Documentation**: Comprehensive API documentation
- [ ] **Testing Suite**: Unit and integration test coverage

##  Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [cs-video-courses](https://github.com/Developer-Y/cs-video-courses) - Source of course data
- [LangChain](https://langchain.com/) - AI application framework
- [Next.js](https://nextjs.org/) - React framework
- [Prisma](https://prisma.io/) - Database toolkit
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework



---

**Built with ❤️ by [mildlybrutal](https://github.com/mildlybrutal)**
