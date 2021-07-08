/* Updated by: Robin
   Modified on: 2021-07-08
   Note: modified the 2 get routers to search by id, search by name 
   and created 1 router for update and 1 router for delete*/
   
const database = require("./database");
const express = require("express");

router = express.Router();

router.get("/customers/all", (request, response) => {
  database.connection.query(
    `select * from customers`,
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


router.get("/customers/by-id", (req, res) => {
  let id = req.query.id; 
  let x = `
    select * from customers 
    where id = ${id}
    `;
    //console.log("query: "+x);   
  database.connection.query(x, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Server Error:\n" + error);
    } else {
      res.status(200).send(results);
    }
  });
});

router.get("/customers/by-name", (req, res) => {
  let name = req.query.first_name; 
  let x = `
    select * from customers 
    where first_name = '${name}'    
    `;
  //console.log("query: "+x);  
  database.connection.query(x, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Server Error:\n" + error);
    } else {
      res.status(200).send(results);
    }
  });
});

//update router 
router.put("/customers/update/by-id", (req, res) => { 
  let id = req.body.id;
  let gold = req.body.gold_points;
  let harvest = req.body.harvest_points;

  // console.log("id: "+id);
  // console.log("gold: "+gold);
  // console.log("harvest: "+harvest);

  let x = `
    update customers
    set gold_points = ${gold}  
    , harvest_points = ${harvest}  
    where id = ${id}
    `;
  //console.log("query: "+x);  
  database.connection.query(x, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Server Error:\n" + error);
    } else {
      console.log("updated successfully"); 
      res.status(200).send("Updated Successfully!");
    }
  });
});


//delete router
router.delete("/customers/delete/by-id", (req, res) => {
  let id = req.query.id; 
  console.log("id: "+id);  
  let x = `
    delete from customers 
    where id = ${id} 
    `;
  //console.log("query: "+x);
  database.connection.query(x, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Server Error:\n" + error);
    } else {
      res.status(200).send("Deleted Successfully!");
    }
  });
});

// router.get("/customers/by-uid", (request, response) => {
//   if (request.query.id.length === 0 || isNaN(request.query.id)) {
//     console.log(`Invalid ID received. ID: ${request.query.id}`);
//     response.status(400).send("Invalid ID received.");
//     return;
//   }
//   console.log("customer: " + request.query.id);
//   database.connection.query(
//     `select *
//          from customers
//          where id = ${request.query.id}`,
//     (errors, results) => {
//       if (errors) {
//         console.log(errors);
//         response.status(500).send("Internal Serve Error");
//       } else {
//         response.status(200).send(results);
//       }
//     }
//   );
// });

// router.get("/customers/by-name", (request, response) => {
//   // if (request.query.id.length === 0) {
//   //   console.log(`Invalid ID received. ID: ${request.query.id}`);
//   //   response.status(400).send("Invalid ID received.");
//   //   return;
//   // }
//   console.log("customer: " + request.query[0]);
//   database.connection.query(
//     `select * from customers where first_name = "${request.query.id}"`,
//     (errors, results) => {
//       if (errors) {
//         console.log(errors);
//         response.status(500).send("Internal Serve Error");
//       } else {
//         response.status(200).send(results);
//       }
//     }
//   );
// });

module.exports = {
  router,
};
