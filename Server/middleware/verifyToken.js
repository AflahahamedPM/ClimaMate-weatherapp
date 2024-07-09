import jwt from "jsonwebtoken"
export const verifyToken = (req, res, next)=>{
    try {
        const {token} = req.headers
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.userId = decoded.userId
        next()
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}