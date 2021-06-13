const router = require('express').Router();
const Task = require('../models/Task')

//CREATE TASK
router.post("/", async (req, res) => {
    const newTask = new Task(req.body)
    try {
        const savedTask = await newTask.save()
        res.status(200).json(savedTask)
    } catch (err) {
        res.status(500).json(err)
    }
})

//UPDATE TASK
router.put("/:id", async (req, res) => {
    try {
        const queriedTask = await Task.findById(req.params.id)
        if(queriedTask.username === req.body.username){
            try {
                const updatedTask = await Task.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true })
                res.status(200).json(updatedTask)
            } catch (err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("You can only update your own Task...")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

//DELETE TASK
router.delete("/:id", async (req, res) => {
    try {
        const queriedTask = await Task.findById(req.params.id)
        if(queriedTask.username === req.body.username){
            try {
                await queriedTask.delete()
                res.status(200).json("Task has been deleted...")
            } catch (err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("You can only update your own Task...")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET TASK
router.get("/:id", async (req, res) => {
    try {
        const queriedTask = await Task.findById(req.params.id)
        res.status(200).json(queriedTask)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL TASKS
router.get("/", async (req, res) => {
    const username = req.query.user
    try {
        let Tasks;
        if(username) {
            Tasks = await Task.find({ username })
        } else {
            Tasks = await Task.find()
        }
        res.status(200).json(Tasks)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router