require('dotenv').config({ path: '../config/config.env' });
const jwt = require('jsonwebtoken');

exports.createAccess = async function checkAccess(req, res, next) {
    let token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    const verified = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!verified) {
        return res.staus(401).send({ status: "fail", message: "Token is not verified yet!" });
    }

    if (verified.role == 'Franchisor Admin' || verified.role === "Franchisee Admin") {
        next();
    } else {
        return res.status(403).send({ status: "fail", message: "you don't have permission to perform the operations!" });
    }
};
exports.readAccess = async (req, res, next) => {
    let token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    const verified = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!verified) {
        return res.status(401).send({ status: "fail", message: "Token is not verified yet!" });
    }
    if (verified.role == 'Franchisor Admin' || verified.role == "Franchisee Admin" || verified.role == 'Coordinator') {
        next();
    }
    else {
        return res.status(403).send({ status: "fail", message: "you don't have permission to perform the operations!" });
    }
};
exports.updateAccess = async (req, res, next) => {
    let token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    const verified = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!verified) {
        return res.status(401).send({ status: "fail", message: "Token is not verified yet!" });
    }
    if (verified.role == 'franchisor_admin' || verified.role == "franchisee_admin" || verified.role == 'Coordinator') {
        next();
    }
    else {
        return res.status(403).send({ status: "fail", message: "you don't have permission to perform the operations!" });
    }
};
exports.deleteAccess = async (req, res, next) => {
    let token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    const verified = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!verified) {
        return res.status(401).send({ status: "fail", message: "Token is not verified yet!" });
    } if (verified.role == 'Franchisor Admin' || verified.role == "Franchisee Admin" || verified.role == 'Coordinator') {
        next();
    }
    else {
        return res.status(403).send({ status: "fail", message: "you don't have permission to perform the delete operations!" });
    }
}