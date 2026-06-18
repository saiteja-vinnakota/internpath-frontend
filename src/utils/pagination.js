export function getTotalPages(
  totalItems,
  pageSize
) {

  return Math.ceil(
    totalItems /
    pageSize
  );
}

export function paginate(
  items,
  currentPage,
  pageSize
) {

  const startIndex =

    (currentPage - 1)

    * pageSize;

  const endIndex =

    startIndex +

    pageSize;

  return items.slice(
    startIndex,
    endIndex
  );
}

export function getPageNumbers(
  totalPages
) {

  return Array.from(
    {
      length:
        totalPages,
    },
    (_, index) =>
      index + 1
  );
}