# Hotelligence - Hotel Booking Mobile App

## Prerequisites
- Node.js and npm installed
- Java 17 or higher installed 
- Maven installed
- Git installed
- Expo CLI
- Expo Go app (iOS/Android) to preview the mobile app
- IDE that supports running Java Spring Boot (IntelliJ is suggested)

## Setup Instructions

### 1. Clone Repositories
```bash
git clone https://github.com/Hotelligence/hotelligence-mobile-client
git clone https://github.com/Hotelligence/hotelligence-microservices
```

### 2. Start Backend Services (Microservice)
- Open the back-end folder inside an IDE that supports running Java Spring Boot (suggesting using IntelliJ)
- At IntelliJ project folder tree, run a service by opening the .java file by clicking on a folder -> src -> main -> java -> file {service_name}Application.java (<b>{service_name}</b> here is the name of the service).
- Right-click on the {service_name}Application.java and click "Run {service_name}Application.main()" to run the service.
- Doing the same for the other 6 folders (services).
- Services will need about 2 minutes to run and warm up before can be started to use.

### 3. Start Frontend Development Server (using Expo)
- Open the MyAxios.js file and change the <b>baseURL</b> to the correct IP Address of the device that currently running the back-end server (the server by default will be running at port 8080), for example if the device IP address is "192.168.2.20", the <b>baseURL</b> should be set to http://192.168.2.20:8080/api"
- Open the terminal and navigate to the front-end directory, then run these command lines:
```
# Install dependencies
npm install

# Start development server
npm start
```
- After the front-end development server is run by Expo, a QR code will be generated. Use a mobile phone (which has already installed the Expo Go app) to scan that QR and the app should now be opened on your phone.


## Demo
[Hotelligence Mobile App Demo](https://drive.google.com/drive/folders/1o-yAm4uxvKJjLYQlYhMpuufKpbNXfCRW?usp=sharing)