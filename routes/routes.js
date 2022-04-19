const express = require("express");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;
const Employee = require("../models/employee.js");

const adminService = require("../admin.service");

//GET Single employee
router.get("/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    Employee.findById(req.params.id, (err, doc) => {
      if (err) {
        // console.log("Error in GET Employee by ID " + err);
      } else {
        res.send(doc);
      }
    });
  } else {
    return res.status(400).send(` No record found with ${req.params.id}`);
  }
});

//GET API
router.get("/", (req, res) => {
  Employee.find((err, doc) => {
    if (err) {
    //   console.log("Error in GET Data " + err);
    } else {
      res.send(doc);
    }
  });
});

//POST API
router.post("/", async (req, res) => {
  try {
    //   let emp = new Employee({
    //     name: req.body.name,
    //     position: req.body.position,
    //     dept: req.body.dept,
    //   });

    //   emp.save((err, doc) => {
    //     if (err) {
    //       console.log("Error in Post Data " + err);
    //     } else {
    //       res.send(doc);
    //     }
    //   });

    if (!req || !req.body || !req.body.email) {
      return res.status(400).json({ status: 400, message: "Bad request" });
    }

    await adminService.createNewuser(req.body);
    return res.json({
      success: true,
    });
  } catch (error) {
      console.log(error)
    return res.status(500).json({ status: 500, message: error });
  }
});

//PUT API
router.put("/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    let emp = {
      name: req.body.name,
      position: req.body.position,
      dept: req.body.dept,
    };

    Employee.findByIdAndUpdate(
      req.params.id,
      { $set: emp },
      { new: true },
      (err, doc) => {
        if (err) {
        //   console.log("Error in Update Employee by ID " + err);
        } else {
          res.send(doc);
        }
      }
    );
  } else {
    return res.status(400).send(` No record found with ${req.params.id}`);
  }
});

// DELETE Single employee
router.delete("/:id", async (req, res) => {
  if ((req && req.params && req.params.id)) {
    try {
        await adminService.deleteUser(req.params.id);
        return res.json({
          success: true,
        });
        } catch (error) {
            // console.log(error)
          return res.status(500).json({ status: 500, message: error });
        }
  } else {
    return res.status(400).send(` No record found with ${req.params.id}`);
  }
});

module.exports = router;
