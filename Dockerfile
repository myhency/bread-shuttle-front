# run build dev
# docker build -t bread-shuttle-front:v0.0.4-rc1 .
# docker tag bread-shuttle-front:v0.0.4-rc1 hencyyeo/bread-shuttle-front:v0.0.4-rc1
# docker push hencyyeo/bread-shuttle-front:v0.0.4-rc1
# docker run -itd --name cloud-front-v2 -p 3001:80 bread-shuttle-front:v0.0.2

# FROM node:13 as builder
# WORKDIR /app
# COPY ./package.json ./
# RUN npm install
# COPY . .
# # ENTRYPOINT ["npm", "start"]

# FROM node:13
# COPY ./build /build
# RUN npm install -g serve
# ENTRYPOINT ["serve", "-s", "build"]

# RUN npm run build

FROM nginx
EXPOSE 3001
COPY ./build  /usr/share/nginx/html
COPY ./nginx_default.conf /etc/nginx/conf.d/default.conf
# ARG REACT_APP_FIREBASE_API_KEY 
# ENV REACT_APP_FIREBASE_API_KEY $REACT_APP_FIREBASE_API_KEY
# ARG REACT_APP_FIREBASE_AUTH_DOMAIN 
# ENV REACT_APP_FIREBASE_AUTH_DOMAIN $REACT_APP_FIREBASE_AUTH_DOMAIN
# ARG REACT_APP_FIREBASE_DATABASE_URL 
# ENV REACT_APP_FIREBASE_DATABASE_URL $REACT_APP_FIREBASE_DATABASE_URL
# ARG REACT_APP_FIREBASE_PROJECT_ID 
# ENV REACT_APP_FIREBASE_PROJECT_ID $REACT_APP_FIREBASE_PROJECT_ID
# ARG REACT_APP_FIREBASE_STORAGE_BUCKET 
# ENV REACT_APP_FIREBASE_STORAGE_BUCKET $REACT_APP_FIREBASE_STORAGE_BUCKET
# ARG REACT_APP_FIREBASE_MESSAGING_SENDER_ID 
# ENV REACT_APP_FIREBASE_MESSAGING_SENDER_ID $REACT_APP_FIREBASE_MESSAGING_SENDER_ID
# ARG REACT_APP_FIREBASE_APPID 
# ENV REACT_APP_FIREBASE_APPID $REACT_APP_FIREBASE_APPID
# ARG FAST_REFRESH 
# ENV FAST_REFRESH $FAST_REFRESH
# ARG DANGEROUSLY_DISABLE_HOST_CHECK 
# ENV DANGEROUSLY_DISABLE_HOST_CHECK $DANGEROUSLY_DISABLE_HOST_CHECK

