const WindowsIos = require("../models/windowIosModal");

exports.createWindowIos = async (req, res) => {
    const data = req.body;
    console.log(data, "dataaaa")
    const newWindowIos = new WindowsIos(data);
    try {
        const windowIos = await newWindowIos.save();
        res.status(200).json({
            success: true,
            message: "Window Ios Created Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to create Window Ios"
        });
    }

}

exports.getAllWindowIos = async (req, res) => {
    try {
        const windowIos = await WindowsIos.find();
        res.status(200).json({
            success: true,
            data: windowIos
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to get Window Ios",
            error: error
        })
    }
}