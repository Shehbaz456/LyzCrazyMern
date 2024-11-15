const validator = (schema) => async(req,res,next) =>{
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        const status = 422 
        const message = "Fill the input properly"
        const extraDetails = err.errors[0].message
        const error = {
            status,extraDetails,message
        }
        next(error)
        // res.status(400).json(message)
    }
}

module.exports = validator;