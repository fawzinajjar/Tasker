// DELETE Account
router.delete("/", auth, async (req, res) => {
  const currentUser = req.user.id;
  try {
    const deactivateAcc = await User.findByIdAndDelete(currentUser);
    const tasks = await Task.deleteMany();
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Server Error");
  }
});
