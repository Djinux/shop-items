## Getting started

### Local environment setup

Install `Node.js.` Here is the link: https://nodejs.org/en/download  
Install `nodemon`  
Install all dependencies  

```bash
npm install --global nodemon
npm install
```
Install `MongoDB Community Edition`. Follow instructions on: https://www.mongodb.com/docs/manual/administration/install-community/

Execute following command to setup mongodb  
```
mongoimport --db Store --collection items --file items.json --jsonArray
mongoimport --db Store --collection orders --file orders.json --jsonArray
```
Run the following command to make sure everything went smoothly
```
show dbs 
use Store 
show collections 
db.items.find()
``` 

### Running the application

```bash
nodemon server.js
```

### Running tests
