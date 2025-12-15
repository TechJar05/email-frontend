# Aptara Email Campaign Dashboard 📊

Simple React dashboard for managing email campaigns.

## 🎯 Features

- ✅ Upload Excel files with client data
- ✅ View all clients in a table
- ✅ Send bulk emails
- ✅ Track email delivery and link clicks
- ✅ View statistics dashboard
- ✅ Delete individual or all clients

## 📋 Requirements

- Node.js 18+
- npm or yarn
- Backend API running

## 🔧 Installation

1. **Install dependencies**
```bash
npm install
```

2. **Configure environment**
```bash
cp .env.example .env.local
# Edit .env.local with your backend URL
```

3. **Start development server**
```bash
npm run dev
```

Runs on: http://localhost:3000

4. **Build for production**
```bash
npm run build
```

Output in: `dist/`

## 🎨 Components

### Pages
- **Dashboard** - Main page with stats, upload, and table

### Components
- **StatsCards** - Display statistics (total, sent, clicked, rate)
- **UploadExcel** - File upload component
- **ClientsTable** - Client list with actions

### Services
- **api.js** - Axios API service with interceptors

## 🔌 API Integration

The dashboard connects to the backend via:

```
GET  /api/clients/        - List clients
POST /api/clients/upload-excel - Upload Excel
GET  /api/clients/stats   - Get statistics
POST /api/emails/send-all - Send bulk emails
DELETE /api/clients/{id}  - Delete client
```

## 📊 Excel Format

Required columns:
- `name` (required)
- `email` (required)
- `phone` (optional)
- `company` (optional)

## 🚀 Deployment

### Build
```bash
npm run build
```

### Deploy to EC2
```bash
# 1. Build locally
npm run build

# 2. Copy to server
scp -r dist/* user@server:/var/www/dashboard

# 3. Configure Nginx
server {
    listen 80;
    server_name dashboard.example.com;
    root /var/www/dashboard;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://backend:8000;
        proxy_set_header Host $host;
    }
}
```

### Deploy to Netlify/Vercel
1. Connect GitHub repo
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variable: `VITE_BACKEND_URL`

## 🎨 Customization

### Colors
Edit `src/App.css` or component styles:
- Primary: `#1d4457`
- Secondary: `#802e2e`
- Success: `#4CAF50`
- Danger: `#dc3545`

### Branding
- Update logo in `public/`
- Modify title in `index.html`
- Change colors in components

## 🧪 Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── StatsCards.jsx
│   │   ├── ClientsTable.jsx
│   │   └── UploadExcel.jsx
│   ├── pages/
│   │   └── Dashboard.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## 🔒 Security

- CORS handled by backend
- API requests via proxy in development
- Environment variables for sensitive data
- Input validation on file uploads

## 📞 Support

For issues or questions, contact your development team.
