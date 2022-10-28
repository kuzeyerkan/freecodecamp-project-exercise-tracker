const express = require("express");
const User = require("../models/UserModel");
const Exercise = require("../models/ExerciseModel");
const mongoose = require("mongoose");

// POST create new user
// POST add new exercise , containing description, duration
// GET all user , containing username, id
// GET one user contaning fulll exercise log

//// req.body.uname olacak!!!!!
const createNewUser = async (req, res) => {
  const user = req.body;
  let findUser = await User.findOne({ username: user.username });
  try {
    if (findUser) {
      return res.json({
        message: "use different username",
      });
    } else {
      createUser = new User({
        username: user.username,
      });
      createUser.save();
      res
        .status(200)
        .json({ username: createUser.username, _id: createUser.id });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
};
const getAllUsers = async (req, res) => {
  const findAllUser = await User.find({ username: { $exists: true } });
  const _id = findAllUser._id;
  // const userArray = [];
  // userArray.push(findAllUser, _id);
  res.status(200).json(findAllUser);
};
/// id="uid"
//  id="desc"
//  id="dur"
// id="date"

const addNewExercise = async (req, res, next) => {
  const id = req.params.id;
  req.params = id;
  let date = req.body.date;
  var isValid = mongoose.Types.ObjectId.isValid(id);
  if (isValid) {
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json("user is not exist");
      }
      if (date) {
        let addExercise = new Exercise({
          UserId: id,
          description: req.body.description,
          duration: req.body.duration,
          date: new Date(req.body.date).toDateString(),
        });
        addExercise.save();
        return res.status(200).json({
          _id: user.id,
          username: user.username,
          date: addExercise.date,
          duration: addExercise.duration,
          description: addExercise.description,
        });
      } else {
        let addExercise = new Exercise({
          UserId: id,
          description: req.body.description,
          duration: req.body.duration,
          date: new Date().toDateString(),
        });
        addExercise.save();
        return res.status(200).json({
          username: user.username,
          description: addExercise.description,
          date: addExercise.date,
          duration: addExercise.duration,
          _id: user.id,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json("error");
    }
  } else {
    res.status(400).json("enter valid id");
  }
};

const getExerciseLog = async (req, res) => {
  const { from, to, limit } = req.query;
  const dateFirst = new Date(from);
  const dateLast = new Date(to);
  const id = req.params.id;
  var isValid = mongoose.Types.ObjectId.isValid(id);
  if (isValid) {
    try {
      const username = await User.findById(id);
      if (!username) {
        res.json("user is not exist");
      } else {
        await Exercise.find({
          UserId: id,
          date: {
            $gte: dateFirst.toDateString(),
            $lt: dateLast.toDateString(),
          },
        })
          .limit(limit)
          .exec((err, exercisesLog) => {
            if (err || !exercisesLog) {
              return res.json("No Data");
            } else {
              const log = exercisesLog.map((e) => ({
                description: e.description,
                duration: e.duration,
                date: e.date,
              }));
              return res.json({
                username: username.username,
                _id: username._id,
                count: log.length,
                log: log,
              });
            }
          });
      }
    } catch (error) {
      return res.json("user is not exist");
    }
  } else {
    res.json("invalid id");
  }
};

module.exports = {
  createNewUser,
  addNewExercise,
  getAllUsers,
  getExerciseLog,
};

// const log = user.map((l) => ({
//   description: l.description,
//   duration: l.duration,
//   date: l.date,
// }));
