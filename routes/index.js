 const authRouter = require('./auth')
 const gamesRouter = require('./games')
 const cors = require('cors')


function route (app){
    app.use(cors())

    app.use('/api/auth', authRouter)
    
    app.use('/api/games', gamesRouter)
} 

module.exports = route