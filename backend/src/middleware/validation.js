import AppError from '../utils/AppError.js';

const validation = (schema) => {
const validation = (schema) => {
    return (req, res, next) => {
        try {
            let methods = { ...req.body, ...req.params, ...req.query };
            
            if (req.file) {
                methods.file = req.file;
            }
            if (req.files) {
                methods.files = req.files;
            }
            if (req.headers.auth && containHeaders) {
                methods = { auth: req.headers.auth };
            }
            
            const validationresult = schema.validate(methods, { abortEarly: false });
            
            if (validationresult.error) {
                req.validationresult = validationresult.error;
                return next(new Error('validation error', { cause: 400 }));
            }

            if (schema.files && req.files) {
                const filesValidation = schema.files.validate(req.files, { abortEarly: false });
                if (filesValidation.error) {
                    validationErrors.push(...filesValidation.error.details);
                }
            }

            // If any validation errors occurred
            if (validationErrors.length > 0) {
                const errorMessages = validationErrors.map(error => error.message).join(', ');
                return next(new AppError(errorMessages, 400));
            let validationErrors = [];

            // Validate request body if schema has body validation
            if (schema.body) {
                const bodyValidation = schema.body.validate(req.body, { abortEarly: false });
                if (bodyValidation.error) {
                    validationErrors.push(...bodyValidation.error.details);
                }
            }

            // Validate URL parameters if schema has params validation
            if (schema.params) {
                const paramsValidation = schema.params.validate(req.params, { abortEarly: false });
                if (paramsValidation.error) {
                    validationErrors.push(...paramsValidation.error.details);
                }
            }

            // Validate query parameters if schema has query validation
            if (schema.query) {
                const queryValidation = schema.query.validate(req.query, { abortEarly: false });
                if (queryValidation.error) {
                    validationErrors.push(...queryValidation.error.details);
                }
            }

            // Handle file uploads if present
            if (schema.file && req.file) {
                const fileValidation = schema.file.validate(req.file, { abortEarly: false });
                if (fileValidation.error) {
                    validationErrors.push(...fileValidation.error.details);
                }
            }

            if (schema.files && req.files) {
                const filesValidation = schema.files.validate(req.files, { abortEarly: false });
                if (filesValidation.error) {
                    validationErrors.push(...filesValidation.error.details);
                }
            }

            // If any validation errors occurred
            if (validationErrors.length > 0) {
                req.validationErrors = validationErrors;
                return next(new Error('Validation error', { cause: 400 }));
            }

            return next();

            return next();
        } catch (error) {
            return next(new AppError(`Validation middleware error: ${error.message}`, 500));
            return next(new Error(`Validation middleware error: ${error.message}`, { cause: 500 }));
        }
    };
};

export default validation;
