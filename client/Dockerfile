FROM node:10.15.0

# Set the working directory to /client
WORKDIR /client

# copy package.json into the container at /client
COPY package*.json /client/

# install dependencies
RUN npm install

# Copy the current directory contents into the container at /client
COPY . /client/

# Make port 3000 available outside the container
EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "start"]