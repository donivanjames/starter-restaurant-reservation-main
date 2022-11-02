import { unseatTable } from "../utils/api";
import "../NewLayout.css";

function Table({ table, loadDashboard }) {
  function clickHandler() {
    if (window.confirm("Is this table ready to seat new guests?")) {
      const abortController = new AbortController();
      unseatTable(table.table_id, abortController.signal)
        .then(loadDashboard)
        .catch((error) => console.log("error", error));
      return () => abortController.abort();
    }
  }

  return (
    <div className="card mb-3 dark-green shadow-sm">
      <h5 className="card-header dark-green">Table Name: {table.table_name}</h5>
      <div className="card-body new-card-body">
        <div className="container">
          <div className="row d-flex">

            {table.reservation_id ? (
              <div
                data-table-id-finish={table.table_id}
                onClick={clickHandler}
                role="button"
                className="col btn green-button rounded justify-content-center align-self-center"
              >
                <h5 className="text-center mb-1">
                  Finish
                </h5>
              </div>
            ) : (
              <h5 className="col card-title mb-0 justify-content-center align-self-center">
                Capacity: {table.capacity}
              </h5>
            )}

            {table.reservation_id ? (
              <>
                <div
                  className="col btn red-button rounded justify-content-center align-self-center"
                  data-table-id-status={table.table_id}
                  style={{ cursor: "default" }}
                >
                  Occupied
                </div>
              </>
            ) : (
              <div
                className="col btn rounded green-button justify-content-center align-self-center"
                data-table-id-status={table.table_id}
                style={{ cursor: "default" }}
              >
                Free
              </div>
            )}
          </div>
        </div>
      </div>
      {/* {table.reservation_id ? (
        <div
          data-table-id-finish={table.table_id}
          onClick={clickHandler}
          role="button"
          className="card-footer green-button text-decoration-none"
        >
          <h5 className="text-center text-decoration-none mb-1">
            Finish
          </h5>
        </div>
      ) : null} */}
    </div>
  );
}

export default Table;
