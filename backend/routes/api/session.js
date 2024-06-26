const express = require('express')
const { Op, where } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Like } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
  ];

router.get(
    '/',
    async (req, res) => {
      const { user } = req;
      console.log(user)
      if (!user) {
        return res.json({ user: null })
      }
      findUserLikes = await User.findOne(
        {
          where: {
            id: user.id
          },
          include: [
            {
              model: Like,
            }
          ]
        }
      )
      const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
        likes: findUserLikes.Likes
      }
      return res.json({
        user: safeUser
      });
    }
  );


router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
      const { credential, password } = req.body;
      query = {

      }

      const user = await User.unscoped().findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });

      if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = { credential: 'The provided credentials were invalid.' };
        return next(err);
      }

      const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
      };

      await setTokenCookie(res, safeUser);

      return res.json({
        user: safeUser
      });
    }
);

router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

module.exports = router;
