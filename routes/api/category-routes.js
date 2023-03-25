const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    // be sure to include its associated Products
    include: 
    [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(getAllCategories => {
    res.json(getAllCategories)
    .status(200);
  })
  .catch(err => {
    console.error(`Unexpected error encountered in get all categories route ${err}`)
    res.status(500);
  });
  

  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
     // be sure to include its associated Products
      include: 
      [
        {
          model:  Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        }
      ]
  })
    .then(getCategoryById => {
      res.json(getCategoryById)
      .status(200);
    })
    .catch(err => {
      console.error(`Unexpected error encountered in get category by id route ${err}`);
      res.status(500)
    });
});
  // be sure to include its associated Products


router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
