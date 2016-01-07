mysql -u root -p < schema.sql
node seed.js &
node updater.js