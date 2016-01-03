DROP DATABASE IF EXISTS tycho;

CREATE DATABASE tycho;

USE tycho;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(100),
  PRIMARY KEY (`id`)
);

CREATE TABLE `mission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(250),
  `velocity` float,
  `heading` float,
  `altitude` float,
  `latitude` float,
  `longitude` float,
  `apogee` float,
  `perigee` float,
  `inclination` float,
  `target_apogee` float,
  `target_perigee` float,
  `target_inclination` float,
  `last_updated` bigint,
  PRIMARY KEY (`id`)
);

CREATE TABLE `engines` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mission_id` int,
  `stage_num` int,
  `engine_num` int,
  `chamber_pressure` float,
  `exit_pressure` float,
  `force_thrust` float,
  `nozzle_temp` float,
  `turbopump_speed` float,
  `last_updated` bigint,
  PRIMARY KEY (`id`)
);

CREATE TABLE `tanks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mission_id` int,
  `stage_num` int,
  `fuel_type` varchar(100),
  `tank_pressure` float,
  `fuel_volume` float,
  `fuel_mass` float,
  `fuel_temp` float,
  `fuel_intake` varchar(10),
  `fuel_outtake` varchar(10),
  `he_bottle_status` varchar(10),
  `pump_status` varchar(10),
  `last_updated` bigint,
  PRIMARY KEY (`id`)
);

CREATE TABLE `craft` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mission_id` int,
  `cabin_pressure` float,
  `o2_level` float,
  `co2_level` float,
  `cycle_rate` float,
  `o2_storage` float,
  `h2o_storage` float,
  `total_power` float,
  `pv_1_production` float,
  `pv_1_orientation` float,
  `pv_2_production` float,
  `pv_2_orientation` float,  
  `last_updated` bigint,
  PRIMARY KEY (`id`)
);

CREATE TABLE `spacecraft_engines` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mission_id` int,
  `engine_type` varchar(15),
  `engine_id` varchar(5),
  `force_thrust` float,
  `chamber_pressure` float,
  `chamber_temperature` float,
  `last_updated` bigint,
  PRIMARY KEY (`id`)
);

CREATE TABLE `spacecraft_tanks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mission_id` int,
  `tank_type` varchar(15),
  `tank_id` varchar(5),
  `fuel_mass` float,
  `fuel_temp` float,
  `tank_pressure` float,
  `last_updated` bigint,
  PRIMARY KEY (`id`)
);

ALTER TABLE `engines` ADD CONSTRAINT `engines_fk0` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`);

ALTER TABLE `spacecraft_engines` ADD CONSTRAINT `spacecraft_engines_fk0` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`);

ALTER TABLE `tanks` ADD CONSTRAINT `tanks_fk0` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`);

ALTER TABLE `spacecraft_tanks` ADD CONSTRAINT `spacecraft_tanks_fk0` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`);

ALTER TABLE `craft` ADD CONSTRAINT `messages_fk0` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`);



