const { isLoggedIn } = require("./isLoggedIn");

module.exports = function(app, passport) {
    app.get('/auth', isLoggedIn, async function(req, res, next) {
            res.json({success:true});
    })
   
    // 로그인하기
    app.post('/login', passport.authenticate('local-login', {failWithError: true}),
        (req, res) => {
            res.json({message:"Success", token:req.user.token});
        },
        function (err, req, res, next) {
            res.json({message:"Fail"});
        }
    );

    // 회원가입하기
    app.post('/register', passport.authenticate('local-signup', {failWithError: true}), 
        (req, res) => {
            res.json({ message:"Success" , username: req.user.username });
        },
        function (err, req, res, next) {
            res.json({message:"Fail"});
        }
    );

    // 로그아웃하기
    app.get('/logout', function(req,res) {
        req.logout();
        res.redirect('/');
    });
};


