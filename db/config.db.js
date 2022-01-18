const mongoose = require('mongoose');

const conectionDB = process.env.BD_CNN || '';

const dbConnection= async()=>{
    try{
        await mongoose.connect(conectionDB, {
            useNewUrlParser: true
        });
        console.log("Base de datos conectada");

    }catch(err){
        console.log(err);
        throw new Error('Error a la hora de inicializar la Base de Datos');
    }


}

module.exports = {
    dbConnection
}