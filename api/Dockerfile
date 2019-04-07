FROM node:10.15.0

# Set the working directory to /api
WORKDIR  /api

# copy package.json into the container at /api
COPY package*.json /api/

# Install dependencies
RUN npm install

# Copy the current directory contents into the container at /api
COPY . /api/

# Make port 3001 available outside the container
EXPOSE 3001

# Run the app when the container launches
CMD ["npm", "start"]