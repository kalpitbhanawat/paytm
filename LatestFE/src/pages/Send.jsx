import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { Balance } from "../components/Balance"
import { AppBar } from "../components/AppBar"
import { useState } from "react"
import { Users } from "../components/Users"
import { SendMoney } from "../components/SendMoney"
export const Send = () => {
  const [users, setUsers] = useState([{
    firstName: "Harkirat",
    lastName: "Singh",
    _id: 1
  }]);
  return <div class="h-full bg-red flex justify-center ">

    <SendMoney></SendMoney>
  </div>


}

