const {response}  = require('express');
const { validationResult } = require('express-validator');

/* 
middlewares:
    Un middleware no es mas que una funcion que recive 3 argumentos:
        req: request
        res: response
        next: funcion que llamamos en caso de que no halla algun error

*/

const validarCampos = (req, res = response, next)=>{
    // Validacion de la los parametros
    const errors = validationResult(req);
    if( !errors.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors: errors.mapped()
        })
    }
    // Si no hay error, entonces ejecuta la siguiente funcion
    next();
}


module.exports = {
    validarCampos
}