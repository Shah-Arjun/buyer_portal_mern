const Property = require("../../models/propertyModel")



//add property --> by seller
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
        success: true,
        message: "Property add successfully.",
        data: property
    })
}




//get all property  --> by all users
exports.getProperties = async (req, res) => {
    const property = await Property.find()
    if(property.length == 0){
        res.status(400).json({
            message: "No property found",
            property: []        
        })
    } else {
        res.status(200).json({
            message: "Property found",
            property             
        })
    }
}




//get property by id  --> by all user
exports.getProperty = async (req, res) => {
    const {id} = req.params
    if(!id) {
        return res.status(400).json({
            message: "Please provide Property id",
        })
    }

    const property = await Property.find({ _id : id })      
    if(property.length == 0){
        res.status(400).json({
            message: "No Property found with that id",
            property: [],       
        })
    } else {
        res.status(200).json({
            message: "Property found with that id",
            Property,            
        })
    }
}





// delete property --> by seller/owner
exports.deleteProperty = async (req, res) => {
    const {id} = req.params  //propertyID

    if(!id) {
        return res.status(400).json({
            message: "Please provide property id"
        })
    }

    const property = await Property.findById(id)
    if(!property) {
        return res.status(404).json({
            message: "No property found with that id"
        })
    }

// console.log(property.owner.toString())
// console.log(req.user.id)

    if(property.owner.toString() !== req.user.id){
        return res.status(401).json({
            message: "you aren't owner of this property"
        })
    }

    await Property.findByIdAndDelete(id)
    res.status(200).json({
        message: "Property deleted successfully"
    })
}
