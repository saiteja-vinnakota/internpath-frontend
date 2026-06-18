import {
  useMemo,
  useState,
} from "react";

import {

  paginate,

  getTotalPages,

} from "../utils/pagination";

function usePagination(

  items = [],

  pageSize = 6

) {

  const [

    currentPage,

    setCurrentPage,

  ] = useState(1);

  // TOTAL PAGES
  const totalPages =
    useMemo(
      () =>

        getTotalPages(
          items.length,
          pageSize
        ),

      [

        items.length,

        pageSize,
      ]
    );

  // CURRENT PAGE ITEMS
  const currentItems =
    useMemo(
      () =>

        paginate(

          items,

          currentPage,

          pageSize
        ),

      [

        items,

        currentPage,

        pageSize,
      ]
    );

  // NEXT PAGE
  const nextPage =
    () => {

      setCurrentPage(
        (prev) =>

          Math.min(

            prev + 1,

            totalPages
          )
      );
    };

  // PREVIOUS PAGE
  const prevPage =
    () => {

      setCurrentPage(
        (prev) =>

          Math.max(
            prev - 1,
            1
          )
      );
    };

  // GO TO PAGE
  const setPage =
    (page) => {

      if (

        page >= 1 &&

        page <= totalPages

      ) {

        setCurrentPage(
          page
        );
      }
    };

  return {

    currentItems,

    currentPage,

    totalPages,

    nextPage,

    prevPage,

    setPage,
  };
}

export default usePagination;