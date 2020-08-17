FROM node:10.15.0

# Set the working directory to /client
WORKDIR /client

# copy package.json into the container at /facerecognition-app/client
COPY package*.json /facerecognition-app/client/

# install dependencies
RUN npm install

# Copy the current directory contents into the container at /facerecognition-app/client
COPY . /facerecognition-app/client/

# Make port 3000 available outside the container
EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "start"]