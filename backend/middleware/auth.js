import jwt from 'jsonwebtoken'

const verifyToken = (req,res,next) =>{
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).json({
                message:'token not found!!'
            })
        }

        const token = authHeader.split(" ")[1]

        const decoded = jwt.verify(token,'secretkey')

        req.user = decoded
        console.log(decoded);
        
        next()

    } catch (error) {
        res.status(401).json({
            message:'invalid token'
        })
    }
}

export default verifyToken