const router = require('express').Router();
const Task = require('../models/Task')

//REORDER TASKS
router.put("/:username", async (req, res) => {
    const idList = Object.keys(req.body)

    try {
        const queriedTasks = await Task.find(
            {'_id': { $in: idList}}
            )
        if(queriedTasks[0].username === req.params.username){
            try {
                const updatedTasks = []
                for (const task of queriedTasks) {
                    const updatedTask = await Task.findByIdAndUpdate(task._id, { $set:{ index: req.body[task._id] } }, { new: true })
                    updatedTasks.push(updatedTask)
                }
                res.status(200).json(updatedTasks)
            } catch (error) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("You can only update your own tasks...")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router