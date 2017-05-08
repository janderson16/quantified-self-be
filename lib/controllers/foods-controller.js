var Foods = require('../models/food')

function show(request, response) {
  Foods.find(request.params.id)
  .then(function(data) {
    let food = data.rows[0]
    if(!food){
      response.sendStatus(404)
    }else{
      response.json(food)
    };
  });
}

module.exports = {
  show: show
}
