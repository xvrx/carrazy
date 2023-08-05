const sessions = require('../models/session')

module.exports = async function (req, res, next) {

    // is middleware running
    // console.log('verifying user...')
    
    try {
        const bruh = req.sessionID
        const expiration = new Date(req.session.cookie._expires)
        if (!expiration) {
            console.log('expiration does not exist!')
            return res.status(400).json({ message: `expiration does not exist! : ${bruh}`, login: false })
        }

        if (expiration < new Date()) {
            console.log('expiration is due!')
            req.session.destroy((err) => {
                if (err) console.log(err)
                console.log('expired session is destroyed')
            })
            return res.status(400).json({ message: `session is expired!:${bruh}`, login: false })
        }

        const dbId = await sessions.exists({ _id: bruh })
        if (!dbId) return res.status(400).json({ message: `session doesnt exist! : ${bruh}`, login: false })
        // else
        // req.session.touch()
        req.session.expires = new Date() + 30 * 60000
        next()
    } catch (error) {
        console.log('catch: ',typeof error, error)
        if (typeof error.MongoServerSelectionError) {
            res.status(500).json({message:'failed to connect to DB, no MongoDB instance is running in the server computer..'})
        }
        res.status(400).json({ message: 'verification failed!', login: false })
    }
}