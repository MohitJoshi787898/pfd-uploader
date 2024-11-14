const Links = require("../models/linksModal")

// GET API: Retrieve all links
exports.getLinks = async (req, res) => {
    try {
        const linksData = await Links.findOne();
        res.json(linksData || { links: ["HOME", "Content", "About", "License"] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

// POST API: Create a new link

exports.createLink = async (req, res) => {
    try {
        const { links } = req.body;
        const newLinks = new Links({ links });
        await newLinks.save();
        res.status(201).json(newLinks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//Put Api :update links 

exports.updateLinks = async (req, res) => {
    try {
        const { links } = req.body;
        const linksData = await Links.findOne();

        if (linksData) {
            linksData.links = links;
            await linksData.save();
            res.json(linksData);
        } else {
            const newLinks = new Links({ links });
            await newLinks.save();
            res.status(201).json(newLinks);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}