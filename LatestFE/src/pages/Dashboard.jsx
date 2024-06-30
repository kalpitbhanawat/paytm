import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { Balance } from "../components/Balance"
import { AppBar } from "../components/AppBar"
import { useState } from "react"
import { Users } from "../components/Users"
import { SendMoney } from "../components/SendMoney"
export const Dashboard = () => {
  const [users, setUsers] = useState([{
    firstName: "Harkirat",
    lastName: "Singh",
    _id: 1
  }]);
  return <div>
    <AppBar></AppBar>
    <Balance></Balance>
    {/* <div className="font-bold ml-6 mt-6 text-lg">
      Users
    </div>
    <div class="mx-5 my-2">
      <input class=" outline-none w-full p-1 ps-4 text-gray-900 border rounded-lg " placeholder="Search Users" required />
    </div>
    <div>
      {users.map(user => <User user={user} />)}
    </div> */}
    <Users></Users>
    {/* <SendMoney></SendMoney> */}
  </div>


}

