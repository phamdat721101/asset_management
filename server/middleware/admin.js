let admin = (req, res, next) => {
  if (req.user.role == 0) {
    return res.send("You are not allowed, Only admin can add or delete things");
  }
  next();
};

module.exports = { admin };
