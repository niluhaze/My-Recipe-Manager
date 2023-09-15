import React from "react";
import { Edit } from "../components/Edit";

export const EditNew = () => {
  return (
    /* 
      A unique key tells React to rerender Edit,
      otherwise it might show old data when editing different recipes after each other.
    */
    <Edit key={"new" + Date.now()} />
  );
};
