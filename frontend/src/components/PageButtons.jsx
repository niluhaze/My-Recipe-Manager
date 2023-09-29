import React from "react";
import PageButton from "./PageButton";

const PageButtons = ({ currentPage, pageQuantity }) => {
  // don't show page buttons if number of pages is too low
  if (pageQuantity <= 1) return null;

  currentPage = Number(currentPage);
  // store page numbers to add in set
  const pageNumbersToAdd = new Set([1, pageQuantity]); // always add first and last page

  // find page number next to which to add two other page numbers
  // e.g. if addPagesNextTo was 4, add 3, 4, 5 to pageNumbersToAdd
  let addPagesNextTo = currentPage;
  // in special cases, addPagesNextTo deviates from current page:
  if (pageQuantity <= 5) addPagesNextTo = Math.round((1 + pageQuantity) / 2);
  else if (currentPage <= 2) addPagesNextTo = 3;
  else if (currentPage >= pageQuantity - 1) addPagesNextTo = pageQuantity - 2;

  // add pages next to value
  pageNumbersToAdd.add(addPagesNextTo - 1);
  pageNumbersToAdd.add(addPagesNextTo);
  pageNumbersToAdd.add(addPagesNextTo + 1);

  return (
    <div className="flex gap-2">
      {/* Previous Page (show if not first page) */}
      {currentPage > 1 ? (
        <PageButton
          page={currentPage - 1}
          text="<"
          key="page-button-previous"
        />
      ) : (
        <div className="w-8"></div>
      )}
      {[...pageNumbersToAdd]
        .sort((a, b) => a - b)
        .map((value, index, elements) => (
          <div className="flex gap-2" key={value}>
            <PageButton page={value} isCurrentPage={currentPage === value} />
            {elements[index + 1] - value > 1 ? ( // if the difference between the current and next value is greater than 1, add ellipsis:
              <span className="text-neutral-400">⋯</span>
            ) : null}
          </div>
        ))}
      {/* Next Page (show if not last page) */}
      {currentPage < pageQuantity ? (
        <PageButton page={currentPage + 1} text=">" key="page-button-next" />
      ) : (
        <div className="w-8" key="page-button-next"></div>
      )}
    </div>
  );
};

export default PageButtons;
