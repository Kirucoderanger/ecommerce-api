//Universal middlware for error handling
const errorMiddleware = (err, req, res, next)=>{
    res.status(500).json({ message: err.message });
}

module.exports = errorMiddleware;