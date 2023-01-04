FROM node:16

WORKDIR /app


COPY package.json ./
COPY package-lock.json ./

RUN npm install --only=production

COPY . .
ENV NODE_ENV=production
RUN npm install typescript
RUN npm run build

CMD [ "npm", "start"]
