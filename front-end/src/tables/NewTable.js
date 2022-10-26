import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function NewTable() {
  const history = useHistory();

  const initialFormState = {
    table_name: "",
    capacity: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [formErrors, setFormErrors] = useState([]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
    console.log(formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setFormErrors([]);

    const errors = [];

    if (!event.target.checkValidity())
      event.target.classList.add("was-validated");

    formData.capacity = Number(formData.capacity);

    if (formData.table_name.length < 2) {
      errors.push({
        message: `Table name must be at least 2 characters long.`,
      });
    }

    if (formData.capacity < 1) {
      errors.push({
        message: `Capacity must be at least 1.`,
      });
    }

    setFormErrors(errors);

    createTable(formData, abortController.signal)
      .then((_) => {
        history.push(`/dashboard`);
      })
      .catch((e) => console.log(e));

    return () => abortController.abort();
  };

  let displayErrors = formErrors.map((error, index) => (
    <ErrorAlert key={index} error={error} />
  ));

  return (
    <>
      <div className="text-center mt-3 mb-5">
        <h1>Create New Table</h1>
      </div>
      {formErrors.length ? displayErrors : null}
      <div className="d-flex justify-content-center">
        <form className="w-50" noValidate={true} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label sr-only" htmlFor="table_name">
              Table Name:
            </label>
            <input
              required
              type="text"
              placeholder="Table Name"
              onChange={handleChange}
              value={formData.table_name}
              className="form-control shadow-sm"
              name="table_name"
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label sr-only" htmlFor="capacity">
              Capacity:
            </label>
            <input
              required
              type="text"
              placeholder="Capacity"
              min="1"
              onChange={handleChange}
              value={formData.capacity}
              className="form-control shadow-sm"
              name="capacity"
            ></input>
          </div>
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

export default NewTable;
