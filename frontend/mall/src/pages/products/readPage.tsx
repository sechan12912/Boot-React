import { useParams } from "react-router";
import ReadComponent from "../../components/products/readComponent";
import jwtAxios from "../../util/jwtUtil";
import { useQuery } from "@tanstack/react-query";
import PendingModal from "../../components/common/pendingModal";

function ReadPage() {

  const { pno } = useParams();

  const {data, isPending } = useQuery({
    queryKey: ['product', pno],
    queryFn: async () =>
    {
      const res = await jwtAxios.get(`http://localhost:8080/api/products/${pno}`)
      return res.data
    },
    staleTime: 1000 * 60 * 24
  })

  const product:ProductDTO = data

  console.log(product)

  return (
    <div className="w-full">

      {isPending && <PendingModal/>}

      <div>Product Read</div>

      {data &&
        <ReadComponent product={product}/>
      }
    </div>
  )
}

export default ReadPage
