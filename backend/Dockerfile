# ==========================================
# Milestone 05 - Member 5: Backend Dockerfile
# ==========================================
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package management files
COPY package*.json ./

# Install dependencies (clean install)
RUN npm ci --only=production || npm install --production

# Copy backend application source code
COPY . .

# Expose backend API and Socket.IO port
EXPOSE 5000

# Set production environment default
ENV NODE_ENV=production

# Start Express & Socket.IO server
CMD ["node", "server.js"]
