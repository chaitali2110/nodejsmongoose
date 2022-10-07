const express = require("express");
const router = express.Router();
const userController = require("./../controllers/user.controller");
const verifyUser = require("./../middleware/verifytoken");

router.get("/",userController.findAll);
router.get("/users/:id",userController.findOne);
router.post("/users",userController.create);
router.delete("/users/:id",userController.delete);
router.put("/users/:id",userController.update);
router.post("/users/login",userController.login);

router.get("/users",verifyUser,userController.userDataa);
module.exports = router;