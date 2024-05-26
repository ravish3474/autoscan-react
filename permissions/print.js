exports.print = (req, res, next) => {
    console.log('Auth successful!');
    next();
}