# Step 1: Build the React app
FROM node:20-alpine AS build

WORKDIR /app

ARG REACT_APP_API_URL
ARG REACT_APP_ENV

ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_ENV=$REACT_APP_ENV


RUN echo "REACT_APP_API_URL=$REACT_APP_API_URL" > .env.production
RUN echo "REACT_APP_ENV=$REACT_APP_ENV" >> .env.production

COPY package*.json ./

# Clean cache to avoid stale bundles
RUN npm install && npm cache clean --force

COPY . .

# Automatic cache-busting
RUN echo "CACHEBUST=$(date +%s)" >> .env.production

RUN npm run build


# Step 2: Serve with nginx
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
