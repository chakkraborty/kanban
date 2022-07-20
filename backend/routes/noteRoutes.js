const express = require("express");
const { getNotes } = require("../controllers/noteController");
const { createNote } = require("../controllers/noteController");
const { DeleteNote } = require("../controllers/noteController");

const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();
router.route("/").get(protect, getNotes);
router.route("/create").post(protect, createNote);
router.route("/:id").delete(protect, DeleteNote);
module.exports = router;
