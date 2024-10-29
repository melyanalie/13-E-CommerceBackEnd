const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [{ model: Product }], // Include associated Products
  })
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((err) => {
      console.error('Error fetching categories:', err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: [{ model: Product }], // Include associated Products
  })
    .then((category) => {
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(category);
    })
    .catch((err) => {
      console.error('Error fetching category:', err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((newCategory) => {
    res.status(201).json(newCategory);
  })
  .catch((err) => {
    console.error('Error creating category:', err);
    res.status(400).json(err); // 400 Bad Request
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: { id: req.params.id },
  })
    .then((updated) => {
      if (!updated[0]) {
        return res.status(404).json({ message: 'Category not found' });
      }
      return Category.findByPk(req.params.id); // Get the updated category
    })
    .then((updatedCategory) => {
      res.status(200).json(updatedCategory);
    })
    .catch((err) => {
      console.error('Error updating category:', err);
      res.status(400).json(err); // 400 Bad Request
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: { id: req.params.id },
  })
    .then((deleted) => {
      if (!deleted) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(204).send(); // 204 No Content
    })
    .catch((err) => {
      console.error('Error deleting category:', err);
      res.status(500).json(err);
    });

});

module.exports = router;
