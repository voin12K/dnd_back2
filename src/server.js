import app from './app.js'
import connectDB from './db.js'

const PORT = process.env.PORT 

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
})
