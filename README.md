## Getting started
This app allows you to order items from the shop.

### Local environment setup

1. Install `Node.js.` Here is the [link](https://nodejs.org/en/download)  
2. Install `nodemon`
3. Clone the repository to your local machine 
4. Install all dependencies  

```bash
npm install --global nodemon
git clone git@github.com:Djinux/shop-items.git
npm install
```
5. Install `MongoDB Community Edition`. Follow instructions on [link](https://www.mongodb.com/docs/manual/administration/install-community/)
6. Execute following command to setup mongodb  
```
mongoimport --db Store --collection items --file items.json --jsonArray
mongoimport --db Store --collection orders --file orders.json --jsonArray
```
7. *Final step* Run the following command to make sure everything went smoothly
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

