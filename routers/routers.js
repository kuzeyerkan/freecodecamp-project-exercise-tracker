const express = require("express");
const router = express.Router();

const {
  createNewUser,
  addNewExercise,
  getAllUsers,
  getUser,
  getExerciseLog,
} = require("../controllers/controller");

router.route("/").get(getAllUsers).post(createNewUser);
router.route("/:id/exercises").post(addNewExercise);
router.route("/:id/logs").get(getExerciseLog);

module.exports = router;
