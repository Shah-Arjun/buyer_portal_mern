const User = require("../../models/userModel");

// GET /api/favourites
exports.getFavourites = async (req, res) => {
  // console.log("hellooo")

  const userId = req.user.id;
  const userExists = await User.findById(userId).populate("favourites");

  if (!userExists) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    favourites: userExists.favourites || [],
  });
};





// POST /api/favourites/toggle --. add/remove property to/from favourite
exports.toggleFavourite = async (req, res) => {
  const { propertyId } = req.body;

  if (!propertyId) {
    return res.status(400).json({
      success: false,
      message: "propertyId is required"
    });
  }

  const userExists = await User.findById(req.user.id);

  if (!userExists) {
    return res.status(404).json({
      success: false,
      message: "User not found."
    });
  }


  const isPropertyAlreadyInUserFavourites = userExists.favourites.some(
    (id) => id.toString() === propertyId.toString(),
  );

  //if exist then remove
  if (isPropertyAlreadyInUserFavourites) {
    userExists.favourites = userExists.favourites.filter(
      (id) => id.toString() !== propertyId.toString(),
    );
  } else {
    //not exist then add
    userExists.favourites.push(propertyId);
  }

  await userExists.save();

  res.status(200).json({
    success: true,
    isFavourite: !isPropertyAlreadyInUserFavourites,
  });
};
