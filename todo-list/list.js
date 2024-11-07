const mongoose = require('mongoose');
const Joi = require('@hapi/joi'); // Ensure you have this dependency installed

// Define the list schema
const listSchema = new mongoose.Schema({
    taskName: { type: String, required: true }, // Use camelCase instead of hyphens
    taskDescription: { type: String, required: true },
    taskStatus: { type: String, required: true },
    taskPriority: { type: String, required: true }
});

// Create the Mongoose model
const TaskList = mongoose.model('TaskList', listSchema);

// Validation function using Joi
const validateList = (list) => {
    const schema = Joi.object({
        taskName: Joi.string().required(),
        taskDescription: Joi.string().required(),
        taskStatus: Joi.string().required(),
        taskPriority: Joi.string().required()
    });
    
    return schema.validate(list);
};

module.exports = { TaskList, validateList };
