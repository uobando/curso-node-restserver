const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false // Esto es para findByIdAndUpdate
        });
        console.log('Conectado a la base de datos.');
    } catch (error) {
        console.log(error);
        throw new Error('En error al conectarse a la base de datos.')
    }
}

module.exports = {
    dbConnection
}