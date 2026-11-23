import { useEffect } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../store";
import { save } from "../../slices/loginSlice";

const KakaoRedirectPage = () => {

  const [searchParams] = useSearchParams()

  const authCode = searchParams.get("code")

  const dispatch = useDispatch<AppDispatch>()

  const navigate = useNavigate()

  useEffect(() => {

    if(authCode){

      getAccessToken(authCode).then(data => {
        console.log(data)

        if(data){
          getMemberWithAccessToken(data).then(memberInfo => {
            console.log("-------------------")
            console.log(memberInfo)

            dispatch(save(memberInfo))

            if(memberInfo.social){
              navigate('/member/modify')
            }
          })
        }
      })
    }

  }, [authCode])

  return (
    <>
      <Navigate to={'/'}></Navigate>
    </>
  )
}

export default KakaoRedirectPage;
