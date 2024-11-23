FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install Ngrok dependencies (curl and unzip)
# RUN apt-get update && apt-get install -y unzip curl

# Download and install Ngrok
# RUN curl -s https://ngrok.com/download | unzip - -d /usr/local/bin
# RUN chmod +x /usr/local/bin/ngrok

# Copy the package.json and package-lock.json (if exists)
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Expose both the app's port and Ngrok's web interface port
EXPOSE 9000 3000

# Start the Node.js app and Ngrok in the background
CMD ["npm","start"]