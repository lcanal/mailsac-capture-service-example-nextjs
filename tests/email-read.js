require('dotenv').config()

const superagent = require('superagent')
const mailsac_api_key = process.env.MAILSAC_API_KEY;
const expected_message = 'This is some text from our Selenium test.';
const testInbox = 'sampleapptest@mailsac.com';

superagent
.get(`https://mailsac.com/api/addresses/${testInbox}/messages`)
  .set('Mailsac-Key', mailsac_api_key)
  .then((messages) => {
      const messageId = messages.body[0]._id
      superagent
          .get(`https://mailsac.com/api/text/${testInbox}/` + messageId)
          .set('Mailsac-Key', mailsac_api_key)
              .then((messageText) => {
                  if (messageText.text !== expected_message)  {
                    throw new Error(`Message to delete '${messageText.text}' does not match expected text '${expected_message}'`)
                  }
                  else{
                    console.log("API Read Op: Message comparison passed");
                    superagent
                    .delete(`https://mailsac.com/api/addresses/${testInbox}/messages/${messageId}`)
                    .set('Mailsac-Key', mailsac_api_key)
                    .then((messageResponse) => {
                        console.log(`API Deletion Op: ${messageResponse.body.message}`)
                    })
                  }
              })
  })
  .catch(err => {
      console.log(err.message)
      process.exit(-1)
  })