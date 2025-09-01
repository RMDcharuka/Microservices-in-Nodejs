FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Expose API Gateway port
EXPOSE 8085

CMD ["npm", "start"]
