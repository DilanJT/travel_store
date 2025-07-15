# Travel Store

A simple RESTful API for managing products in an e-commerce platform built with Node.js, Express.js, MongoDB, and documented with Swagger.

### 1. Setup Repository
 i. Clone or Download the Project\
```git clone git@github.com:DilanJT/travel_store.git```\
```cd travel_store```\

ii. Install Dependencies
```npm install```

---

### 2. Setup MongoDB
link: https://www.mongodb.com/docs/manual/administration/install-community/ 

---

### 3. Configure the project
i. Create an .env file and add the following\
```MONGODB_URI=<your connection URL to the database>```\
```PORT=8000```\

ii. Populate the db with some sample data (optional)\
```node seedData.js```\

---

### 4. Run the project
Production mode\
```npm start```\
Dev mode\
```npm run dev```\

---

### 5. Verify
Open your browser and visit:\
API Root: http://localhost:8000\
Swagger Documentation: http://localhost:8000/api-docs\

---

### API Endpoints

GET `/products`\
Return a list of all products.\

GET `/products/:id`\
Return a single product by ID.\

GET `/products?category=Apparel`\
Filter products by category.\

POST `/products`\
Accept a new product and add it to the collection.\
