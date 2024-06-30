const zod=require("zod");

const createUser=zod.object({
    firstName:String,
    lastName:String,
    userName:{
        type:String,
        required:true,
        unique:true,
        lowercase:true

    },
    password:{
        type:String,
        required:true,
        minLength:6

    } 
})
const updateTodo=zod.object({
    id:zod.string(),
})

module.exports={
    createTodo:createTodo,
    updateTodo:updateTodo
}