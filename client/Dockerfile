FROM node:16.19.0

EXPOSE 3000
ENV NODE_ENV=production
CMD ["npm", "start"]

WORKDIR /app
ADD package.json /app/
RUN npm install --legacy-peer-deps
ADD . /app
