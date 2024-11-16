const express=require('express');
const Task=require('../../models/Task');
const authenticateToken=require('../../middleware/auth');

const router=express.Router();

//create task
router.post('/', authenticateToken,  async(req,res)  =>{
    try{
        const task= new Task({...req.body, userId:req.user._id});
        await  task.save();
        res.status(201).json(task);
    }
    catch(error){
        res.status(400).json({message:"Something went wrong"})
    }
})

module.exports=router;