import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { listTables, updateTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function Seat() {
  const history = useHistory();
  const { reservation_id } = useParams();

  const [tables, setTables] = useState([]);
  const [tableId, setTableId] = useState("");
  const [formErrors, setFormErrors] = useState([]);

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables).catch(console.log);
    return () => abortController.abort();
  }

  const handleChange = ({ target }) => {
    setTableId(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setFormErrors([]);

    const errors = [];

    // **** Check of table capacity is sufficient

    // if (tables[table].capacity < reservation.people) {
    //   errors.push({
    //     message: `Table ${table.table_name} does not have enough capacity to seat this reservation`,
    //   });
    // }

    setFormErrors(errors);

    // **** Seat table API Call

    updateTable(reservation_id, tableId, abortController.signal)
      .then((_) => {
        history.push(`/dashboard`);
      })
      .catch((e) => console.log(e));

    return () => abortController.abort();
  };

  let displayErrors = formErrors.map((error) => (
    <ErrorAlert key={error} error={error} />
  ));

  const tableList = tables.map((table) => (
    <option key={table.table_id} value={table.table_id}>
      {table.table_name} - {table.capacity}
    </option>
  ));
  return (
    <>
      <div className="text-center mt-3 mb-5">
        <h1>Select A Table</h1>
      </div>
      {formErrors.length ? displayErrors : null}
      <div className="d-flex justify-content-center">
        <form className="form-inline" onSubmit={handleSubmit}>
          <label className="form-label sr-only" htmlFor="table">
            Table Name:
          </label>
          <select
            required
            onChange={handleChange}
            value={tableId}
            className="form-control shadow-sm"
            name="table_id"
          >
            <option value="">-- Choose Table --</option>
            {tableList}
          </select>
          <button className="btn btn-primary mx-2" type="submit">
            Submit
          </button>
          <button
            onClick={history.goBack}
            type="button"
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default Seat;
