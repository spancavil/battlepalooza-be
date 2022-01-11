import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const authMiddleware = async (req, res, next) =>{
    //auth by header
    const authHeader = req.get('Authorization');
    if(!authHeader){
        return res.status(401).json({error: 'not authenticated, there is no jwt'});
    }
    //obtain token and verify
    const token = authHeader.split(' ')[1];
    
    try {
        jwt.verify(token, config.session.secret, (err, decoded)=>{
            if (err) {
                return res.json({mensaje: "Token inválida, " + err.message})
            } else {
                req.decoded = decoded;
                next();
            }
        })

    } catch (error) {
        res.status(error.status || 500).json({error: error.name, message: error.message});
    }
}

export default authMiddleware;