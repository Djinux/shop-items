const modelOrder = require('../models/order')
const modelItem = require('../models/item')
const mongoose = require('mongoose')

module.exports.showOrder = async function (req, res, next) {
  try {
    return res.render('orderItem.ejs', {
      item_id: req.query.item_id,
    })
  } catch (error) {
    next(error)
  }
}

module.exports.createOrder = async function (req, res, next) {
  try {
    const item_id = req.body.item_id
    const first_last_name = req.body.first_last_name
    const number_of_items = req.body.number_of_items
    const shipping_date = req.body.shipping_date

    const isThereEnoughItems = await modelItem.isThereEnoughItems(
      item_id,
      number_of_items
    )
    if (!isThereEnoughItems) {
      return res.render('showOrderStatus.ejs', {
        item_id: item_id,
        success: false,
        reason: 'nema dovoljno artikala',
      })
    } else {
      // decrement number of items in db 'Store' with item_id
      await modelItem.decrementItemsInStock(item_id, number_of_items)
      // create order in collection orders in db 'Store'
      await modelOrder.createOrder(
        item_id,
        first_last_name,
        number_of_items,
        shipping_date,
        new Date()
      )
      return res.render('showOrderStatus.ejs', {
        item_id: item_id,
        success: true,
      })
    }
  } catch (error) {
    next(error)
  }
}
