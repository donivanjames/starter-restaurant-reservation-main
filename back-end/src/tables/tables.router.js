/**
 * Defines the router for table resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// DEFAULT ROUTE
router.route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

// ROUTE TABLE_ID/SEAT
router.route("/:table_id/seat")
  .put(controller.seat)
  .delete(controller.unseat)
  .all(methodNotAllowed);

module.exports = router;
