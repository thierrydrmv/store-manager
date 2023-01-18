const validateEditProduct = (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;

  if (!name) return res.status(400).json({ message: '"name" is required' });
  
  if (!id) return res.status(400).json({ message: '"id" is required' });

  return next();
};

module.exports = validateEditProduct;