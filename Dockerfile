#base image
FROM node:20-alpine

#container ke andar work directory
WORKDIR /app

# Pehle sirf package files copy karo taaki npm install bar-bar na chale (Cache Optimization)
COPY package*.json ./
RUN npm install

# Ab baaki bacha code copy karo
COPY . .

#port document karo
EXPOSE 5000

# Container start hote hi ye command chalegi
CMD ["node", "server.js"]

