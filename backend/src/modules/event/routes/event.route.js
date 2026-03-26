import express from "express";
import eventController from "../controllers/event.controller.js";
import verifyRequestJwt from "../../../shared/middlewares/auth.middleware.js";
import scopeValidation from "../../../shared/middlewares/scope.validation.middleware.js";
import validateDto from "../../../shared/middlewares/dto.validation.middleware.js";
import createEventDto from "../dtos/create.dto.js";
import updateEventDto from "../dtos/update.dto.js";
const router = express.Router();

router.post("/events", verifyRequestJwt, scopeValidation("event:create"), validateDto(createEventDto), eventController.createEvent);
router.get("/events", verifyRequestJwt, scopeValidation("event:read"), eventController.getAllEvents);
router.get("/events/organizer", verifyRequestJwt, scopeValidation("event:read"), eventController.getOrganizerEvents);
router.get("/events/:id", verifyRequestJwt, scopeValidation("event:read"), eventController.getEventById);
router.put("/events/:id", verifyRequestJwt, scopeValidation("event:update"), validateDto(updateEventDto), eventController.updateEvent);
router.delete("/events/:id", verifyRequestJwt, scopeValidation("event:delete"), eventController.deleteEvent);

export default router;