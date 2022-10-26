import { unseatTable } from "../utils/api";
// import { useEffect, useRef } from "react";

function Table({ table, loadDashboard }) {
  // const ref = useRef(null);
  function clickHandler() {
    if (window.confirm("Is this table ready to seat new guests?")) {
      const abortController = new AbortController();
      unseatTable(table.table_id, abortController.signal)
        .then(loadDashboard)
        .catch((error) => console.log("error", error));
      return () => abortController.abort();
    }
  }

  // useEffect(() => {
  //   const el2 = ref.current;
  //   if (table.reservation_id) {
  //     el2.classList.add("text-bg-secondary");
  //     el2.classList.add("opacity-50");
  //   }
  // }, [table.reservation_id]);

  return (
    <div
      // ref={ref}
      className="card mb-3 shadow-sm"
      // style={{ height: "18rem" }}
    >
      <h5 className="card-header">Table Name: {table.table_name}</h5>
      <div className="card-body">
        <div className="container">
          <div className="row d-flex">
            <h5 className="col card-title mb-0 justify-content-center align-self-center">
              Capacity: {table.capacity}
            </h5>
            {table.reservation_id ? (
              <>
                <div
                  className="col btn border border-warning rounded text-warning"
                  data-table-id-status={table.table_id}
                  style={{ cursor: "default" }}
                >
                  Occupied
                </div>
              </>
            ) : (
              <div
                className="col btn border border-success rounded text-success"
                data-table-id-status={table.table_id}
                style={{ cursor: "default" }}
              >
                Free
              </div>
            )}
          </div>
        </div>
      </div>
      {table.reservation_id ? (
        <div
          data-table-id-finish={table.table_id}
          onClick={clickHandler}
          role="button"
          className="card-footer bg-primary text-decoration-none"
        >
          <h5 className="text-white text-center text-decoration-none mb-1">
            Finish
          </h5>
        </div>
      ) : null}
    </div>
  );
}

export default Table;
