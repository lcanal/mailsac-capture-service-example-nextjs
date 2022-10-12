require('dotenv').config()

const superagent = require('superagent')
const mailsac_api_key = process.env.MAILSAC_API_KEY
const expected_message = 'This is some text from our Selenium test.'

superagent
  .get('https://mailsac.com/api/addresses/sampleapptest@mailsac.com/messages')
  .set('Mailsac-Key', mailsac_api_key)
  .then((messages) => {
      const messageId = messages.body[0]._id
      superagent
          .get('https://mailsac.com/api/text/sampleapptest@mailsac.com/' + messageId)
          .set('Mailsac-Key', mailsac_api_key)
              .then((messageText) => {
                  if (messageText.text !== expected_message)  {
                    throw new Error(`Message '${messageText.text}' does not match expected text '${expected_message}'`)
                  }
                  else{
                    console.log("Message comparison passed");
                  }
              })
  })
  .catch(err => {
      console.log(err.message)
      process.exit(-1)
  })