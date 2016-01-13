##About
Tycho is a modern user interface for monitoring launch vehicle and spacecraft data.  The main technologies used in this repository are AngularJS for the client, Three.js for the vehicle and trajectory graphics, Node.js/Express for the server, and MySQL for the database operations.  CSS Flexbox is also used for all of the positioning and styling of the views.  Please see the table of contents for more information

##Table of contents
1. [Getting Started](#getting started)
2. [Description](#description)
3. [API Interface](#api interface)
4. [Architecture](#architecture)


##Getting Started

##Description
The purpose of this project is demonstrate how modern web technologies can be used to create beautiful, intuitive interfaces for monitoring hardware systems.  I happen to love space exploration, so that was the particular use case for this project.  The same principles could be applied in a limitless amount of places though.  Think about interacting with a drone, a 3D printer, or any network of of machines that you want to keep track of simulatneously.  Further, modern web technologies could be used this way in an industrial setting, for monitoring manufacturing ops and logistics.  

##Architecture
The front end of this application is built in AngularJS. The logic is as follows
![Client Architecture Diagram](https://github.com/MattLoftus/tycho/images/tycho_client.architecture.png)
Note: one directional arrows represent one way data flow, bidirectional arrows represent bidirectional data flow.
The client consists of the top level App.js module and a route-config file, which determines which controllers/templates should be loaded for each possible route. We have six routes defined, for six separate controllers, which use four services in total.  
Our services handle all outgoing HTTP requests, and all posting and fetching of data.
Auth Service:  Handles all signin functionality, sending user data to the server for verification.
Mission Service: Fetches all meta data for the current mission.  Top level vehicle stats and orbit characteristics.  Ex: Mission name, trajectory, orbital data.
Vehicle Service: Fetches all data relating to launch vehicle engines and fuel tanks. Ex: Thrust, chamber pressure, fuel mass, etc.
Spacecraft Service: Fetches all data regarding the spacecraft.  This could be a satellite or a manned spacecraft.  Ex: RCS engines, life support systems, trajectory, power systems, etc.

We have six controllers and their associated views.
Auth Controller: Interacts with the Auth Factory, handles signin.
Mission Controller: Interacts with Mission Service and Vehicle Service.  This can be considered the top level view of the application.  It contains reduced versions of all of the other views in one place, giving a comprehensive overview at a glance.
Orbit Controller:  Interacts with the Mission Service.  This contains all of the logic for creating the orbit/trajectory view, including building the Three.js orbit graphic based on current mission parameters.
Engines Controller: Interacts with the Mission Service and Vehicle Service.  Manages logic for the engines view.
Tanks Controller: Interacts with the Mission Service and the Vehicle Service.  Manages logic for the fuel tanks view.
Craft Controller: Interacts witht the Spacecraft Service.  Manages logic for spacecraft view.



