import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const userValidationRules = () => {
  return [
    // El nombre no debe estar vacío y debe cumplir con el formato regex
    body("nombre")
      .trim()
      .notEmpty()
      .withMessage("El nombre es requerido.")
      .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)?$/)
      .withMessage("Error en el nombre: formato inválido."),

    // El correo debe ser un email válido
    body("correo")
      .isEmail()
      .withMessage("Debe ser un correo electrónico válido."),

    // La contraseña debe cumplir con los requisitos de seguridad
    body("contraseña")
      .isLength({ min: 6, max: 25 })
      .withMessage("La contraseña debe tener entre 6 y 25 caracteres.")
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,25}$/)
      .withMessage("La contraseña debe incluir al menos una letra y un número."),

    // El rol_id debe ser uno de los valores permitidos
    body("rol_id")
      .isIn([1, 2])
      .withMessage("Rol no válido. Solo se permiten: 1 (Administrador) o 2 (Usuario Común)."),
  ];
};

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: { [key: string]: string }[] = [];
  errors.array().map(err => {
      if (err.type === 'field') {
          extractedErrors.push({ [err.path]: err.msg })
      }
  });

  return res.status(422).json({
    errors: extractedErrors,
  });
};
