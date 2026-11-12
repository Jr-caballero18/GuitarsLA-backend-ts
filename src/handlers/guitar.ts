import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import Guitar from "../models/Guitar.model";

export const createGuitarValidation = [

  body("brand")
    .isString().withMessage("La marca debe ser texto")
    .trim()
    .notEmpty().withMessage("La marca no puede ir vacía")
    .isLength({ max: 100 }).withMessage("La marca no puede pasar de 100 caracteres"),

  body("name")
    .isString().withMessage("El nombre debe ser texto")
    .trim()
    .notEmpty().withMessage("El nombre no puede ir vacío")
    .isLength({ max: 100 }).withMessage("El nombre no puede pasar de 100 caracteres"),
 
    body("image")
    .isString().withMessage("La imagen debe ser texto")
    .trim()
    .notEmpty().withMessage("La imagen no puede ir vacía")
    .matches(/^[\w-]+$/).withMessage("La imagen solo puede contener letras, números, - y _"),
  
    body("description")
    .isString().withMessage("La descripción debe ser texto")
    .trim()
    .notEmpty().withMessage("La descripción no puede ir vacía")
    .isLength({ max: 500 }).withMessage("La descripción no puede pasar de 500 caracteres"),
  
    body("price")
    .notEmpty().withMessage("El precio no puede ir vacío")
    .isFloat({ gt: 0, max: 999999.99 }).withMessage("El precio debe ser un número mayor a 0")
    .toFloat(),
];

export const createGuitar = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {brand, name, image, description, price } = req.body;
    const guitar = await Guitar.create({brand, name, image, description, price });
    return res.status(201).json({ data: guitar });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Hubo un error en el servidor al crear la guitarra" });
  }
};

export const getGuitars = async (_req: Request, res: Response) => {
  try {
    const guitars = await Guitar.findAll({ order: [["id", "ASC"]] });
    return res.json({ data: guitars });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Hubo un error en el servidor al consultar las guitarras" });
  }
};
