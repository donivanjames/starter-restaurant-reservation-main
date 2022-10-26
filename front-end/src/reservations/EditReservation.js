import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { updateReservation, readReservation } from "../utils/api";
import addDashes from "../utils/addDashes";
import ErrorAlert from "../layout/ErrorAlert";
import formatReservationDate from "../utils/format-reservation-date";
import Form from "../form/Form";

function EditReservationForm() {
  const history = useHistory();

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const [formErrors, setFormErrors] = useState([]);

  const { reservation_id } = useParams();

  useEffect(() => {
    async function loadReservation() {
      const abortController = new AbortController();
      const reservation = await readReservation(
        reservation_id,
        abortController.signal
      );
      setFormData({ ...formatReservationDate(reservation) });
      return () => abortController.abort();
    }

    loadReservation();
  }, [reservation_id]);

  const handleChange = ({ target }) => {
    if (target.name === "mobile_number") addDashes(target);
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setFormErrors([]);
    const reservationDate = new Date(
      `${formData.reservation_date}T${formData.reservation_time}:00`
    );

    const [hours, minutes] = formData.reservation_time.split(":");

    const errors = [];

    if (!event.target.checkValidity())
      event.target.classList.add("was-validated");

    if (Date.now() > Date.parse(reservationDate)) {
      errors.push({
        message: `Reservation must be for a future date or time.`,
      });
    }

    if (reservationDate.getDay() === 2) {
      errors.push({
        message: `Periodic Tables is closed on Tuesdays. Sorry!`,
      });
    }

    if ((hours <= 10 && minutes < 30) || hours <= 9) {
      errors.push({
        message: `Periodic Tables opens at 10:30 AM.`,
      });
    }

    if ((hours >= 21 && minutes > 30) || hours >= 22) {
      errors.push({
        message: `Periodic Tables stops accepting reservations at 9:30 PM.`,
      });
    }

    formData.people = Number(formData.people);

    if (formData.people < 1) {
      errors.push({
        message: `Bookings must include at least 1 guest`,
      });
    }

    setFormErrors(errors);

    !errors.length &&
      updateReservation(formData, reservation_id, abortController.signal)
        .then((_) => {
          history.push(`/dashboard?date=${formData.reservation_date}`);
        })
        .catch((e) => console.log(e));

    return () => abortController.abort();
  };

  let displayErrors = formErrors.map((error) => (
    <ErrorAlert key={error} error={error} />
  ));

  return (
    <>
      <div className="text-center mt-3 mb-5">
        <h1>Edit Booking</h1>
      </div>
      {displayErrors}
      <Form
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default EditReservationForm;
