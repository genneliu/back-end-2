
const express = require('express');
const cors = require('cors');

const app = express();
const controller = require('./controller.js');

app.use(express.json());
app.use(cors());

app.get('/api/houses', controller.getHouses); 
app.post('/api/houses', controller.createHouse);
app.put('/api/houses/:id', controller.updateHouse);
app.delete('/api/houses/:id', controller.deleteHouse);

const port = 4044;
app.listen(port, () => console.log(`Running on ${port}`));