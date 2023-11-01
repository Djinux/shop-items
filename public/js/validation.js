document.addEventListener('DOMContentLoaded', function () {
  // validate form input
  const form = document.getElementById('order_item')
  form.addEventListener('submit', function (ev) {
    let validation = true
    let field = null

    // validate item_id
    field = document.getElementById('item_id')
    const item_id = field.value.trim()
    if (item_id === '') {
      validation = false
    }
    if (!validation) {
      ev.preventDefault()
      window.alert('Identifikator artikla nije ispravan!')
      field.focus()
      return false
    }

    // validate first and last name : 1. field must have value 2. only one space 3. if multiple names then - between names(Ana-Milic-Dragic)
    field = document.getElementById('first_last_name')
    const first_last_name = field.value.trim()
    if (first_last_name === '') {
      validation = false
    } else {
      let space_counter = 0
      for (let i = 0; i < first_last_name.length; i++) {
        let character = first_last_name.charAt(i)
        if (character == ' ') {
          space_counter++
        } else if (
          character != '-' &&
          character < 'a' &&
          character > 'z' &&
          character < 'A' &&
          character > 'Z'
        ) {
          validation = false
          break
        }
      }
      if (space_counter != 1) {
        validation = false
      }
    }
    if (!validation) {
      ev.preventDefault()
      window.alert('Ime i prezime nisu u ispravnom formatu!')
      field.focus()
      return false
    }

    // validate number of items customer wants to order : 1. field must have value 2. must be a positive integer
    field = document.getElementById('number_of_items')
    const number_of_items = field.value.trim()
    if (
      number_of_items === '' ||
      NaN(number_of_items) ||
      number_of_items <= 0
    ) {
      validation = false
    }
    if (!validation) {
      ev.preventDefault()
      window.alert('Broj artikala nije ispravan!')
      field.focus()
      return false
    }

    // validate shipping date : 1. field must have value 2. date must be at least two days after the date customer ordered item
    // in an ideal scenario, shipping date is set by a customer
    field = document.getElementById('shipping_date')
    const shipping_date = field.value.trim()
    if (shipping_date === '') {
      validation = false
    } else {
      shipping_date = new Date(shipping_date)
      const current_date = new Date()

      // difference between dates in miliseconds
      const date_difference = shipping_date.getTime() - current_date.getTime()
      if (date_difference < 0 || date_difference / (60 * 60 * 24 * 1000) < 2) {
        validation = false
      }
    }
    if (!validation) {
      ev.preventDefault()
      window.alert(
        'Datum isporuke mora biti najmanje 2 dana od trenutnog datuma!'
      )
      field.focus()
      return false
    }
  })
})
