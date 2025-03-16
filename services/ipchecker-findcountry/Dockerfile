# use official node.js as parent image
FROM node:12.18.1

# set the working directory inside the container
WORKDIR /app

# copy the node modules to the container
COPY package.json package-lock.json ./

RUN npm install

COPY ./src .

EXPOSE 3001

CMD [ "node", "index.js" ]