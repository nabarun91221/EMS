import Joi from "joi";

const createRegistrationDto = Joi.object({
    eventId: Joi.string()
        .hex()
        .length(24)
        .required()
});

export default createRegistrationDto;