var Meal = require('../models/meal')

function indexCRUD(request, response) {
  Meal.all(request.query)
  .then(function(data) {
    if(data.length == 0) {
      response.sendStatus(404)
    }else{
      var sorted = group(data)
      response.json(sorted)
    }
  })
}

function showCRUD(request, response) {
  Meal.find_by(request.params.name, request.query)
  .then(function(data) {
    if(data.length == 0) {
      response.sendStatus(404)
    }else{
      response.json(data)
    }
  })
}

function group(data){
 return data.reduce(function(sorted, food) {
    var key = food.meal_name
    sorted[key] = sorted[key] || []
    sorted[key].push(food)
    return sorted
  },{})
}

module.exports = {
  index: indexCRUD,
  show: showCRUD
}