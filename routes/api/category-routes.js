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

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
    /* 
    {
      "category_name": "Jeans"
    }
  */
  try {
    const updatedCategoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!updatedCategoryData[0]) {
      res.status(404).json({ message: `Categgory ID ${req.params.id} not found.` });
      return;
    }
    res.status(200).json({ message: `Successfully updated Category ID ${req.params.id}` });
  } catch (err) {
    res.status(500).json(err);
  }

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryToDelete = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if(!categoryToDelete) {
      res.status(404).json({ message: `Category with ID ${req.params.id} not found` });
      return;
    };

    res.status(200).json(`Successfully deleted Category ID ${req.params.id}`);
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;
