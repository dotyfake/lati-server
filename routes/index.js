 const authRouter = require('./auth')
 const gamesRouter = require('./games')
 const accountRouter = require('./account')
 const skillsRouter = require('./skills')
 const userRouter = require('./user')
 const searchRouter = require('./search')
 const postsRouter = require('./posts')
 const chatRouter = require('./chat')
 const cors = require('cors')


function route (app){
    app.use(cors({origin: '*', methods: ['GET', 'POST', 'PUT' , 'PATCH', 'DELETE']}))
    // app.use(cors({origin: '', methods: ['GET', 'POST', 'PUT' , 'PATCH', 'DELETE']}))

    app.use('/api/auth', authRouter)
    
    app.use('/api/games', gamesRouter)

    app.use('/api/account', accountRouter)

    app.use('/api/user', userRouter)

    app.use('/api/skills', skillsRouter)

    app.use('/api/search', searchRouter)

    app.use('/api/posts', postsRouter)

    app.use('/api/chat', chatRouter)
} 

module.exports = route