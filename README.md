# 🧠 Second Brain

A **full-stack personal knowledge management (PKM) app** frontend built with **React, TypeScript, and Vite**. Users can create, edit, and manage notes (text, images, videos, tweets, and links), share knowledge securely, and collaborate in real-time. This frontend connects to a separate backend API for full functionality.

## ⚠️ Prerequisites

**This is the frontend repository only.** To run the complete application, you need to:

1. **Clone and setup the backend server** first:
   ```bash
   git clone https://github.com/JagdishSuthar1/second-brain-be.git
   cd second-brain-be
   npm install
   # Follow backend README for setup and run on http://localhost:3000
   ```

2. **Then clone this frontend repository** and follow the setup below

3. **Make sure both servers are running**:
   - Backend API: `http://localhost:3000`
   - Frontend: `http://localhost:5173`

## 🚀 Features

* 📝 **Rich Notes**: Create, edit, and delete notes with text, images, videos, tweets, and links
* 🔍 **Smart Search**: Tag + keyword-based search with AI-powered summarization
* 👥 **Collaboration**: Real-time group chat system ("Superbrain") with WebSockets
* ☁️ **Media Management**: Cloudinary integration for image uploads
* 🔗 **Secure Sharing**: Share/import notes via unique links with authentication

## 🛠️ Tech Stack

* **Frontend**: [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
* **Styling**: CSS Modules / Tailwind CSS
* **State Management**: React Context API / Redux Toolkit
* **HTTP Client**: Axios / Fetch API
* **Build Tool**: Vite

## 📂 Project Structure

```
second-brain/
├── public/              # Static assets
├── src/                 # Frontend source
│   ├── components/      # Reusable UI components
│   ├── context/         # React Context API
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API service functions
│   ├── utils/           # Helper functions
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Root app component
│   └── main.tsx         # Entry point
├── .env                 # Environment variables
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## ⚙️ Setup

```bash
# Clone the repository
git clone https://github.com/JagdishSuthar1/second-brain.git
cd second-brain

# Install dependencies for both frontend & backend
cd client && npm install
cd ../server && npm install
```

Create environment files for both frontend and backend:

**Backend `.env` file** (in `/server` directory):
```env
MONGO_URI="your-mongodb-atlas-uri"
JWT_SECRET="your-jwt-secret"
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
GENAI_API_KEY="your-genai-or-gemini-api-key"
```

**Frontend `.env` file** (in `/client` directory):
```env
VITE_PUBLIC_URL=http://localhost:5173
VITE_BACKEND_URL=http://localhost:3000
```

## ▶️ Running Locally

```bash
npm run dev
```

* **Frontend**: http://localhost:5173

**Note**: Make sure the backend server is running separately on http://localhost:3000 for full functionality.

## 🚀 Deployment

* **Frontend**: Vercel / Netlify
* **Backend**: Separate repository (runs independently)

## 🔗 Related Repositories

* **Backend API**: [second-brain-be](https://github.com/JagdishSuthar1/second-brain-be) - **Required for full functionality**

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

* GitHub: [@JagdishSuthar1](https://github.com/JagdishSuthar1)
* Project Link: [https://github.com/JagdishSuthar1/second-brain](https://github.com/JagdishSuthar1/second-brain)