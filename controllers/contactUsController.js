const contactUs = require("../models/contactUsModal");
//Post Api:Creat a new contact us request
exports.createContactUsRequest = async (req, res) => {
    const data = req.body;
    console.log(data, "dataaaa")
    const newContactUsRequest = new contactUs(data);
    try {
        const contactUsRequest = await newContactUsRequest.save();
        res.status(200).json({
            success: true,
            message: "Contact Us Request Created Successfully",
            data: contactUsRequest,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
            message: 'Error creating contact request',
            success: false,
        });
    }
};