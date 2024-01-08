const Router = require('express');
const router = Router();
const { register,
        login,
        getUser,
        updateUser,
        genOTP,
        verifyOTP,
        createResetSession,
        resetPassword } = require('../controller/appController');


/**Post methods */
router.route('/register').post(register);
// router.route('/registermail').post()
// router.route('/authenticate').post(req, res)
router.route('/login').post(login);


/**Get methods */
router.route('/user/:username').get(getUser);
// router.route('/generateOTP').get(genOTP);
router.route('/verifyOTP').get(verifyOTP);
router.route('/createresetsession').get(createResetSession);


/**Put methods */
router.route('/updateuser').get(updateUser);
router.route('/resetpasword').get(resetPassword);


module.exports = router; 