const jwt = require('jsonwebtoken');

const generarJWT = (uid, name)=>{

    const payload = { uid, name};
    const jwt_seed = process.env.SECRET_JWT_SEED || '';


    return new Promise((resolve,reject)=>{
        jwt.sign(payload, jwt_seed, {
            expiresIn: '24h'
        }, (err,token)=>{
            if(err){
                // Todo Mal
                console.log(err);
                reject(err);
            }else{
                // Todo Ok
                resolve(token);
            }
    
        })
    })


}

module.exports = {generarJWT};