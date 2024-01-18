const express = require('express')
const router = new express.Router()
const expressError = require('./expressError')
const items = require('./fakeDB')
const ExpressError = require('./expressError')

router.get('/', (req, res) => res.json(items))

router.post('/', (req, res, next) => {
    const newItem = {name: req.body.name,
                    price: req.body.price}
    items.push(newItem)
    return res.status(201).json({answer: newItem})
})

router.get('/:name', (req, res, next) => {
    try{
        const item = items.find(item => item.name === req.params.name)
        if (!item) {
            throw new ExpressError(`${req.params.name} not found`, 404)
        }
        return res.json(item)
    }
    catch(err){
        return next(err)
    }
})

router.patch('/:name', (req,res, next) =>{
    try{
        const item = items.find(item => item.name === req.params.name)
        if (!item) {
            throw new ExpressError(`${req.params.name} not found`, 404)
        }
        item.name = req.body.name ? req.body.name : item.name
        item.price = req.body.price ? req.body.price : item.price
        return res.json({updated: item})
    } catch(err){
        return next(err)
    }
})

router.delete('/:name', (req,res, next) => {
    try{
        const item = items.find(item => item.name === req.params.name)
        if (!item) {
            throw new ExpressError(`${req.params.name} not found`, 404)
        }
        items.splice(items.indexOf(item), 1)
        return res.json({message: 'Deleted'})
    } catch(err) {
        return next(err)
    }
})

module.exports = router