FROM node:10
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install pm2 -g
COPY . /app
RUN ls -al -R
CMD ["pm2-runtime", "index.js"]
EXPOSE 3000