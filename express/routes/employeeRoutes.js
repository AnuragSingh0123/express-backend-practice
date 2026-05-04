const router = require("express").Router();
const { getAllEmployee, getEmpByID, fullUpdate, partialUpdate } = require("../controllers/empController");

router.get("/", getAllEmployee)
router.get("/:id", getEmpByID)
router.put("/:id", fullUpdate)
router.patch("/:id", partialUpdate)

module.exports = router;