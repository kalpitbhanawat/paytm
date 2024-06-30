const express = require("express");
const router = express.Router();
// router.use("/account",accountRouter)
// 
const { Account } = require("../db");
const {authMiddleware}=require("../middleware")
const { default: mongoose } = require('mongoose');

router.get('/balance', authMiddleware, async (req, res) => {

    let balanceObject = items = await Account.findOne({
        userId: req.userId
    });
    return res.json(balanceObject.balance);

});

router.post('/transfer',authMiddleware, async (req, res) => {
    console.log("IOnside transfer")
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;
    console.log("req.userId",req.userId)
    const account=await Account.findOne( {
        userId: req.userId
    }).session(session);
    console.log("account",account)
    if(!account ||account.balance<amount){
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }
    const toAccount=await Account.findOne({
        userId:to
    }).session(session);
    
    if (!toAccount) {
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        }
    }).session(session);

    await Account.updateOne({
        userId: to
    }, {
        $inc: {
            balance: amount
        }
    }).session(session);
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    })
});
module.exports = router;