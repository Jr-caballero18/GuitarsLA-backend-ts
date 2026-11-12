import { Router } from "express";
import { createGuitar, createGuitarValidation, getGuitars } from "./handlers/guitar";

const router = Router();

router.get("/guitars", getGuitars);
router.post("/guitars", createGuitarValidation, createGuitar);

export default router;
