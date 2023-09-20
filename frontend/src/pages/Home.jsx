/* 
  Home page.
  Currently unused.
*/

//specify imports
import { Navigate } from "react-router-dom";

export function Home() {
  return (
    <>
      {/* No content on this page (yet). Redirecting to /my-recipes */}
      <Navigate to="my-recipes" />
    </>
  );
}
