const User = require('../../models/userModel');

// GET /api/favourites
exports.getFavourites = async (req, res) => {
  console.log("hellooo")
  try {
    const user = await User.findById(req.user.id).populate('favourites');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      favourites: user.favourites || [],
    });
  } catch (error) {
    console.error('getFavourites error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// POST /api/favourites/toggle
exports.toggleFavourite = async (req, res) => {
  try {
    const { propertyId } = req.body;

    if (!propertyId) {
      return res.status(400).json({ success: false, message: 'propertyId is required' });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const exists = user.favourites.some(id => id.toString() === propertyId.toString());

    if (exists) {
      user.favourites = user.favourites.filter(id => id.toString() !== propertyId.toString());
    } else {
      user.favourites.push(propertyId);
    }

    await user.save();

    res.status(200).json({
      success: true,
      isFavourite: !exists,
    });
  } catch (error) {
    console.error('toggleFavourite error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};