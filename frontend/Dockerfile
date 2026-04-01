FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/build ./build

ENV REACT_APP_API_URL=https://ai-assisted-journal-system-1.onrender.com

EXPOSE 3000

RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "3000"]
