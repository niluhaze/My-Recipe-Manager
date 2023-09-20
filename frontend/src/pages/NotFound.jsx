/* 
  Displayed when accessing an undefined page or trying to access data which doesn't exist.
  Redirects to "/my-recipes" after 2s
*/

//specify imports
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function NotFound() {
  //when user accesses page which doesn't exist, show them a 404 Error and redirect them to /ny-recipes after 2 seconds
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/my-recipes");
    }, 2000);
  }, []);

  return (
    <>
      <h1 className="text-3xl p-3">404 - Page not found.</h1>
    </>
  );
}