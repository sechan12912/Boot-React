import { createSearchParams } from "react-router";
import ListComponent from "../../components/products/listComponent";
import jwtAxios from "../../util/jwtUtil";
import { useQuery } from "@tanstack/react-query";
import useCustomMove from "../../hooks/useCustomMove";
import PendingModal from "../../components/common/pendingModal";

const ListPage = () => {

  const {page,size} = useCustomMove()

  const queryStr = createSearchParams({page: String(page), size: String(size)}).toString()

  const {data, isPending} = useQuery({
    queryKey: ['products/list', page, size],
    queryFn: async () => {
      const res = await jwtAxios.get(`http://localhost:8080/api/products/list?${queryStr}`)
      return res.data
    },
    staleTime: 1000 * 60
  } )

  return (
    <div className="w-full mt-4 border border-solid border-neutral-300 shadow-md">

      {isPending && <PendingModal/>}

      <div className="text-2xl m-4 font-extrabold">
        Products List Page
      </div>

      {data &&
        <ListComponent serverData={data} ></ListComponent>
      }
    </div>
  );
}

export default ListPage;
