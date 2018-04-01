# use mongo with docker
# go to /dev
docker-compose up
 
# install dependencies
yarn install
 
# watch changes (using nodemon and babel-node)
yarn run watch
 
# create development build
yarn run build:dev
 
# create production build
yarn run build:prod
 
# create and run development build
yarn run start:dev
 
# create and run production build
yarn run start:prod
 
# set up local db
    - start mongod service
    - execute command "mongo" in terminal to start MongoDB shell
    - go to initDB.js file and edit the relevant info (a.k.a. name of collection and array of documents);
    - execute command "load('<pwd>/scripts/initDB.js')" to create db
