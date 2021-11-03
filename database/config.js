const mongoose = require('mongoose');
const chalk = require('chalk');

const dbConnection = async() => {

    try {
        await mongoose.connect( process.env.DB_CNN , {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        });

        console.log('Base de datos conectada');
        
    } catch (error) {
        console.log('Error al conectarse a la base de datos \n',error);
        throw new Error('Error a la hora de iniciar la BD ver logs');
    }

}

module.exports = {
    dbConnection
}