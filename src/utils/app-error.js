class AppError extends Error {
    constructor(code, description) {
        super(description);
        this.code = code;
    }
}

module.exports = AppError;