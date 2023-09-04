import { useQuery, useMutation } from "@tanstack/react-query"
import axios from "axios"

const HOST_PATH = "http://localhost:3000"

//makes an http GET request to the backend with the given queryKey and to the given urlPath
export function doGetQuery(qKey, urlPath = "/") {

  const query = useQuery({
    queryKey: [qKey],
    queryFn: async () => {
      const { data } = await axios.get(
        HOST_PATH + urlPath)
      return data
    }
  })

  return query

}