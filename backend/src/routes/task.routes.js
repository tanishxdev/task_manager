const express = require("express");
const protect = require("../middlewares/auth.middleware");
const {
  create,
  getAll,
  update,
  remove,
} = require("../controllers/task.controller");

const router = express.Router();

// All task routes are protected
router.use(protect);

router.post("/", create);
router.get("/", getAll);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;
