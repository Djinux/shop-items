const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    ime_prezime: {
      type: String,
      required: true,
    },
    broj_artikala: {
      type: Number,
      required: true,
    },
    datum_nar: {
      type: Date,
      required: true,
    },
    datum_isp: {
      type: Date,
      required: true,
    },
    id_artikla: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true,
    },
  },
  { collection: 'orders' }
)

const orderModel = mongoose.model('Order', orderSchema)

module.exports.orderModel = orderModel

module.exports.createOrder = async function (
  item_id,
  first_last_name,
  number_of_items,
  shipping_date,
  order_date
) {
  const year = Number.parseInt(shipping_date.substr(0, 4))
  const month = Number.parseInt(shipping_date.substr(5, 2))
  const day = Number.parseInt(shipping_date.substr(8, 2))

  const newOrder = new orderModel({
    _id: new mongoose.Types.ObjectId(),
    id_artikla: item_id,
    ime_prezime: first_last_name,
    broj_artikala: number_of_items,
    datum_isp: new Date(year, month - 1, day),
    datum_nar: order_date,
  })

  await newOrder.save()
}
