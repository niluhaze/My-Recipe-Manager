import React, { useEffect, useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const SaveButton = ({ urlName, isSavedDefault = false }) => {
  const [isSaved, setIsSaved] = useState(isSavedDefault); // stores saved state of recipe

  const queryClient = useQueryClient(); // used to invalidate queries after mutation
  // prepare POST mutation
  const postMutation = useMutation({
    mutationFn: (data) => {
      return axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/save/${urlName}`, data);
    },
    onSuccess: () => {
      // invalidate queries that contain save Button
      queryClient.invalidateQueries(["my-recipes", `recipe-${urlName}`])
    }
  });

  const handleClick = (event) => {
    event.preventDefault();
    setIsSaved(isSaved => !isSaved)
  }

  const [isFirst, setIsFirst] = useState(true); //for making sure the toggle doesn't trigger on mount
  useEffect(() => {
    //make sure the code after if block does't get run on mount
    if (isFirst) {
      setIsFirst(false);
      return;
    }
    postMutation.mutate({saved: isSaved});
  },[isSaved])

  return (
    <button onClick={handleClick} className="p-3 w-10 h-10 bg-gray-translucent-500 hover:bg-components-translucent-500 rounded-full  child:hover:fill-primary-400">
      {isSaved ? (
        <svg // bookmark icon solid
          className="fill-primary relative -top-[2px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
        </svg>
      ) : (
        <svg // bookmark icon outline 
          className="relative -top-[2px] fill-components"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
        </svg>
      )}
    </button>
  );
};
