//Create sample arrays of data to store in the DB.

module.exports = {

  sampleUsers: [{
    username: "mattloftus",
    email: "matthew.a.loftus@gmail.com",
    password: "space"
  }],

  sampleMission: [{
    name: "Endurance",
    velocity: 450,
    heading: 37.1,
    altitude: 100,
    latitude: 4,
    longitude: 0,
    apogee: 175,
    perigee: 150,
    inclination: 4,
    target_apogee: 250,
    target_perigee: 250,
    target_inclination: 12
  }],

  sampleCraft: [{
    mission_id: 1,
    cabin_pressure: 100,
    o2_level: 100,
    co2_level: 100,
    cycle_rate: 100,
    o2_storage: 100,
    h2o_storage: 100,
    total_power: 100,
    pv_1_production: 100,
    pv_1_orientation: 100,
    pv_2_production: 100,
    pv_2_orientation: 100,  
  }],

  sampleEngines: [
    {
      mission_id: 1,
      stage_num: 1,
      engine_num: 1,
      chamber_pressure: 0,
      exit_pressure: 0,
      force_thrust: 0,
      nozzle_temp: 273,
      turbopump_speed: 0
    },
    {
      mission_id: 1,
      stage_num: 1,
      engine_num: 2,
      chamber_pressure: 0,
      exit_pressure: 0,
      force_thrust: 0,
      nozzle_temp: 273,
      turbopump_speed: 0
    },
    {
      mission_id: 1,
      stage_num: 1,
      engine_num: 3,
      chamber_pressure: 0,
      exit_pressure: 0,
      force_thrust: 0,
      nozzle_temp: 273,
      turbopump_speed: 0
    },
    {
      mission_id: 1,
      stage_num: 1,
      engine_num: 4,
      chamber_pressure: 0,
      exit_pressure: 0,
      force_thrust: 0,
      nozzle_temp: 273,
      turbopump_speed: 0
    },
    {
      mission_id: 1,
      stage_num: 1,
      engine_num: 5,
      chamber_pressure: 0,
      exit_pressure: 0,
      force_thrust: 0,
      nozzle_temp: 273,
      turbopump_speed: 0
    },
    {
      mission_id: 1,
      stage_num: 1,
      engine_num: 6,
      chamber_pressure: 0,
      exit_pressure: 0,
      force_thrust: 0,
      nozzle_temp: 273,
      turbopump_speed: 0
    },
    {
      mission_id: 1,
      stage_num: 1,
      engine_num: 7,
      chamber_pressure: 0,
      exit_pressure: 0,
      force_thrust: 0,
      nozzle_temp: 273,
      turbopump_speed: 0
    },
    {
      mission_id: 1,
      stage_num: 1,
      engine_num: 8,
      chamber_pressure: 0,
      exit_pressure: 0,
      force_thrust: 0,
      nozzle_temp: 273,
      turbopump_speed: 0
    },
    {
      mission_id: 1,
      stage_num: 1,
      engine_num: 9,
      chamber_pressure: 0,
      exit_pressure: 0,
      force_thrust: 0,
      nozzle_temp: 273,
      turbopump_speed: 0
    },
    {
      mission_id: 1,
      stage_num: 2,
      engine_num: 10,
      chamber_pressure: 0,
      exit_pressure: 0,
      force_thrust: 0,
      nozzle_temp: 273,
      turbopump_speed: 0
    }
  ],

  sampleCraftEngines: [
    {
      mission_id: 1,
      engine_type: "superdraco",
      engine_id: "SD-1",
      force_thrust: 123,
      chamber_pressure: 27,
      chamber_temperature: 456
    },
    {
      mission_id: 1,
      engine_type: "superdraco",
      engine_id: "SD-2",
      force_thrust: 123,
      chamber_pressure: 27,
      chamber_temperature: 456
    },
    {
      mission_id: 1,
      engine_type: "superdraco",
      engine_id: "SD-3",
      force_thrust: 123,
      chamber_pressure: 27,
      chamber_temperature: 456
    },
    {
      mission_id: 1,
      engine_type: "superdraco",
      engine_id: "SD-4",
      force_thrust: 123,
      chamber_pressure: 27,
      chamber_temperature: 456
    },
    {
      mission_id: 1,
      engine_type: "rcs",
      engine_id: "B1-1",
      force_thrust: 123,
      chamber_pressure: 27,
      chamber_temperature: 456
    },
    {
      mission_id: 1,
      engine_type: "rcs",
      engine_id: "B1-2",
      force_thrust: 123,
      chamber_pressure: 27,
      chamber_temperature: 456
    },
    {
      mission_id: 1,
      engine_type: "rcs",
      engine_id: "B1-3",
      force_thrust: 123,
      chamber_pressure: 27,
      chamber_temperature: 456
    },
    {
      mission_id: 1,
      engine_type: "rcs",
      engine_id: "B1-4",
      force_thrust: 123,
      chamber_pressure: 27,
      chamber_temperature: 456
    },
    {
      mission_id: 1,
      engine_type: "rcs",
      engine_id: "B2-1",
      force_thrust: 123,
      chamber_pressure: 27,
      chamber_temperature: 456
    },
    {
      mission_id: 1,
      engine_type: "rcs",
      engine_id: "B2-2",
      force_thrust: 123,
      chamber_pressure: 27,
      chamber_temperature: 456
    },
    {
      mission_id: 1,
      engine_type: "rcs",
      engine_id: "B2-3",
      force_thrust: 123,
      chamber_pressure: 27,
      chamber_temperature: 456
    },
    {
      mission_id: 1,
      engine_type: "rcs",
      engine_id: "B2-4",
      force_thrust: 123,
      chamber_pressure: 27,
      chamber_temperature: 456
    },
    {
      mission_id: 1,
      engine_type: "rcs",
      engine_id: "B3-1",
      force_thrust: 123,
      chamber_pressure: 27,
      chamber_temperature: 456
    },
    {
      mission_id: 1,
      engine_type: "rcs",
      engine_id: "B3-2",
      force_thrust: 123,
      chamber_pressure: 27,
      chamber_temperature: 456
    },
    {
      mission_id: 1,
      engine_type: "rcs",
      engine_id: "B3-3",
      force_thrust: 123,
      chamber_pressure: 27,
      chamber_temperature: 456
    },
    {
      mission_id: 1,
      engine_type: "rcs",
      engine_id: "B3-4",
      force_thrust: 123,
      chamber_pressure: 27,
      chamber_temperature: 456
    },
    {
      mission_id: 1,
      engine_type: "rcs",
      engine_id: "B4-1",
      force_thrust: 123,
      chamber_pressure: 27,
      chamber_temperature: 456
    },
    {
      mission_id: 1,
      engine_type: "rcs",
      engine_id: "B4-2",
      force_thrust: 123,
      chamber_pressure: 27,
      chamber_temperature: 456
    },
    {
      mission_id: 1,
      engine_type: "rcs",
      engine_id: "B4-3",
      force_thrust: 123,
      chamber_pressure: 27,
      chamber_temperature: 456
    },
    {
      mission_id: 1,
      engine_type: "rcs",
      engine_id: "B4-4",
      force_thrust: 123,
      chamber_pressure: 27,
      chamber_temperature: 456
    }
  ],

  sampleTanks: [
    {
      mission_id: 1,
      stage_num: 1,
      fuel_type: "RP1",
      tank_pressure: 1,
      fuel_volume: 150.0,
      fuel_mass: 100,
      fuel_temp: 145.0,
      fuel_intake: "closed",
      fuel_outtake: "open",
      he_bottle_status: "Nominal",
      pump_status: "Nominal"
    },
    {
      mission_id: 1,
      stage_num: 1,
      fuel_type: "LOX",
      tank_pressure: 1,
      fuel_volume: 150.0,
      fuel_mass: 100,
      fuel_temp: 145.0,
      fuel_intake: "closed",
      fuel_outtake: "open",
      he_bottle_status: "Nominal",
      pump_status: "Nominal"
    },
    {
      mission_id: 1,
      stage_num: 2,
      fuel_type: "RP1",
      tank_pressure: 1,
      fuel_volume: 150.0,
      fuel_mass: 100,
      fuel_temp: 145.0,
      fuel_intake: "closed",
      fuel_outtake: "open",
      he_bottle_status: "Nominal",
      pump_status: "Nominal"
    },
    {
      mission_id: 1,
      stage_num: 2,
      fuel_type: "LOX",
      tank_pressure: 1,
      fuel_volume: 150.0,
      fuel_mass: 100,
      fuel_temp: 145.0,
      fuel_intake: "closed",
      fuel_outtake: "open",
      he_bottle_status: "Nominal",
      pump_status: "Nominal"
    }

  ],

  sampleCraftTanks: [
    {
      mission_id: 1,
      tank_type: "superdraco",
      tank_id: "SD-1",
      fuel_mass: 75,
      fuel_temp: 123,
      tank_pressure: 23
    },
    {
      mission_id: 1,
      tank_type: "superdraco",
      tank_id: "SD-2",
      fuel_mass: 75,
      fuel_temp: 123,
      tank_pressure: 23
    },
    {
      mission_id: 1,
      tank_type: "superdraco",
      tank_id: "SD-3",
      fuel_mass: 75,
      fuel_temp: 123,
      tank_pressure: 23
    },
    {
      mission_id: 1,
      tank_type: "superdraco",
      tank_id: "SD-4",
      fuel_mass: 75,
      fuel_temp: 123,
      tank_pressure: 23
    },
    {
      mission_id: 1,
      tank_type: "rcs",
      tank_id: "B1",
      fuel_mass: 75,
      fuel_temp: 123,
      tank_pressure: 23
    },
    {
      mission_id: 1,
      tank_type: "rcs",
      tank_id: "B2",
      fuel_mass: 75,
      fuel_temp: 123,
      tank_pressure: 23
    },
    {
      mission_id: 1,
      tank_type: "rcs",
      tank_id: "B3",
      fuel_mass: 75,
      fuel_temp: 123,
      tank_pressure: 23
    },
    {
      mission_id: 1,
      tank_type: "rcs",
      tank_id: "B4",
      fuel_mass: 75,
      fuel_temp: 123,
      tank_pressure: 23
    }
  ]

  
}
