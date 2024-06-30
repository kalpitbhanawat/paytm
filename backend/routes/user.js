const express = require("express");
const { User,Account } = require("../db");
const router=express.Router();
const zod=require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const {authMiddleware}=require("../middleware")
const signupBody = zod.object({
    userName: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})
router.post("/signup",async function (req, res) {
    
    const createPayload=req.body;
    const parsedPayload=signupBody.safeParse(createPayload);
    console.log("createPayload",createPayload)
    if(!parsedPayload.success){
        res.status(411).json({
            msg:"You sent the wrong inputs"
        })
        return;
    }
    console.log("createPayload.username",createPayload.userName)
    const existingUser=await User.findOne({username:createPayload.userName});
    console.log("existing User",existingUser)
    if(existingUser){
        return res.status(400).send("User already present")
    }
    const user= await User.create({
        userName:createPayload.userName,
        firstName:createPayload.firstName,
        lastName:createPayload.lastName,
        password:createPayload.password
    })
    const userId = user._id;
    console.log("user",user)
    const randomBalance=Math.floor(Math.random() * 10)*1000
    console.log(randomBalance)
    await Account.create({
        userId,
        balance: randomBalance
    })
    

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})

const signinBody = zod.object({
    userName: zod.string().email(),
	password: zod.string()
})
router.post("/signin",async function (req, res) {
    console.log(req.body)
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateBody = zod.object({
    firstName: zod.string(),
	lastName: zod.string(),
    password: zod.string()
})
// router.put("/",authMiddleware,async (req, res)=> {
//     console.log("Inside put")
//     const { success } = updateBody.safeParse(req.body)
//     if (!success) {
//         return res.status(411).json({
//             message: "Incorrect inputs"
//         })
//     }
// console.log("req.userId",req.userId)
// // const userte=await User.findByIdAndUpdate(
// //     req.userId,)
// // console.log(userte)
//     await User.updateOne(req.userId,{firstName:req.body.firstName,lastName:req.body.lastName,password:req.body.password})

//     res.json({
//         message: "Updated Successfully"
//     })
// })
router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    // const k=await User.updateOne(req.body, {
    //     id: req.userId
    // })
    const updateObject = {};
    if (req.body.firstName) {
        updateObject.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
        updateObject.lastName = req.body.lastName;
    }
    if (req.body.password) {
        updateObject.password = req.body.password;
    }
    console.log(updateObject)
    const result = await User.updateOne({ _id: req.userId }, { $set: updateObject });
    console.log("req.body",req.body)
    console.log("id",req.userId)
    // console.log("k",k)
    res.json({
        message: "Updated successfully"
    })
})

router.get('/bulk', async (req, res) => {
    console.log("bulk")
    const {filter }= req.query || "";
    console.log(filter)
    try {
        let items;
            // Perform a case-insensitive search on name and description fields
            items = await User.find({
                $or: [
                    { firstName: { $regex: filter } },
                    { lastName: { $regex: filter } }
                ]
            });
        return res.json(items);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports=router;