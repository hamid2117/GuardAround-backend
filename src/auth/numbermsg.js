const accountSid = 'AC184e529c116e568ad62609591e04298d'
const authToken = '5f6b2ebb622ec299a406fa2df08ba5ac'
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
        console.log('Errorrr :', e)
        next(e)
      })
  )
}

export { sendSms }
