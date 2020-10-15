import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        console.log('token found')
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log("Error occurred", error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    } else {
        res.status(401);
        throw new Error('Not authorized. No token available')
    }
})

export  {protect}