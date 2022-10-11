require('dotenv').config()
require('express-async-errors')

// express
const express = require('express')
const app = express()

//other packages
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
//database
const connectDB = require('./db/connect')

//router
const authRouter = require('./routes/auth-routes')
const userRouter = require('./routes/user-routes')
const productRouter = require('./routes/product-routes')
//middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(fileUpload())
app.use(express.static('/public'))

app.get('/', (req, res) => {
  res.send('e-commerce app')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.port || 5000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, console.log(`Server is listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}
start()
