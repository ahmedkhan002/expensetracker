import jwt from "jsonwebtoken";
import 'dotenv/config'

const userAuth = async (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        return res.json({ success: false, message: 'User Not Authorized' })
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (decode.id) {
            req.userId = decode.id;
        } else {
            return res.json({ success: false, message: 'User Not Authorized' })
        }
        next()
    }catch(error){
        return res.json({success: false, message: error.message})
    }
}

export default userAuth