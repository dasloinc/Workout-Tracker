const router = require("express").Router();
const Workout = require("../models/workout.js")

router.get("/api/workouts", (req, res) => {
  // get last work out
    Workout.find({})
      // .sort({ date: -1 })
      .then(dbWorkouts => {
        res.json(dbWorkouts);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

// add new workout
router.post("/api/workouts", (req, res) => {
  Workout.create({
                type: req.body.type,
                name: req.body.name,
                duration: req.body.duration,
                weight: req.body.weight,
                reps: req.body.reps,
                sets: req.body.sets,
                distance: req.body.distance
  })
  .then(function(dbWorkout) {
    res.json(dbWorkout);
  });
});

  // View (GET) the combined eight of multiple exercise on the "stats" page

  router.get("/api/workouts/range", (req, res) => {
    console.log("Getting exercise info")
    Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

  router.get("/api/workouts", (req, res) => {
    console.log("Test get excerise info")
    Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.put("/api/workouts/:id", (req, res) => {
  console.log(req.params.id)
  console.log(req.body)

Workout.update({

    _id: req.params.id
    },

    {
    $push: { exercises: req.body }
    }

    ).then(function (Workout) {
        res.json(Workout)
    })
});

module.exports = router;
