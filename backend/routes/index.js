const express = require("express");
// const rootRouter = require("./routes/index");
const userRouter = require("./user");
const accountRouter = require("./account");
const router=express.Router();
// app.use("/api/v1", rootRouter);
router.use("/user", userRouter)
router.use("/account", accountRouter)
module.exports=router;