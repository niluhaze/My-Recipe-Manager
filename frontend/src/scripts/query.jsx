/* 
  Make queries to the backend and return a Promise, which can be used to get the response data or the current state of the query.
*/

import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

// Set the maximum request payload size
axios.defaults.maxBodyLength = 10 * 1024 * 1024; // 10MB

const HOST_PATH = "http://192.168.178.31:3000";

// makes an http GET request to the backend with the given queryKey and to the given urlPath
export function doGetQuery(qKey, urlPath) {
  const query = useQuery({
    queryKey: [qKey],
    queryFn: async () => {
      const { data } = await axios.get(HOST_PATH + urlPath);
      return data;
    },
  });
  return query;
}

// makes an http POST request to the backend with the given queryKey, to the given urlPath and with the given data
export function doPostQuery(urlPath) {
  const mutation = useMutation({
    mutationFn: (data) => {
      return axios.post(HOST_PATH + urlPath, data);
    },
  });
  return mutation;
}

// makes an http DELETE request to the backend with the given queryKey and to the given urlPath
export function doDeleteQuery(urlPath) {
  const mutation = useMutation({
    mutationFn: () => {
      return axios.delete(HOST_PATH + urlPath);
    },
  });
  return mutation;
}