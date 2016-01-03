mysql -u root -p < ~/dev/tycho/server/db/schema.sql
node ~/dev/tycho/server/db/seed.js &
node ~/dev/tycho/server/db/updater.js