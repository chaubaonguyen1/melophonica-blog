const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
// Update
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You have no permisson for this part");
  }
});

// Delete

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
      // the "id" is from _id property of the user
    try {
        const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({
            username: user.username
        });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("This account has been deleted.");
      } catch (err) {
        res.status(500).json("This user is not available");
      }
    } catch (err) {
        res.status(404).json("This user is not available");
    }
  } else {
    res.status(401).json("Only admins can delete users' account!");
  }
});
// Get user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        console.log(others)

        res.status(200).json(others)
    } catch(err) {
        res.status(500).json(err)
    }
})
module.exports = router;
