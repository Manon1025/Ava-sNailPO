// TODO: Module
const Joi = require('joi')
    // ! Joi.objectId permet de valider les identifiants MongoDB
Joi.objectId = require('joi-objectid')(Joi);

// TODO: Schéma de validation pour les employés
const employeeValidationSchema = Joi.object({
    fname: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Le prénom est requis.',
            'string.min': 'Le prénom doit contenir au moins 2 caractères.',
            'string.max': 'Le prénom ne peut pas dépasser 50 caractères.'
        }),
    lname: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Le nom est requis.',
            'string.min': 'Le nom doit contenir au moins 2 caractères.',
            'string.max': 'Le nom ne peut pas dépasser 50 caractères.'
        }),
    avatar: Joi.string()
        .min(7)
        .max(255)
        .required()
        .messages({
            'string.empty': 'L\'avatar est requis.',
            'string.min': 'L\'avatar doit contenir au moins 7 caractères.',
            'string.max': 'L\'avatar ne peut pas dépasser 255 caractères.'
        }),
    adresse : Joi.array().items(
        Joi.object({
            adress: Joi.string()
                .min(5)
                .max(255)
                .required()
                .messages({
                    'string.empty': 'L\'adresse est requise.',
                    'string.min': 'L\'adresse doit contenir au moins 5 caractères.',
                    'string.max': 'L\'adresse ne peut pas dépasser 255 caractères.'
                }),
            cp: Joi.number()
                .min(10000)
                .max(99999)
                .required()
                .messages({
                    'number.base': 'Le code postal doit être un nombre.',
                    'number.min': 'Le code postal doit contenir au moins 5 chiffres.',
                    'number.max': 'Le code postal ne peut pas dépasser 5 chiffres.'
                }),
            city: Joi.string()
                .min(2)
                .max(100)
                .required()
                .messages({
                    'string.empty': 'La ville est requise.',
                    'string.min': 'La ville doit contenir au moins 2 caractères.',
                    'string.max': 'La ville ne peut pas dépasser 100 caractères.'
                })
        })
    ),
    birth_date: Joi.date()
        // ! greater permet de définir une date minimale
        .greater('1900-01-01')
        // ! less permet de définir une date maximale
        .less('now')
        .required()
        .messages({
            'date.base': 'La date de naissance doit être une date valide.',
            'date.less': 'La date de naissance doit être antérieure à aujourd\'hui.',
            'any.required': 'La date de naissance est requise.'
        }),
    email: Joi.string()
        .email({ tlds: { allow: ['com', 'fr', 'org', 'net'] } })
        .required()
        .messages({
            'string.empty': 'L\'email est requis.',
            'string.email': 'L\'email doit être une adresse email valide.',
            'any.required': 'L\'email est requis.'
        }),
    phone: Joi.string()
        // ! pattern(/^[0-9]{10}$/) permet de valider un numéro de téléphone français à 10 chiffres
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
            'string.empty': 'Le numéro de téléphone est requis.',
            'string.pattern.base': 'Le numéro de téléphone doit contenir 10 chiffres.',
            'any.required': 'Le numéro de téléphone est requis.'
        }),
    password: Joi.string()
        .min(8)
        // ! pattern(new RegExp(...)) permet de valider un mot de passe complexe
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
        .required()
        .messages({
            'string.empty': 'Le mot de passe est requis.',
            'string.min': 'Le mot de passe doit contenir au moins 8 caractères.',
            'string.pattern.base': 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.',
            'any.required': 'Le mot de passe est requis.'
        }),
    postes: Joi.objectId()
        .required()
        .messages({
            'any.required': 'Le poste est requis.',
        }),
    observations: Joi.string()
        .max(500)
        .optional()
        .messages({
            'string.max': 'Les observations ne peuvent pas dépasser 500 caractères.'
        }),
    documents: Joi.string()
        .max(255)
        .optional()
        .allow('')
        .messages({
            'string.max': 'Le lien des documents ne peut pas dépasser 255 caractères.'
        }),
})

// TODO: Exporter le schéma de validation
module.exports = employeeValidationSchema
