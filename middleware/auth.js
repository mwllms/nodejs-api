const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    let token = req.header('authorization')

    if (!token) return res.status(401).json({ error: 'Not authenticated.' })
    
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length)
    }
    
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next()
    } catch (error) {
        res.status(400).json({ error: 'Could not verify token.' })
    }
}