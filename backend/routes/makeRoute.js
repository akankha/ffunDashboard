import express from "express";
import * as makeController from "../controllers/makeController.js";

const router = express.Router();

router.get("/", makeController.getmakers);

export default router;
