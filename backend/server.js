const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// Create express app
const app = express();

// Loading enviroment variables
const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

// Set up middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Serve static assets
app.use('/public/images', express.static(__dirname + '/public/images/'));

// Setup API endpoints
app.use("/buyers", require("./routes/buyer.route"));
app.use("/vendors", require("./routes/vendor.route"));
app.use("/items", require("./routes/item.route"));
app.use("/orders", require("./routes/order.route"));

// Connection to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) {
        console.log(err);
    } else {
        console.log("MongoDB database connection established successfully!");
    }
});

// Start the server
app.listen(port, function () {
    console.log(`Server is running on port ${port}!`);
});

const bodyParser = require('body-parser');
const twilio = require('twilio');
          
    app.use(bodyParser.urlencoded({ extended: true }));
    
    // Define Twilio credentials
    const accountSid = process.env.accountSidTwillio;
    const authToken = process.env.authTokenTwillio;
    const twilioPhoneNumber = 'whatsapp:+14155238886'; // Twilio's WhatsApp sandbox number
    const client = twilio(accountSid, authToken);
    
    // Generate a random 6-digit OTP
    function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
    }

    const phone_number=process.env.phone_number;
    // select a random phone number from the phone array
    const randomIndex = Math.floor(Math.random() * phone_number.length);
    const phone = phone_number[randomIndex];
    
    
    // Define a route for generating and sending OTP via WhatsApp
    app.post('/send-otp', async (req, res) => {
    const { phone } = req.body;
    const whatsappPhoneNumber = `whatsapp:${phone}`;
    
    try {
        const otp = generateOTP();
        const message = await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: twilioPhoneNumber,
        to: whatsappPhoneNumber,
        });
        console.log(`Sent OTP ${otp} to ${whatsappPhoneNumber} (message SID: ${message.sid})`);
        res.json({ success: true, message: `Sent OTP to ${phone}` });
    } catch (error) {
        console.error(`Error sending OTP to ${whatsappPhoneNumber}: ${error}`);
        res.json({ success: false, message: 'Failed to send OTP' });
    }
    });
    
    // Define a route for verifying OTP
    app.post('/verify-otp', (req, res) => {
    const { phone, otp } = req.body;
    
    // TODO: Retrieve the previously generated OTP for the user's phone number and compare it with the provided OTP
    
    const isOTPValid = true; // replace with the actual verification result
    if (isOTPValid) {
        res.json({ success: true, message: 'OTP verified successfully' });
    } else {
        res.json({ success: false, message: 'Invalid OTP' });
    }
    });
    
    // Start the server
    app.listen(3000, () => {
    console.log('Server started on port 3000');
    });