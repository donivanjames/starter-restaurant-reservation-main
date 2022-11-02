import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Reservation from "./Reservation";
import Table from "./Table";
import DateNavigation from "./DateNavigation";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    setTablesError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  const reservationList = reservations.map((reservation) => {
    console.log(reservation)

    if(reservation.status != 'seated'){
      return <Reservation
      loadDashboard={loadDashboard}
      key={reservation.reservation_id}
      reservation={reservation}
    />
    }
  });

  const tableList = tables.map((table) => (
    <Table loadDashboard={loadDashboard} key={table.table_id} table={table} />
  ));

  return (
    <main>
        <div className="headers">Dashboard</div>
        <DateNavigation date={date} />
      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />
        <div className="row">
          <div className="col col-sm">
            <h4 className="mb-4">Reservations for: {date}</h4>
            {reservationList}
          </div>
          <div className="col col-sm">
            <h4 className="mb-4">Tables:</h4>
            {tableList}
          </div>
      </div>
    </main>
  );
}

export default Dashboard;
