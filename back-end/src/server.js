const { PORT = 5001 } = process.env;

const app = require("./app");
const knex = require("./db/connection");

knex.migrate
  .latest()
  .then((migrations) => {
    app.listen(PORT, listener);
  })
  .catch((error) => {
    knex.destroy();
  });

function listener() {
  console.log(`Listening on Port ${PORT}!`);
}
