
const houses = require('./db.json');
let globalId = 4; 

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houses);
    },
    deleteHouse: (req, res) => {
        const {id} = req.params
        let index = houses.findIndex(elem => elem.id === +id)
        houses.splice(index, 1)
        res.status(200).send(houses)
    },
    createHouse: (req, res) => {
        const { address, price, imageURL } = req.body;
        let newHouse = {
            id: globalId,
            address,
            price: +price,
            imageURL
        }
        if (!address || !price || !imageURL) {
            return res.status(400).send('MISSING A FIELD')
        } else {
            houses.push(newHouse);
            globalId++;
            return res.status(200).send(houses);
        }
    },
    updateHouse: (req, res) => {
        const {id} = req.params;
        const {type} = req.body;
        let index = houses.findIndex(elem => elem.id === +id);
        if (houses[index].price === 0 && type === 'minus') {
            res.status(400).send('Houses are not free')
        } else if (houses[index].price <= 9999 && type === 'minus') {
            houses[index].price -= houses[index].price
            res.status(200).send(houses)
        } else if (type === 'plus') {
            houses[index].price += 10000
            res.status(200).send(houses)
        } else if (type === 'minus') {
            houses[index].price -= 10000
            res.status(200).send(houses)
        } else {
            res.sendStatus(400)
        }
    }
};