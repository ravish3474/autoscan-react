exports.checkAuth = function (username, password) {
	if (username=='user' && password=='password') {
       return true;
	}
    else {
       return false;
	}
};