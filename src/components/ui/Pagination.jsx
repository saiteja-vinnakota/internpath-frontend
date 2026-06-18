function Pagination({

  currentPage,

  totalPages,

  onPageChange,

}) {

  if (
    totalPages <= 1
  ) {

    return null;
  }

  const pages = [];

  for (
    let page = 1;
    page <= totalPages;
    page++
  ) {

    pages.push(page);
  }

  return (

    <div
      className="
        flex
        items-center
        justify-center
        gap-2
        mt-10
        flex-wrap
      "
    >

      {/* PREVIOUS */}
      <button
        onClick={() =>
          onPageChange(
            currentPage - 1
          )
        }
        disabled={
          currentPage === 1
        }
        className="
          h-11
          px-5

          rounded-2xl

          border
          border-border

          bg-white

          text-sm
          font-medium

          transition-all

          hover:border-primary
          hover:text-primary

          disabled:opacity-40
          disabled:cursor-not-allowed
        "
      >

        Previous

      </button>

      {/* PAGE NUMBERS */}
      {pages.map(
        (page) => (

          <button
            key={page}
            onClick={() =>
              onPageChange(
                page
              )
            }
            className={`
              h-11
              w-11

              rounded-2xl

              text-sm
              font-medium

              transition-all

              ${
                currentPage === page

                  ? `
                    bg-primary
                    text-white
                  `

                  : `
                    bg-white

                    border
                    border-border

                    hover:border-primary
                    hover:text-primary
                  `
              }
            `}
          >

            {page}

          </button>

        )
      )}

      {/* NEXT */}
      <button
        onClick={() =>
          onPageChange(
            currentPage + 1
          )
        }
        disabled={
          currentPage ===
          totalPages
        }
        className="
          h-11
          px-5

          rounded-2xl

          border
          border-border

          bg-white

          text-sm
          font-medium

          transition-all

          hover:border-primary
          hover:text-primary

          disabled:opacity-40
          disabled:cursor-not-allowed
        "
      >

        Next

      </button>

    </div>

  );
}

export default Pagination;
