const Router = require('express');
const router = Router();
const verifyUser = require('../controller/verifyUser');
const { register,
        login,
        getUser,
        updateUser,
        verifyOTP,
        createResetSession,
        resetPassword } = require('../controller/appController');


/**Post methods */
router.route('/register').post(register);
// router.route('/registermail').post()
// router.route('/authenticate').post(req, res)
router.route('/login').post(verifyUser,login);


/**Get methods */
router.route('/user/:username').get(getUser);
// router.route('/generateOTP').get(genOTP);
router.route('/verifyOTP').get(verifyOTP);
router.route('/createresetsession').get(createResetSession);


/**Put methods */
router.route('/updateuser/:_id').put(updateUser);
router.route('/resetpasword').put(resetPassword);


module.exports = router; 