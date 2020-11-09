const DnaModel = require('../models/Dna');

/**
 *
 * @param {*} matrix
 * Obtengo los valores de ambos lados de la diagonal principal
 */
const getMainDiagonal = (matrix) => {
  let output = [];

  for (let i = 0; i < matrix.length; i++) {
    let diagonal = [];
    for (let y = i, x = 0; y >= 0; y--, x++) {
      diagonal.push(matrix[y][x]);
    }
    output.push(diagonal);
  }
  for (let i = 1; i < matrix[0].length; i++) {
    let d = [];
    for (y = matrix.length - 1, x = i; x < matrix[0].length; y--, x++)
      d.push(matrix[y][x]);
    output.push(d);
  }

  return output.map((array) => {
    return array.join('');
  });
};

/**
 *
 * @param {*} matrix
 * Metodo que retorna el string al reves
 */
const reverseString = (string) => {
  return string.split('').reverse().join('');
};

/**
 *
 * @param {*} matrix
 * Metodo que retorna la matriz reversa
 */
const inverseMatrix = (matrix) => {
  return matrix.map((string) => {
    return reverseString(string);
  });
};

/**
 *
 * @param {*} matrix
 * Doy vuelta la matriz y obtengo los valores de ambos lados de la diagonal secundaria
 */
const getSecondaryDiagonal = (matrix) => {
  let reverse = inverseMatrix(matrix);
  return getMainDiagonal(reverse);
};

const getDnaMutationBlocks = (matrix) => {
  let regex = /([ATCG])\1{3,4}/;

  let straight = matrix.filter((string) => {
    return regex.test(string);
  });

  let straightRev = inverseMatrix(matrix).filter((string) => {
    return regex.test(string);
  });

  let right = getMainDiagonal(matrix).filter((string) => {
    return regex.test(string);
  });

  let left = getSecondaryDiagonal(matrix).filter((string) => {
    return regex.test(string);
  });

  return straight.concat(right).concat(left).concat(straightRev);
};

const hasMutation = async (req, res) => {
  const { dna } = req.body;
  let blocks = getDnaMutationBlocks(dna);

  if (!(await DnaModel.findOne({ dna }))) {
    const dnaModelToSave = new DnaModel();
    dnaModelToSave.dna = dna;
    dnaModelToSave.mutations = blocks;
    await dnaModelToSave.save();
  }

  if (blocks.length > 1) {
    return res.status(200).json({});
  }
  return res.status(403).json({});
};

module.exports = {
  hasMutation,
};
