# Stage 1: Build Stage --------------------------------------
FROM node:20 as build

# Install git (required by npm install)
RUN apt-get update && apt-get install -y git

# Set the working directory in the container
WORKDIR /app

# Copy only package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install all dependencies for building (including dev dependencies)
RUN npm install

# Copy all files into the container (including .ts files)
COPY . .

# Build the TypeScript files (adjust the build script based on your project) add  && npm run sentry:sourcemaps
RUN npm run build

# Stage 2: Production Stage --------------------------------------
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy only package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install git (required by npm install)
RUN apt-get update && apt-get install -y git

# Install only production dependencies
RUN npm install --omit=dev

# Copy necessary files into the container
COPY --from=build /app/dist ./dist

# Set NODE_ENV to production for better performance
ENV NODE_ENV=production

ARG BUILD_MODE
ENV MODE=$BUILD_MODE

# Expose ports
EXPOSE 80
EXPOSE 8080
EXPOSE 3000

# Run the application
CMD ["npm", "run", "start:prod"]