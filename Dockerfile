# docker build -t cloud-alarm:v0.0.1 .
# docker tag cloud-alarm:v0.0.1 hencyyeo/cloud-alarm:v0.0.1
# docker push hencyyeo/cloud-alarm:v0.0.1

FROM node:12 as builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
# ENTRYPOINT ["npm", "start"]


RUN npm run build

FROM nginx
EXPOSE 3000
COPY --from=builder /app/dist  /usr/share/nginx/html

