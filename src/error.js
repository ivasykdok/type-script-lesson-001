class AppError extends Error {
    statusCode;
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}
export default AppError;
//# sourceMappingURL=error.js.map