// TODO: Module
const Joi = require('joi');

    // ! Joi.objectId permet de valider les identifiants MongoDB
Joi.objectId = require('joi-objectid')(Joi);

// TODO: Schéma de validation pour les documents
const documentValidationSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Le nom est requis.',
            'string.min': 'Le nom doit contenir au moins 2 caractères.',
            'string.max': 'Le nom ne peut pas dépasser 100 caractères.'
        }),
    description: Joi.string()
        .min(5)
        .max(500)
        .required()
        .messages({
            'string.empty': 'La description est requise.',
            'string.min': 'La description doit contenir au moins 5 caractères.',
            'string.max': 'La description ne peut pas dépasser 500 caractères.'
        }),
    category: Joi.objectId()
        .required()
        .messages({
            'any.required': 'La catégorie est requise.',
        }),
    fileName: Joi.string()
        .required()
        .messages({
            'string.empty': 'Le nom du fichier est requis.',
        })
})

// TODO: Exporter le schéma de validation
module.exports = documentValidationSchema;