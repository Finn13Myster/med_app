# Use Node.js official base image
FROM node:14

# Create and set working directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source
COPY . .

# Set environment variables (if needed)
ENV NODE_ENV=production

# Expose the port your app will run on
EXPOSE 8181

# Start the server
CMD ["node", "server/index.js"]
