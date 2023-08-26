# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the rest of the application files to the working directory
COPY . .

# Start the application
CMD ["npm", "start"]
