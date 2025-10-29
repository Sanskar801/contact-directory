# 📇 Contact Directory Frontend

Modern, iPhone-style contact management application built with React 19, TypeScript, and Tailwind CSS 4.0.

## 🚀 Tech Stack

- **React 19.0** - Latest stable with Actions API
- **TypeScript 5.7** - Type safety
- **Vite 6.0** - Lightning-fast build tool
- **TanStack Query v5** - Server state management
- **React Hook Form 7.54** - Form handling
- **Zod 3.24** - Schema validation
- **Tailwind CSS 4.0** - Modern CSS framework
- **Axios 1.7** - HTTP client

## 📋 Prerequisites

- Node.js 20+ (LTS recommended)
- npm 10+ or pnpm 9+
- Spring Boot backend running on `http://localhost:8080`

## 🛠️ Installation

1. **Clone and install dependencies:**

```bash
npm install
```

2. **Copy environment variables:**

```bash
cp .env.example .env
```

3. **Update `.env` if needed:**

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
Opens at `http://localhost:3000` with hot reload enabled.

### Production Build
```bash
npm run build
npm run preview
```

### Code Quality
```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── contacts/       # Contact-specific components
│   └── layout/         # Layout components
├── hooks/              # Custom React hooks
├── services/           # API service layer
├── schemas/            # Zod validation schemas
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
│   ├── api.ts         # Axios configuration
│   ├── queryClient.ts # TanStack Query setup
│   └── constants.ts   # App constants
├── App.tsx            # Root component
├── main.tsx           # Entry point
└── index.css          # Global styles
```

## 🔌 API Integration

The app connects to your Spring Boot backend at `http://localhost:8080/api/contacts`.

### Available Endpoints:
- `GET /api/contacts` - Paginated contact list
- `GET /api/contacts/{id}` - Single contact
- `GET /api/contacts/search?name=` - Search by name
- `POST /api/contacts` - Create contact
- `PUT /api/contacts/{id}` - Update contact
- `DELETE /api/contacts/{id}` - Delete contact

## 🎨 Features

- ✅ **iPhone-style UI** - Clean, modern design
- ✅ **Real-time search** - Debounced search with instant results
- ✅ **Smart sorting** - Sort by name, email, date
- ✅ **Pagination** - Efficient data loading
- ✅ **Form validation** - Client-side validation with Zod
- ✅ **Error handling** - User-friendly error messages
- ✅ **Optimistic updates** - Instant UI feedback
- ✅ **Responsive design** - Mobile, tablet, desktop
- ✅ **Dark mode ready** - CSS variable-based theming

## 🔧 Configuration

### Pagination Defaults
```typescript
// src/utils/constants.ts
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
```

### Query Cache Settings
```typescript
// src/utils/queryClient.ts
staleTime: 5 * 60 * 1000,  // 5 minutes
gcTime: 10 * 60 * 1000,     // 10 minutes
```

## 🐛 Troubleshooting

### Backend Connection Issues
```bash
# Check if backend is running
curl http://localhost:8080/api/contacts

# Update VITE_API_BASE_URL in .env if needed
```

### Port Already in Use
```bash
# Change port in vite.config.ts
server: {
  port: 3001  // Use different port
}
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📦 Deployment

### Vercel/Netlify
```bash
npm run build
# Deploy the 'dist' folder
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

MIT License - feel free to use for personal and commercial projects.

## 🙏 Acknowledgments

- [React Team](https://react.dev) - React 19
- [TanStack](https://tanstack.com) - Query library
- [Tailwind Labs](https://tailwindcss.com) - Tailwind CSS 4.0
- [Vite Team](https://vitejs.dev) - Build tool

---

Built with ❤️ using modern web technologies