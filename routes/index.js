var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", {
    title: "Form Validation",
    success: false,
    errors: req.session.errors
  });
  req.session.errors = null;
});

router.post("/submit", function(req, res, next) {
  req.check("email", "Invalid Email").isEmail();
  req
    .check("password", "Password is Invalid")
    .isLength({ min: 4 })
    .equals(req.body.confirmPassword);

  var errors = req.validateErrors();
  if (errors) {
    req.session.errors = errors;
  }
  res.redirect("/");
});
module.exports = router;
