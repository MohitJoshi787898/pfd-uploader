exports.getLinks = async (req, res) => {
    console.log('getLinks');
    res.status(200).json({
        sucess: true,
        data: ["HOME", "Content", "About", "License"],
        message: 'Links retrieved successfully',
    })
}