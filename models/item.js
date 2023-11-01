const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  naziv: {
    type: String,
    required: true,
  },
  cena: {
    type: Number,
    required: true,
  },
  broj_artikala: {
    type: Number,
    default: 0,
  },
})

const itemModel = mongoose.model('Item', itemSchema)
module.exports.Item = itemModel

module.exports.fetchAllItems = async function () {
  const querry = { broj_artikala: { $gt: 0 } }

  const items = await itemModel.find(querry).exec()

  return items
}

// check if there is enough items in stock
module.exports.isThereEnoughItems = async function (itemId, wantedItems) {
  const findQuerry = { _id: itemId }
  const item = await itemModel.findOne(findQuerry).exec()
  if (item === null || item.broj_artikala < wantedItems) {
    return false
  }
  return true
}

module.exports.decrementItemsInStock = async function (itemId, wantedItems) {
  const findQuerry = { _id: itemId }
  const updateQuerry = { $inc: { broj_artikala: -wantedItems } }

  await itemModel.updateOne(findQuerry, updateQuerry)
}
