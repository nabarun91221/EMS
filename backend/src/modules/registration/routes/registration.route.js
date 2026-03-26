import express from "express";
import registrationController from "../controllers/registration.controller.js";
import verifyRequestJwt from "../../../shared/middlewares/auth.middleware.js";
import scopeValidation from "../../../shared/middlewares/scope.validation.middleware.js";
import validateDto from "../../../shared/middlewares/dto.validation.middleware.js";
import createRegistrationDto from "../dtos/create.dto.js";
const router = express.Router();

router.post("/registrations", verifyRequestJwt, scopeValidation("registration:create:me"), validateDto(createRegistrationDto), registrationController.registerForEvent);
router.get("/registrations", verifyRequestJwt, scopeValidation("registration:read:me"), registrationController.getAllRegistrations);
router.get("/registrations/event/:id", verifyRequestJwt, scopeValidation("registration:read"), registrationController.getEventRegistrations);
router.patch("/registrations/:id/cancel", verifyRequestJwt, scopeValidation("registration:update:me"), registrationController.cancelRegistration);

export default router;