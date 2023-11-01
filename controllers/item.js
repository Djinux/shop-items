const model = require('../models/item')

module.exports.showAllItems = async function (req, res, next) {
  try {
    const allItems = await model.fetchAllItems()

    return res.render('showStore.ejs', {
      items: allItems,
    })
  } catch (error) {
    next(error)
  }
}
