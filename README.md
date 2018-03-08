yarn install

# watch development
yarn run watch

# run development build
yarn run start:dev

# run production build
yarn run start:prod

# set up local db
    - start mongod service
    - execute command "mongo" in terminal to start MongoDB shell
    - go to initDB.js file and edit the relevant info (a.k.a. name of collection and array of documents);
    - execute command "load('<pwd>/scripts/initDB.js')" to create db
