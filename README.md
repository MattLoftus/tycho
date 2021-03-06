##About
Tycho is a modern user interface for monitoring launch vehicle and spacecraft data.  You can find the application deployed at [loftus.xyz/tycho](http://loftus.xyz/tycho). On the front end, AngularJS is used for the application, the Three.js WebGL library is used for the trajectory and fuel tank grapics, and CSS (Flexbox) and Sass are used for all of the positioning and styling.  On the back end, the server is build with Node.js and Express, and we have a MySQL database.  See the table of contents for more information.

##Table of contents
1. [Getting started](#getting-started)
2. [Testing](#testing)
2. [Description](#description)
3. [Api interface](#api-interface)
4. [Architecture](#architecture)


##Getting started and testing
To develop locally, just clone the repo down to your machine:

```
git clone https://github.com/MattLoftus/tycho.git
```

Next navigate to the root of the repository and run an npm install.  (if you don't have node yet you'll need to get node.js first, probably through brew).

```
npm install
```

This will install all of our node modules and server dependencies.  The package.json posinstall script will then automatically run a bower install, installing all of our front end dependencies.  Before proceeding, you will need to make sure you have Sass (CSS preprocessor) installed.  If you do not, you can install it using ruby (may require sudo to get proper permissions):

```
gem install sass
```

Or:

```
sudo gem install sass
```

Next, you will need to have the Grunt CLI installed on your computer.  If you don't currenty, run

```
npm install -g grunt-cli
```

This will install the grunt CLI globally on your machine.  Lastly, execute the grunt command from the root of the repository.

```
grunt
```

Grunt will concatentate all of our client files, concatenate and minify our dependencies, compile our scss into css(and begin a watch command that will compile our scss every time the file is changed), and lastly start the server on port 3000.  Navigate to "localhost:3000" in the browser to view the application.

##Testing
To run tests on the API endpoints, execute the following command from the root of the repository:

```
npm test
```

##Description
The purpose of this project is demonstrate how modern web technologies can be used to create beautiful, intuitive interfaces for monitoring hardware systems.  I happen to love space exploration, so that was the particular use case for this project.  The same principles could be applied in a limitless amount of places though.  Think about interacting with a drone, a 3D printer, or any network of of machines that you want to keep track of simulatneously.

##Api interface
If developing locally, you can interact with the API for Tycho as follows:
![Tycho API Interface](https://github.com/MattLoftus/tycho/blob/master/images/tycho_api_interface.jpg)


##Architecture
The front end of Tycho is built in AngularJS. The logic is as follows
![Client Architecture Diagram](https://github.com/MattLoftus/tycho/blob/master/images/tycho_client_architecture.png)

Note: one directional arrows represent one way data flow, bidirectional arrows represent bidirectional data flow.

The client consists of the top level App.js module and a route-config file, which determines which controllers/templates should be loaded for each possible route. We have six routes defined, for six separate controllers, which use four services in total.  

Our services handle all outgoing HTTP requests, and all posting and fetching of data.

**Auth Service:**  Handles all signin functionality, sending user data to the server for verification.

**Mission Service:** Fetches all meta data for the current mission.  Top level vehicle stats and orbit characteristics.  Ex: Mission name, trajectory, orbital data.

**Vehicle Service:** Fetches all data relating to launch vehicle engines and fuel tanks. Ex: Thrust, chamber pressure, fuel mass, etc.

**Spacecraft Service:** Fetches all data regarding the spacecraft.  This could be a satellite or a manned spacecraft.  Ex: RCS engines, life support systems, trajectory, power systems, etc.

We have six controllers and their associated views.

**Auth Controller:** Interacts with the Auth Factory, handles signin.

**Mission Controller:** Interacts with Mission Service and Vehicle Service.  
This can be considered the top level view of the application.  It contains reduced versions of all of the other views in one place, giving a comprehensive overview at a glance.

**Orbit Controller:**  Interacts with the Mission Service.  This contains all of the logic for creating the orbit/trajectory view, including building the Three.js orbit graphic based on current mission parameters.

**Engines Controller:** Interacts with the Mission Service and Vehicle Service.  Manages logic for the engines view.

**Tanks Controller:** Interacts with the Mission Service and the Vehicle Service.  Manages logic for the fuel tanks view.

**Craft Controller:** Interacts witht the Spacecraft Service.  Manages logic for spacecraft view.

The back end of Tycho is written in Node.js/Express, with a MySQL.  We use Express Router for routing, and do all of our database operations with raw MySQL queries.  The server is broken down into the following components.
![Server Architecture Diagram](https://github.com/MattLoftus/tycho/blob/master/images/tycho_server_architecture.png)
Note: one directional arrows represent one way data flow, bidirectional arrows represent bidirectional data flow.

The server is broken into five main components: The main server file, the routers, the controllers, the models, and the database itself. The server starts with the main server.js file, which is injected with routers using middleware. The routers determine which controller functions to invoke based on the provided url and HTTP method (GET/POST).  Each controller is connected with an associated model, and the different controller method determine which model methods to invoke.  The controllers handle parsing out any parameters sent as part of the request, and sending back the final JSON response to the client, after its gets a response from the model function it calls.  The models are our direct link to the database, all querying to the database is done within the model functions.  The models are broken up to according to which chunk of the database they interact with.
You might wonder why we have 5 of each of these components, rather than one large one, and the main reason is to maintain a separation of concerns and keep things as modular as possible.  This way, if we had functionality and complexity to any of these portions, the server will still be readable and extensible.




