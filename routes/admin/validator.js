const {check}=require('express-validator');
const usersRepo=require('../../repositories/users.js');

module.exports={
	requireEmail:check('email')
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage('Must be a valid e-mail'),
      .custom(async(email)=>{
          const existingUser = await usersRepo.getOneBy({ email });
            if (existingUser) {
              throw new Error('Email in use');
          }
      }),
    requirepassword: check('password')
      .trim()
      .isLength({min:4,max:20}),
      .withMessage('Length must be between 4 and 20 characters')
    requirepasswordConfirmation:check('passwordConfirmation')
      .trim()
      .isLength({min:4,max:20})
      .custom((passwordConfirmation,{req})=>{
        if(passwordConfirmation!=req.body.password){
          throw new Error('passwords must match');
        }
      })
};