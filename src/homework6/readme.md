# Steps to run the app:

# install dependencies
npm install

# will create db, schema and initial data
sequelize db:create
sequelize db:migrate
sequelize db:seed:all

# start the app => http://localhost:3000
npm start 