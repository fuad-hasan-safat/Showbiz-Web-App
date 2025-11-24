#!/bin/bash

FRONTEND_CONTAINER="showbiz-web-app"
FRONTEND_IMAGE="showbiz-web-app"
FRONTEND_PORT=6102

echo "🚀 Starting safe frontend deployment..."

# Stop only frontend container
echo "🛑 Stopping frontend container ($FRONTEND_CONTAINER)..."
docker stop $FRONTEND_CONTAINER 2>/dev/null

# Remove only frontend container
echo "🗑 Removing frontend container ($FRONTEND_CONTAINER)..."
docker rm $FRONTEND_CONTAINER 2>/dev/null

# Rebuild frontend image
echo "📦 Building new frontend Docker image ($FRONTEND_IMAGE)..."
docker build --no-cache -t $FRONTEND_IMAGE .

# Run frontend container on port 6103
echo "🚀 Running frontend container on port $FRONTEND_PORT..."
docker run -d -p $FRONTEND_PORT:80 --name $FRONTEND_CONTAINER $FRONTEND_IMAGE

echo "🎉 Frontend deployed successfully!"
echo "🌐 Visit: http://103.4.145.86:$FRONTEND_PORT"


