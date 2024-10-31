# Use the official Node.js image as the base image for the build stage
# Build stage
FROM node:20-alpine AS build

# Create and change to the app directory
WORKDIR /app

# Install app dependencies
COPY package.json yarn.lock ./
RUN npm pkg delete scripts.prepare
RUN yarn config delete https-proxy
RUN yarn config delete proxy
RUN yarn install --network-timeout 100000

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN yarn build

# Use the official Node.js image as the base image for the production stage
# Production stage
FROM node:20-alpine AS production

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --production --network-timeout 100000

# Copy built files from the build stage
COPY --from=build /app/build ./build

CMD ["node", "build/src/server.js"]
