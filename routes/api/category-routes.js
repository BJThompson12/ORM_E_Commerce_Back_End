const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
    // be sure to include its associated Products
       include: [{ model: Product}],
    });
    res.status(200).json(categoryData);
    console.log('Find All SUCCESS');
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id,{
    // be sure to include its associated Products
       include: [{ model: Product}],
    });
    res.status(200).json(categoryData);

    } catch (err) {
      res.status(500).json(err);
    }
  });

  // create a new category
router.post('/', async (req, res) => {
   /* req.body for add (the id will be assigned)
    {
      "category_name": "Pants"
    }
  */
    try {
      const newCategory = await Category.create(req.body);
      res.status(200).json(newCategory);
    } catch (err) {
      res.status(400).json(err);
    };
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
