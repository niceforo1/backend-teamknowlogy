const { Router } = require('express');
const { check } = require('express-validator');
const { hasMutation } = require('../controllers/dna');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post(
  '/',
  [
    check('dna', 'The Dna is mandatory').not().isEmpty().isLength({ min: 6 }),
    validarCampos,
  ],
  hasMutation
);

module.exports = router;
