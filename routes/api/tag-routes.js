const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
    // be sure to include its associated Product data
       include: [{ model: Product}],
    });
    res.status(200).json(tagData);
    console.log('Find All SUCCESS');
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id,{
    // be sure to include its associated Product data
       include: [{ model: Product}],
    });
    res.status(200).json(tagData);
    console.log('Find All SUCCESS');
    } catch (err) {
      res.status(500).json(err);
    }
});

// create a new tag
router.post('/', async (req, res) => {
  /* req.body for add (the id will be assigned)
    {
      "tag_name": "Marvel"
    }
  */
    try {
      const newTagName = await Tag.create(req.body);
      res.status(200).json(newTagName);
    } catch (err) {
      res.status(400).json(`Failed to creat New Tag`);
    };
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
    /* 
    {
      "tag_name": "Anime"
    }
  */
    try {
      const updatedTagData = await Tag.update(req.body, {
        where: {
          id: req.params.id,
        }
      });
      if (!updatedTagData[0]) {
        res.status(404).json({ message: `Tag ID ${req.params.id} not found.` });
        return;
      }
      res.status(200).json({ message: `Successfully updated Tag ID ${req.params.id}` });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagToDelete = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if(!tagToDelete) {
      res.status(404).json({ message: `Tag with ID ${req.params.id} not found` });
      return;
    };

    res.status(200).json(`Successfully deleted Tag ID ${req.params.id}`);
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;
