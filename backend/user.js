const database = require("./database");
const express = require("express");

router = express.Router();

router.get("/customers/all", (request, response) => {
  database.connection.query(
    `select *
                               from customers`,
    (errors, results) => {
      if (errors) {
        console.log(errors);
        response.status(500).send("Internal Serve Error");
      } else {
        response.status(200).send(results);
      }
    }
  );
});

router.get("/customers/by-uid", (request, response) => {
  if (request.query.id.length === 0 || isNaN(request.query.id)) {
    console.log(`Invalid ID received. ID: ${request.query.id}`);
    response.status(400).send("Invalid ID received.");
    return;
  }
  console.log("customer: " + request.query.id);
  database.connection.query(
    `select *
         from customers
         where id = ${request.query.id}`,
    (errors, results) => {
      if (errors) {
        console.log(errors);
        response.status(500).send("Internal Serve Error");
      } else {
        response.status(200).send(results);
      }
    }
  );
});

router.get("/customers/by-name", (request, response) => {
  // if (request.query.id.length === 0) {
  //   console.log(`Invalid ID received. ID: ${request.query.id}`);
  //   response.status(400).send("Invalid ID received.");
  //   return;
  // }
  console.log("customer: " + request.query[0]);
  database.connection.query(
    `select * from customers where first_name = "${request.query.id}"`,
    (errors, results) => {
      if (errors) {
        console.log(errors);
        response.status(500).send("Internal Serve Error");
      } else {
        response.status(200).send(results);
      }
    }
  );
});

module.exports = {
  router,
};
