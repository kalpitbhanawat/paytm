import { Button } from "./Button";
import { useSearchParams } from "react-router-dom";
import  axios  from "axios";
import { useState } from "react";
export function SendMoney({ label }) {
  let [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount,setAmount]=useState(0)
  return <div class="flex items-center justify-center h-screen">
    <div class=" p-10 w-290 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div class="font-bold text-lg items-center flex items-center justify-center">
        Send Money
      </div>
      <div class="flex flex-col items-center py-5 pb-4">
        <div class="rounded-full h-16 w-16 bg-slate-200 flex justify-center mt-1 mr-2">
          <div class="flex flex-col justify-center h-full text-xl">
            {name[0].toUpperCase()}
          </div>
        </div>
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
        <div class="mx-5 my-2">
          <input onChange={(e)=>{
            setAmount(e.target.value)
          }} class=" outline-none w-full p-1 ps-4 text-gray-900 border rounded-lg " placeholder="Enter Amount" required />
        </div>
        <div class="flex mt-4 md:mt-6">
          <Button onClick={()=>{
            axios.post("http://localhost:3000/api/v1/account/transfer", {
              to: id,
              amount
            },{
              headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
              }
            })


         }  } label={"Send Money"}></Button>

      </div>
    </div>
  </div>
  </div >
  

}