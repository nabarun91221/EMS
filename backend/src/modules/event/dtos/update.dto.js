import Joi from "joi";

const updateEventDto = Joi.object({
    title: Joi.string()
        .trim()
        .min(3)
        .max(200),

    description: Joi.string()
        .trim()
        .allow("", null),

    location: Joi.string()
        .trim(),

    startDate: Joi.date()
        .iso(),

    endDate: Joi.date()
        .iso(),

    time: Joi.string()
        .trim(),

    price: Joi.number()
        .min(0)
});
export default updateEventDto;