import React, { useState } from "react"
import { Button } from "react-bootstrap"

export default function NewReservation(props){

    const [name, setName] = useState('')

    const handleNameChange = event => setName(event.target.value)
    
    const handleSubmit = event => {
        // reset form
    }


    return (
        <div>
            <h1>Create Reservation</h1>

            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="First Name">First Name</label><br />
                <input id="First Name" type="text" />
            </div>
            <div>
                <label htmlFor="First Name">Last Name</label><br />
                <input id="First Name" type="text" />
            </div>
            <div>
                <label htmlFor="Mobile Number">Mobile Number</label><br />
                <input id="Mobile Number" type="number" />
            </div>
            <div>
                <label htmlFor="Reservation Date">Reservation Date</label><br />
                <input id="Reservation Date" type="date" />
            </div>
            <div>
                <label htmlFor="Reservation Time">Reservation Time</label><br />
                <input id="Reservation Time" type="time" />
            </div>
            <div>
                <label htmlFor="Party Size">Party Size</label><br />
                <input id="Party Size" type="number" />
            </div>
            <br />
            
            <button type="cancel" class="btn btn-light">Cancel</button>
            <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>

        
    );
    
}

