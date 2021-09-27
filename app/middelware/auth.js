import jwt from 'jsonwebtoken';
import config from '../config/index';

const authMiddleware = async(req, res, next) =>{
    //auth by header
    const authHeader = req.get('Authorization');
    
    if(!authHeader){
        return res.status(401).json({error: 'not authenticated, there is no jwt'});
    }
    //obtain token and verify
    const token = authHeader.split(' ')[1];
    let checkToken;   
    try {
        checkToken = jwt.verify(token, config.common.session.secret) ;
        req.user = checkToken
        //if it is a valid token but there was some error
        if(!checkToken){
            return res.status(401).json({error: 'Not authenticated'});
        }
    } catch (error) {
        res.status(error.status || 500).json({error: error.name, message: error.message});
    }
    next();
}

export default authMiddleware;