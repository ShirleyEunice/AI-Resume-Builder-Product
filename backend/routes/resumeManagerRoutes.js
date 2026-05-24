import express
from "express";

import {
  protect,
} from "../middlewares/authMiddleware.js";

import {

  getATSHistory,

  getATSById,

  deleteATSAnalysis,

} from "../controllers/resumeManagerController.js";

const router =
  express.Router();

router.get(
  "/history",

  protect,

  getATSHistory
);

router.get(
  "/:id",

  protect,

  getATSById
);

router.delete(
  "/:id",

  protect,

  deleteATSAnalysis
);

export default router;