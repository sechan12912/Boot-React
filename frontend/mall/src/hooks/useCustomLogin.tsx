import { Navigate, useNavigate } from "react-router"
import { useEffect } from "react"
import { getCookie } from "../util/cookieUtil"
import useZustandMember from "../zstore/useZustandMember"

const useCustomLogin = () => {

  const {member, status, login, logout, save} = useZustandMember()

  const loginState = member

  const loginStatus = status

  const navigate = useNavigate()

  const doLogin = async (email:string, pw:string) => {
    login(email, pw)
  }

  useEffect(() => {

    if(!loginStatus) {

      const member = getCookie("member")

      console.log("member from cookie ")
      console.log(member)

      if(member){
        save(member)
      }
    }
  },[])

  const doLogout = () => {
    logout()
  }

  const moveToLogin = () => {
    navigate("/member/login")
  }

  const moveToLoginReturn = () => {
    return <Navigate replace to="/member/login"/>
  }

  const moveToPath = (path:string) => {
    navigate({pathname: path}, {replace:true})
  }

  return {loginState, loginStatus, doLogin, doLogout, moveToLogin, moveToLoginReturn, moveToPath}
}

export default useCustomLogin
