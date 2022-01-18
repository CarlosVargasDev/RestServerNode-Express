const {response } = require('express');
const jwt = require('jsonwebtoken');


// Aux
const respNoValido = {
    ok:false,
    msg: 'Token no valido'
}


const jwt_seed = process.env.SECRET_JWT_SEED || '';


// Middleware
const validarToken = (req, res=response,next)=>{
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json(respNoValido)
    }
    try{
        const {uid, name} = jwt.verify(token, jwt_seed);
        
        // Pasamos datos por medio de la request
        req.uid = uid;
        req.name = name;

    }catch(err){
        console.error(err);
        return res.status(401).json(respNoValido);        
    }


    // Si no hay error, entonces ejecuta la siguiente funcion
    next();
}

module.exports = validarToken;