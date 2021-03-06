const express = require('express')
const router = express.Router()

// item model
const Item = require('../../models/Item')

// @route   GET api/item
// @desc    GET All items
// @access  Public

router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
})

// @route   post api/item
// @desc    create a item
// @access  Public

router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item))

})
// @route   post api/item/:id
// @desc    delete item
// @access  Public

router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => { res.json({ success: true }) }))
        .catch(err => { res.status(400).json({ success: false }) })
})

module.exports = router;