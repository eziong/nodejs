var userInfo = async function (req, res, email, callback) {
    var database = req.app.get("database");
    database.UserModel.findOne({ u_email: email }, function (err, results) {
        callback(results);
    });
};

var authUser = function (req, res, email, pw, callback) {
    userInfo(req, res, email, function (user) {
        console.log(user.u_email);
        if (user.u_email === email && user.u_password === pw) {
            console.log("authenticated successfully");
            res.cookie("userInfo", {
                email: user.u_email,
                nickname: user.u_nickname,
            });
            console.log("cookie is baked");
            callback(null, true);
        } else {
            console.log("authentication is failed");
            callback(null, false);
        }
    });
};

module.exports.userInfo = userInfo;
module.exports.authUser = authUser;

// var authUser = function(database, id, password, callback) {
// 	console.log('authUser 호출됨.');

// 	// 1. 아이디를 이용해 검색
// 	database.UserModel.findById(id, function(err, results) {
// 		if (err) {
// 			callback(err, null);
// 			return;
// 		}

// 		console.log('아이디 [%s]로 사용자 검색결과', id);
// 		console.dir(results);

// 		if (results.length > 0) {
// 			console.log('아이디와 일치하는 사용자 찾음.');

// 			// 2. 패스워드 확인 : 모델 인스턴스를 객체를 만들고 authenticate() 메소드 호출
// 			var user = new database.UserModel({id:id});
// 			var authenticated = user.authenticate(password, results[0]._doc.salt, results[0]._doc.hashed_password);
// 			if (authenticated) {
// 				console.log('비밀번호 일치함');
// 				callback(null, results);
// 			} else {
// 				console.log('비밀번호 일치하지 않음');
// 				callback(null, null);
// 			}

// 		} else {
// 	    	console.log("아이디와 일치하는 사용자를 찾지 못함.");
// 	    	callback(null, null);
// 	    }

// 	});

// }
