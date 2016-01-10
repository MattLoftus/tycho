var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var fs = require('fs');

module.exports = function (app, express) {
  //Express 4 allows us to use multiple routers with their own configurations

  //Create all routers we will need
  //TODO: make authRouter
  var authRouter = express.Router();
  var userRouter = express.Router();
  var missionRouter = express.Router();
  var orbitRouter = express.Router();
  var craftRouter = express.Router();
  var vehicleRouter = express.Router();

  // create a write stream (in append mode) 
  console.log(__dirname);
  var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})
  // setup the logger 
  app.use(morgan('combined', {stream: accessLogStream}))
  //bodyParser is for processing body req information (ex: req.body)
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(cookieParser());
  //serving all of the static files from the client directory
  app.use(express.static(__dirname + '/../../client'));
 

  //Make our app use all the routers we define 
  app.use('/auth', authRouter);
  app.use('/users', userRouter); 
  app.use('/mission', missionRouter);
  app.use('/orbit', orbitRouter);
  app.use('/spacecraft', craftRouter);
  app.use('/vehicle', vehicleRouter);

  //inject our routers into their respective route files
  require('../routers/authRoutes.js')(authRouter);
  require('../routers/userRoutes.js')(userRouter);
  require('../routers/missionRoutes.js')(missionRouter, passport);
  require('../routers/orbitRoutes.js')(orbitRouter);
  require('../routers/craftRoutes.js')(craftRouter);
  require('../routers/vehicleRoutes.js')(vehicleRouter);


};