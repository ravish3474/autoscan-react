const jwt = require("jsonwebtoken");

const AuthMiddleware = (req, res, next) => {
    if (process.env.ENVIRONMENT === "production") {
        if (req.method === "OPTIONS") {
            return next();
        }
        try {
            const authHeader = req.headers["authorization"];
            let token = authHeader;

            if (token?.toLowerCase()?.startsWith("bearer ")) {
                token = token && token.split(" ")[1];
            }

            if (token === null)
                return res.status(403).json({
                    status: false,
                    message: "Access denied",
                    error: "Null Token",
                });

            jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
                if (err) {

                    return jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user1) => {
                        if (err) {
                            return res.status(403).json({
                                status: false,
                                message: "Access denied",
                                error: err?.message,
                            });
                        }

                        if (
                            !(
                                user1?.tokenGeneratedFrom ||
                                user1?.tokenGeneratedAt ||
                                user1?.expiresIn
                            )
                        ) {
                            return res.status(403).json({
                                status: false,
                                message: "Access denied",
                                error: "No Access",
                            });
                        }

                        if (user1?.expiresIn < Date.now()) {
                            return res.status(403).json({
                                status: false,
                                message: "Access denied",
                                error: "NULL TOKEN",
                            });
                        }

                        req.user = user1;
                        return next();
                    });
                }

                if (
                    !(
                        user?.tokenGeneratedFrom ||
                        user?.tokenGeneratedAt ||
                        user?.expiresIn
                    )
                ) {
                    return res.status(403).json({
                        status: false,
                        message: "Access denied",
                        error: "No Access",
                    });
                }

                let expireDate = new Date(user?.exp)
                let currentDate = new Date()

                if (expireDate < currentDate) {
                    return res.status(403).json({
                        status: false,
                        message: "Access denied",
                        error: "TOKEN Expired",
                    });
                }

                req.user = user;
                return next();
            });
        } catch (error) {
            res.status(400).json({
                status: false,
                message: "Invalid token",
                error: error?.message,
            });
        }
    } else {
        next();
    }
};

module.exports = AuthMiddleware;
