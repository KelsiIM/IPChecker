# Use a newer official Node.js image as the base
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the source code into the container (adjust this path if necessary)
COPY ./src .

# CMD to run the application
CMD ["node", "monitoring.js"]