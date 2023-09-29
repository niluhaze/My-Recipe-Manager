import React from "react";
import { Link, useSearchParams } from "react-router-dom";

const getLinkAddress = (pageNumber) => {
  const [searchParams] = useSearchParams(); // get the search parameters from the url
  searchParams.set("page", String(pageNumber)); // modify the page varaible
  return "/my-recipes?" + searchParams.toString(); // apply modified search params
};

const PageButton = ({ page=1, text=page, isCurrentPage=false }) => {
  return(
    <Link to={getLinkAddress(page)}>
      <div className={`${(isCurrentPage) ? "text-primary" : ""} h-8 w-8 flex justify-center items-center rounded-full drop-shadow hover:drop-shadow-lg bg-components text-neutral-400`}>
        <p className="relative -top-px text-lg font-semibold">
          {text}
        </p>
      </div>
    </Link>
  );
};

export default PageButton;
