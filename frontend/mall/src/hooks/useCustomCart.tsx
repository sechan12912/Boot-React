import { useEffect } from "react"
import useZustandMember from "../zstore/useZustandMember"
import useZustandCart from "../zstore/useZustandCart"

function useCustomCart() {

  const {member, status:memberStatus} = useZustandMember ()

  const loginState = member

  const loginStatus = memberStatus

  const {items , requestChangeCart , getItems, status} = useZustandCart()

  useEffect(() => {

    if(loginStatus) {
      getItems()
    }

  },[loginStatus])

  const changeCart = (cino: number | null , pno: number, amount:number) => {

    const email = loginState.email

    let qty = 1

    if(cino){
      const targetArr = items.filter(item => item.cino === cino)

      if(targetArr.length > 0) {
        qty = targetArr[0].qty + amount
      }
    }

    const requestItem:CartItemRequest = cino ? {email, cino, pno, qty } : {email, pno, qty}

    console.log(requestItem)

    requestChangeCart(requestItem)
  }

  return {loginState, loginStatus, cartItems: {items: items, status: status} , changeCart}
}

export default useCustomCart
