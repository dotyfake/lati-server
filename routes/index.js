 const authRouter = require('./auth')
 const gamesRouter = require('./games')
function route (app){
    app.use('/api/auth', authRouter)
    
    app.use('/api/games', gamesRouter)
} 

module.exports = route