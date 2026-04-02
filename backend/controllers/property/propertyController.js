const Property = require("../../models/propertyModel")


exports.addProperty = async(req, res) => {
    const ownerId = req.user.id

    if(!ownerId){
        return res.status(400).json({
            message: "Owner id is required."
        })
    }

    const { title, description, location, area, price, status } = req.body

    if(!title || !description || !location || !area || !price || !status){
        return res.status(400).json({
            message: "Title, description, location, area, price and status are required."
        })
    }

    const property = await Property.create({
        owner : ownerId,
        title,
        description,
        location,
        area,
        price,
        status
    })

    res.status(200).json({
        message: "Property add successfully.",
        data: property
    })
}