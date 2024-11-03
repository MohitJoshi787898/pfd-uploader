const Person = require("../models/person");

exports.creatPerson = async (req, res) => {
    const data = req.body
    const newPerson = new Person(data);
    // Assuming req.body contains person details
    try {
        const person = await newPerson.save();  // Using async/await
        res.status(200).json({
            person: person,
            message: "Person Created Successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }

}
exports.getAllPerson = async (req, res) => {
    // Person.find({}, (err, persons) => {
    //     if (err) {
    //         console.log(err)
    //         res.status(500).send("Server Error")
    //     }
    //     else {
    //         res.status(200).json({
    //             persons: persons
    //         })
    //     }
    // })
    try {
        const alluser = await Person.find({})
        res.status(200).json({ alluser })

    }
    catch (err) {
        console.error(err)
        res.status(500).send("Server Error", err)
    }

}