# LegalEase AI — Production Deployment Guide

This guide details step-by-step instructions to deploy LegalEase AI to production:
* **Frontend**: Vercel
* **Backend**: Render
* **Database**: MongoDB Atlas
* **Storage**: Cloudinary (or local upload storage)
* **AI Provider**: OpenAI API

---

## 1. MongoDB Atlas Setup (Database)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new cluster (e.g., Shared Free M0).
3. Under **Database Access**, create a database user with username and password.
4. Under **Network Access**, add IP `0.0.0.0/0` (Allow Access from Anywhere) to permit Render backend connections.
5. In the Clusters overview, click **Connect** -> **Connect your application** (Drivers: Node.js) and copy the connection string:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/legalease?retryWrites=true&w=majority
   ```

---

## 2. Backend Deployment on Render

1. Log in to [Render](https://render.com).
2. Click **New +** -> **Web Service**.
3. Connect your Git repository containing the LegalEase AI codebase.
4. Set the following configuration:
   * **Name**: `legalease-ai-backend`
   * **Root Directory**: `server`
   * **Environment**: `Node`
   * **Build Command**: `npm install`
   * **Start Command**: `npm start`
5. Under **Advanced** -> **Environment Variables**, add:
   ```env
   NODE_ENV=production
   PORT=5000
   JWT_SECRET=your_super_secret_jwt_key_at_least_32_characters_long
   JWT_EXPIRE=30d
   CLIENT_URL=https://your-frontend-app.vercel.app
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/legalease
   OPENAI_API_KEY=sk-... (Optional: platform automatically uses built-in engine if left empty)
   ```
6. Click **Deploy Web Service**.
7. Once deployed, note your backend URL (e.g. `https://legalease-ai-backend.onrender.com`).
   * Test health check: `https://legalease-ai-backend.onrender.com/api/health`

---

## 3. Frontend Deployment on Vercel

1. Log in to [Vercel](https://vercel.com).
2. Click **Add New...** -> **Project**.
3. Import your Git repository.
4. Configure the project:
   * **Framework Preset**: `Vite`
   * **Root Directory**: `client`
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
5. Configure API Proxying in `client/vite.config.js` or through Vercel Rewrites by creating `client/vercel.json`:
   ```json
   {
     "rewrites": [
       {
         "source": "/api/:path*",
         "destination": "https://legalease-ai-backend.onrender.com/api/:path*"
       },
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```
6. Click **Deploy**.
7. Once deployed, your SaaS platform will be live with high availability, global edge CDN, and automatic SSL!

---

## 4. Environment Variables Reference

### Backend (`/server/.env`)
| Variable | Description | Default / Example |
|---|---|---|
| `PORT` | Listening server port | `5000` |
| `NODE_ENV` | Environment mode | `production` |
| `JWT_SECRET` | Secret key for signing auth tokens | Any secure string |
| `JWT_EXPIRE` | Token expiry duration | `30d` |
| `CLIENT_URL` | Allowed frontend origin for CORS | `https://your-frontend.vercel.app` |
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://...` |
| `OPENAI_API_KEY` | OpenAI API key for GPT-4o integration | `sk-...` |

---

## 5. Production Maintenance & Monitoring

* **Admin Access**: Log in with `admin@legalease.ai` / `password123` to access the Admin Intelligence Console (`/admin`) to audit all contracts, toggle user quotas, or block abusive IPs.
* **Database Backup**: Atlas automated snapshots back up collections daily.
* **Rate Limits**: Protects endpoints against brute-force attacks at 300 requests per 15 minutes.
