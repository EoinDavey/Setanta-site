FROM node:11-alpine
RUN mkdir /fyp/
WORKDIR /fyp/
COPY package.json .
RUN npm run setup
COPY . .
RUN npm run build
ENTRYPOINT ash
