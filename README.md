# Capstone: Restaurant Reservation System

> I have been hired as a full stack developer at _Periodic Tables_, a startup that is creating a reservation system for fine dining restaurants.
> The software is used only by restaurant personnel when a customer calls to request a reservation.

How to set up:

1. Fork and download project.
2. Run npm install

> Backend
1. Create an .env file and setup databases for the following:
DATABASE_URL=""
DATABASE_URL_DEVELOPMENT=""
DATABASE_URL_TEST=""
DATABASE_URL_PREVIEW=""
2. cd into backend and knex seed database
3. npm start to run backend on port 5001

>Frontend
1. Start a new terminal and cd into frontend
2. Create an .env file that includes:
REACT_APP_API_BASE_URL=http://localhost:5001
3. npm start to run frontend