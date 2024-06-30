import Header from "../components/Header"
import Login from "../components/Login"
import { Stack } from "@mui/material"
import {Link} from 'react-router-dom';
// const loginFields=[
//   {
//       labelText:"Email address",
//       labelFor:"email-address",
//       id:"email-address",
//       name:"email",
//       type:"email",
//       autoComplete:"email",
//       isRequired:true,
//       placeholder:"Email address"   
//   },
//   {
//       labelText:"Password",
//       labelFor:"password",
//       id:"password",
//       name:"password",
//       type:"password",
//       autoComplete:"current-password",
//       isRequired:true,
//       placeholder:"Password"   
//   }
// ]
export default function Signin(){
  return(
      <>
      <Stack alignItems="center" marginTop={30} alignSelf="center"  spacing={2} color="black" direction="column">
           <Header
              heading="Login to your account"
              paragraph="Don't have an account yet? "
              linkName="Signup"
              linkUrl="/signup"
              />
              <Login/>
              <p className="mt-2 text-center text-sm text-gray-600 mt-5">
            {"Don't have an account yet?"} {' '}
            <Link to="/signup" className="font-medium text-purple-600 hover:text-purple-500">
                {"Signup"}
            </Link>
            </p>
      </Stack>
          
      </>
  )
}