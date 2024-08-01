FROM node:20.13.0-slim

# Set the working directory
WORKDIR /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .
COPY .env.example .env
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "start:prod"]