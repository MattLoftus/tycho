CREATE DATABASE tycho;

USE tycho;

CREATE TABLE 'users' (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(50),
  `password` varchar(100),
  PRIMARY KEY (`id`)
)

CREATE TABLE 'mission' (
  'id' int NOT NULL AUTO_INCREMENT,
  'name' varchar(250),
  'velocity' float,
  'heading' float,
  'altitude' float,
  'latitude' float,
  'longitude' float,
  'apogee' float,
  'perigee' float,
  'inclination' float,
  'created_at' int,
  PRIMARY KEY ('id')
);

CREATE TABLE 'engines' (
  'id' int NOT NULL AUTO_INCREMENT,
  'mission_id' int,
  'stage_num' int,
  'engine_num' int,
  'chamber_pressure' float,
  'force_thrust' float,
  'last_updated' int,
  PRIMARY KEY ('id')
);

CREATE TABLE 'tanks' (
  'id' int NOT NULL AUTO_INCREMENT,
  'mission_id' int,
  'stage_num' int,
  'tank_pressure' float,
  'fuel_volume' float,
  'fuel_mass' float,
  'last_updated' int,
  PRIMARY KEY ('id')
)

CREATE TABLE 'craft' (
  'id' int NOT NULL AUTO_INCREMENT,
  'mission_id' int,
  'power' float,
  'cabin_pressure' float,
  'monoprop' float,
  'last_updated' int,
  PRIMARY KEY ('id')
)

ALTER TABLE `engines` ADD CONSTRAINT `engines_fk0` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`);

ALTER TABLE `tanks` ADD CONSTRAINT `tanks_fk0` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`);

ALTER TABLE `craft` ADD CONSTRAINT `messages_fk0` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`);



