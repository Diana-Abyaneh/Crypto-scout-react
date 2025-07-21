/* eslint-disable react/prop-types */
import styles from "./Pagination.module.css";

function Pagination({ page, setPage }) {
  const prevHandler = () => {
    if (page <= 1) return;
    setPage((page) => page - 1);
  };

  const nextHandler = () => {
    if (page >= 10) return;
    setPage((page) => page + 1);
  };

  const pageHandler = (pageNumber) => {
    if (pageNumber === page) return;
    setPage(pageNumber);
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={prevHandler}
        className={page === 1 ? styles.disabled : null}
      >
        Previous
      </button>
      <p
        className={page === 1 ? styles.selected : null}
        onClick={() => pageHandler(1)}
      >
        1
      </p>
      <p
        className={page === 2 ? styles.selected : null}
        onClick={() => pageHandler(2)}
      >
        2
      </p>
      {page > 2 && page < 9 && (
        <>
          <span>...</span>
          <p className={styles.selected}>{page}</p>
        </>
      )}
      <span>...</span>
      <p
        className={page === 9 ? styles.selected : null}
        onClick={() => pageHandler(9)}
      >
        9
      </p>
      <p
        className={page === 10 ? styles.selected : null}
        onClick={() => pageHandler(10)}
      >
        10
      </p>
      <button
        onClick={nextHandler}
        className={page === 10 ? styles.disabled : null}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
