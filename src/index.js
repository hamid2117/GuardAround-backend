// const app = require('./app')
import app from './app.js'

const port = 'https://guardaround.herokuapp.com/'
// const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(
    `Server running in https://guardaround.herokuapp.com/ : https://guardaround.herokuapp.com/`
  )
})
