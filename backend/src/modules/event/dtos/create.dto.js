import Joi from "joi";

const createEventDto = Joi.object({
    title: Joi.string()
        .trim()
        .min(3)
        .max(200)
        .required(),

    description: Joi.string()
        .trim()
        .allow("", null),

    location: Joi.string()
        .trim()
        .required(),

    startDate: Joi.date()
        .iso()
        .required(),

    endDate: Joi.date()
        .iso()
        .min(Joi.ref("startDate"))
        .required(),

    time: Joi.string()
        .trim()
        .required(),

    price: Joi.number()
        .min(0)
        .default(0)
});
export default createEventDto;