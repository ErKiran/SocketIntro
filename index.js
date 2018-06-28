const express = require('express');
const path = require('path');

const app= express();
const publicpath= path.join(__dirname,'./public');
app.use(express.static(publicpath));
const PORT= process.env.PORT||4000;
app.listen(PORT);
console.log('Server is running at PORT '+PORT);