const Joi = require("joi");

const listingSchema = Joi.object({
    
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().min(0).required(),
        // image: Joi.string().allow("", null)
        image: Joi.string().uri().required()

   
}).required();

const reviewSchema = Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        comment: Joi.string().required()

}).required();





module.exports = { listingSchema , reviewSchema };
