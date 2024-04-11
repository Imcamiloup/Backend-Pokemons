const { getAllTypesController } = require('../Controllers/typesController');


// it response to the client with the types or an error message
const getAllTypesHandler = async (req, res) => {
    try {
        const types = await getAllTypesController();
        res.status(200).send(types);
    } catch (error) {
        res.status(500).send('Types not found');
    }
}

module.exports = {
    getAllTypesHandler
}