const twilio = require('twilio');
const dotenv = require("dotenv");
dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// const accountSid = 'ACe2d253dbbd12b2fc414d9e0b0c264ace'; // Replace with your trial account SID
// const authToken = 'ad60411a75ca831580b21be55163f95b';   // Replace with your trial Auth Token
const client = new twilio(accountSid, authToken);

function sendSms(to, message) {
    client.messages
        .create({
            body: message,
            from: 'your_twilio_trial_phone_number', // E.g., '+1234567890'
            to: to, // The verified phone number to send the message to
        })
        .then(message => console.log('Message sent with SID:', message.sid))
        .catch(error => console.error('Error sending message:', error));
}

// Example usage
sendSms('+0987654321', 'Hello from my Twilio trial account!');
