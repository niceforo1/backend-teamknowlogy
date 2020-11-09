const DnaModel = require('../models/Dna');
const getStats = async (req, res) => {
  const dnaList = await DnaModel.find();
  let count_mutations = 0;
  let count_no_mutation = 0;
  dnaList.map((dna) => {
    dna.mutations.length > 0 ? count_no_mutation++ : count_mutations++;
  });

  res.status(200).json({
    count_mutations,
    count_no_mutation,
    ratio: count_mutations / count_no_mutation,
  });
};

module.exports = { getStats };
