const {response,request } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario.models');
const {generarJWT} = require('../helpers/jwt');

const crearUsuario = async (req, res=response)=>{    
    try{
        // Recibimos data
        const {name,email,password} = req.body;

        // Verificar email        
        const usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({
                ok:false,
                msg: 'El email ya existe'
            });
        }
        
        // Crear modelo del usuario
        const userDB = new Usuario(req.body);

        // Encriptar password
        const salt = bcrypt.genSaltSync();
        userDB.password = bcrypt.hashSync( password, salt);
        
        // Generar JWT
        const token  = await generarJWT(userDB.id, userDB.name);
        
        // Guardar Usuario en DB
        await userDB.save();
        
        // Generar Respuesta exitosa
        return res.status(200).json({
            ok:true,
            msg: "Usuario creado",
            uid: userDB.id,
            name: userDB.name,
            token: token

        })

        
    }catch(err){
        console.error(err);
        return res.status(500).json({
        ok:false,
        msg: "Algo salio mal, problemas internos del servidor"
    });
    }
}

const loginUsuario= async (req,res = response)=>{
    try{
        // Capturamos peticion
        const {email,password} = req.body;

        // Validacion del emeail
        const userDB = await Usuario.findOne({email});
        if( !userDB ){
            return res.status(400).json({
                ok:false,
                msg: "El correo no existe"
            })
        }

        // Validacion del password
        const validPassword = bcrypt.compareSync(password, userDB.password); //bcrypt.compareSyn(password, userDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg: "El password no coincide"
            })
        }

        // Generar el JWT
        const token = await generarJWT(userDB.id, userDB.name);

        //Respuesta del servicio
        return res.status(200).json({
            ok:true,
            msg: "Usuario Autenticado",
            uid: userDB.id,
            name: userDB.name,
            token: token
        })
        
    }catch(err){
        console.error(err);
        return res.status(500).json({
            ok:false,
            msg: "Algo salio mal, problemas internos del servidor"
        })
    }
}

const revalidarToken = async (req,res = response)=>{
    // obtenemos nombre y el id
    const {uid, name} = req;

    // generamos un nuevo token
    const token = await generarJWT(uid, name);

    return res.status(200).json({
        ok:true,
        msg: "renover token",
        uid,
        name,
        token,
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}
