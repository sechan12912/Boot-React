import { useMutation, useQueryClient } from "@tanstack/react-query"
import PendingModal from "../common/pendingModal"
import useCustomMove from "../../hooks/useCustomMove"
import ResultModal from "../common/resultModal"
import jwtAxios from "../../util/jwtUtil"

const addProduct = async (formData: FormData) => {
  const res = await jwtAxios.post('http://localhost:8080/api/products/', formData)
  return { result: res.data.result }
}

const AddComponent = () => {

  const { moveToList } = useCustomMove()

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: (data) => {
      console.log("---------------------------")
      console.log(data)
      queryClient.invalidateQueries({
        queryKey: ['products/list'],
        exact: false
      })
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    mutation.mutate(formData)
  }

  const closeModal = () => {
    moveToList()
  }

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">

      {mutation.isPending && <PendingModal />}

      {mutation.data?.result &&
        <ResultModal
          title="상품추가결과"
          content={`새로운${mutation.data.result} 상품추가됨`}
          callbackFn={closeModal}
        />
      }

      <form onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">Product Name</div>
            <input
              className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
              name="pname"
              required
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">Desc</div>
            <textarea
              className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
              name="pdesc"
              rows={4}
              required
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">Price</div>
            <input
              className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
              name="price"
              type="number"
              required
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">Files</div>
            <input
              className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
              type="file"
              name="files"
              multiple
            />
          </div>
        </div>
        <div className="flex justify-end">
          <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
            <button
              type="submit"
              className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
            >
              ADD
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddComponent;
