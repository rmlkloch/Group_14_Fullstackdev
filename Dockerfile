# ========================================================
# Milestone 05 - Member 5: Frontend Multi-Stage Dockerfile
# ========================================================

# --------------------------------------------------------
# Stage 1: Build Frontend React SPA
# --------------------------------------------------------
FROM node:20-alpine AS build-stage

WORKDIR /app

# Copy dependency definition files
COPY package*.json ./

# Install dependencies
RUN npm ci || npm install

# Build argument for API URL (used by Vite at build time)
ARG VITE_API_URL=/api
ENV VITE_API_URL=${VITE_API_URL}

# Copy frontend source code
COPY . .

# Build production bundle (/app/dist)
RUN npm run build

# --------------------------------------------------------
# Stage 2: Serve React SPA via Nginx Web Server
# --------------------------------------------------------
FROM nginx:alpine AS production-stage

# Copy compiled static assets from build-stage to Nginx default HTML directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration for SPA routing & API/Socket.IO proxying
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start Nginx in foreground mode
CMD ["nginx", "-g", "daemon off;"]
