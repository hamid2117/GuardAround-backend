const accountSid = 'AC184e529c116e568ad62609591e04298d'
const authToken = '0338fe1a6da05d6873233f021e583251'
import twilio from 'twilio'

const sendSms = (req, res, next) => {
  const { phone } = req.body
  const client = new twilio(accountSid, authToken)
  var a = Math.floor(Math.random() * 9999 + 999)
  a = String(a)
  a = a.substring(0, 4)
  let body = 'Your Code for guardAround is ' + a
  return (
    client.messages
      // .create({ body: '\n' + body, from: '+447723453822', to: phone })
      .create({ body: '\n' + body, from: '8554108434', to: phone })
      .then((message) => {
        console.log(message)
        req.codee = a
        next()
      })
      .catch((e) => {
        console.log('Error :', e)
        next(e)
      })
  )
}

export { sendSms }
