FROM node:14.12.0

# Set the working directory to /api
WORKDIR  /api

# copy package.json into the container at /facerecognition-app/api
COPY package*.json /facerecognition-app/api/

# Install packages
RUN npm install

# Copy the current directory contents into the container at /facerecognition-app/api
COPY . /facerecognition-app/api/

# Make port 3001 available outside the container
EXPOSE 3001

# Run the app when the container launches
CMD ["npm", "start"]