const express = require("express");

const router  = express.Router();

const adminControllers = require("../../controllers/admin/index");

router.get("/adminHome", adminControllers.getAdminHome);
router.get("/addBooks", adminControllers.getAddBooks);
router.post("/addBook", adminControllers.postAddBook);
router.get("/normalUsers", adminControllers.getUsersPage);
router.get("/normalUsersData", adminControllers.getUsers);
router.get("/adminProfile", adminControllers.getProfile);
router.delete("/deleteUser/:userId", adminControllers.deleteUser)

module.exports = router;