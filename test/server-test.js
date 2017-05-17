// test/server-test.js

var assert = require('chai').assert
var app = require('../server')
var request = require('request')
var dateFormat = require('dateformat')

var environment   = process.env.NODE_ENV || 'test'
var configuration = require('../knexfile')[environment]
var database      = require('knex')(configuration)

var Food     = require('../lib/models/food')
var Meal     = require('../lib/models/meal')
var MealFood = require('../lib/models/meal-food')

describe('Server', function(){
  before(function(done){
    this.port = 9876
    this.server = app.listen(this.port, function(err){
      if (err) { return done(err) }
      done()
    })

    this.request = request.defaults({
      baseUrl: 'http://localhost:9876/'
    })
  })

  after(function(){
    this.server.close()
  })

  it('should exist', function(){
    assert(app)
  })

  describe('GET /api/v1/foods', function(){
    beforeEach(function(done){
      Promise.all([
        Food.create({name: 'banana', calories: 400, active: true, created_at: new Date, updated_at: new Date}),
        Food.create({name: 'chocolate', calories: 500, active: true, created_at: new Date, updated_at: new Date})
      ])
      .then(function(){
        done()
      })
    })

    afterEach(function(done){
      database.raw('TRUNCATE foods, meals RESTART IDENTITY CASCADE')
      .then(function(){
        done()
      })
    })

    it('should return a 200 if the response is found', function(done){
      this.request.get('/api/v1/foods', function(error, response){
        if(error){ done(error) }
        assert.equal(response.statusCode, 200)
        done()
      })
    })

    it('should return all parameters for all food items', function(done){
      this.request.get('/api/v1/foods', function(error, response){
        if(error){ done(error) }
        let parsedFoods = JSON.parse(response.body.toString())

        assert.include([1, 2], parsedFoods[0].id)
        assert.include([1, 2], parsedFoods[1].id)
        assert.notEqual(parsedFoods[0].id, parsedFoods[1].id)
        assert.include(['banana', 'chocolate'], parsedFoods[0].name)
        assert.include(['banana', 'chocolate'], parsedFoods[1].name)
        assert.notEqual(parsedFoods[0].name, parsedFoods[1].name)
        assert.include([400, 500], parsedFoods[0].calories)
        assert.include([400, 500], parsedFoods[1].calories)
        assert.notEqual(parsedFoods[0].calories, parsedFoods[1].calories)
        assert.equal(parsedFoods[0].active, true)
        assert.equal(parsedFoods[1].active, true)
        assert.ok(parsedFoods[0].created_at)
        assert.ok(parsedFoods[1].created_at)
        assert.ok(parsedFoods[0].updated_at)
        assert.ok(parsedFoods[1].updated_at)
        done()
      })
    })
  })

  describe('GET /api/v1/foods/:id', function(){
    beforeEach(function(done){
      Promise.all([
        Food.create({name: 'banana', calories: 400, active: true, created_at: new Date, updated_at: new Date})
      ])
      .then(function(){
        done()
      })
    })

    afterEach(function(done){
      database.raw('TRUNCATE foods, meals RESTART IDENTITY CASCADE')
      .then(function(){
        done()
      })
    })

    it('should return 404 if resource is not found', function(done) {
      this.request.get('/api/v1/foods/10000', function(error, response) {
        if (error) { done(error) }
        assert.equal(response.statusCode, 404)
        done()
      })
    })

    it('should return a 200 if the response is found', function(done){
      this.request.get('/api/v1/foods/1', function(error, response){
        if(error){ done(error) }
        assert.equal(response.statusCode, 200)
        done()
      })
    })

    it('should return the all the parameters for the food item', function(done){
      this.request.get('/api/v1/foods/1', function(error, response){
        if(error){ done(error) }
        let parsedFood = JSON.parse(response.body.toString())

        assert.equal(parsedFood.id, 1)
        assert.equal(parsedFood.name, 'banana')
        assert.equal(parsedFood.calories, 400)
        assert.equal(parsedFood.active, true)
        assert.ok(parsedFood.created_at)
        assert.ok(parsedFood.updated_at)
        done()
      })
    })
  })

  describe('POST /api/v1/foods', function(){
    beforeEach(function(done){
      Promise.all([
        Food.create({name: 'banana', calories: 400, active: true, created_at: new Date, updated_at: new Date})
      ])
      .then(function(){
        done()
      })
    })

    afterEach(function(done){
      database.raw('TRUNCATE foods, meals RESTART IDENTITY CASCADE')
      .then(function(){
        done()
      })
    })

    it('should create a new food item', function(done){
      var new_food = { name: 'chocolate', calories: 500, active: true, created_at: new Date, updated_at: new Date }
      this.request.post('/api/v1/foods', {form: new_food}, function(error, response) {
        let parsedFood = JSON.parse(response.body.toString())

        assert.equal(response.statusCode, 200)
        assert.equal(parsedFood.id, 2)
        assert.equal(parsedFood.name, new_food.name)
        assert.equal(parsedFood.calories, new_food.calories)
        done()
      })
    })

    it('should have defaults for active and timestamps', function(done){
      var new_food = { name: 'chocolate', calories: 500 }
      this.request.post('/api/v1/foods', {form: new_food}, function(error, response) {
        let parsedFood = JSON.parse(response.body.toString())

        assert.equal(response.statusCode, 200)
        assert.equal(parsedFood.id, 2)
        assert.equal(parsedFood.name, new_food.name)
        assert.equal(parsedFood.calories, new_food.calories)
        assert.equal(parsedFood.active, true)
        done()
      })
    })
  })

  describe('PUT /api/v1/foods/:id', function(){
    beforeEach(function(done){
      Promise.all([
        Food.create({name: 'banana', calories: 400, active: true, created_at: new Date, updated_at: new Date})
      ])
      .then(function(){
        done()
      })
    })

    afterEach(function(done){
      database.raw('TRUNCATE foods, meals RESTART IDENTITY CASCADE')
      .then(function(){
        done()
      })
    })

    it('should return 404 if resource is not found', function(done) {
      var edit_food = { name: 'chocolate', calories: 500 }
      this.request.put('/api/v1/foods/10000', {form: edit_food}, function(error, response) {
        if (error) { done(error) }
        assert.equal(response.statusCode, 404)
        done()
      })
    })

    it('should update the name and/or calories for the food item', function(done){
      var edit_food = { name: 'chocolate', calories: 500 }
      this.request.put('/api/v1/foods/1', {form: edit_food}, function(error, response) {
        let parsedFood = JSON.parse(response.body.toString())

        assert.equal(response.statusCode, 200)
        assert.equal(parsedFood.id, 1)
        assert.equal(parsedFood.name, edit_food.name)
        assert.equal(parsedFood.calories, edit_food.calories)
        assert.equal(parsedFood.active, true)
        done()
      })
    })
  })

  describe('DELETE /api/v1/foods/:id', function(){
    beforeEach(function(done){
      Promise.all([
        Food.create({name: 'banana', calories: 400, active: true, created_at: new Date, updated_at: new Date}),
        Food.create({name: 'chocolate', calories: 500, active: true, created_at: new Date, updated_at: new Date})
      ])
      .then(function(){
        done()
      })
    })

    afterEach(function(done){
      database.raw('TRUNCATE foods, meals RESTART IDENTITY CASCADE')
      .then(function(){
        done()
      })
    })

    it('should inactivate a food item', function(done){
      this.request.delete('/api/v1/foods/1', function(error, response){
        if(error){ done(error) }
        let parsedFood = JSON.parse(response.body.toString())

        assert.equal(response.statusCode, 200)
        assert.equal(parsedFood.id, 1)
        assert.equal(parsedFood.name, 'banana')
        assert.equal(parsedFood.calories, 400)
        assert.equal(parsedFood.active, false)
        done()
      })
    })
  })

  describe('GET /api/v1/meals/:name', function(){
    before(function(done) {
      var today = new Date
      var yesterday = new Date(today - (24 * 60 * 60 * 1000))

      Promise.all([
        Meal.create({name: 'breakfast'}),
        Meal.create({name: 'lunch'})
      ]).then(function() {
        Promise.all([
          Food.create({name: 'banana', calories: 400, active: true, created_at: today, updated_at: today}),
          Food.create({name: 'chocolate', calories: 500, active: true, created_at: yesterday, updated_at: yesterday}),
          Food.create({name: 'chips', calories: 600, active: true, created_at: yesterday, updated_at: yesterday})
        ])
      }).then(function() {
        Promise.all([
          MealFood.create({meal_id: 1, food_id: 1, date: today}),
          MealFood.create({meal_id: 1, food_id: 2, date: today}),
          MealFood.create({meal_id: 1, food_id: 3, date: yesterday}),
          MealFood.create({meal_id: 2, food_id: 2, date: today})
        ])
      }).then(function() {
        done()
      })
    })

    after(function(done){
      database.raw('TRUNCATE foods, meals RESTART IDENTITY CASCADE')
      .then(function(){
        done()
      })
    })

    it('should return 404 if resource is not found', function(done) {
      this.request.get('/api/v1/meals/brunch', function(error, response) {
        if (error) { done(error) }
        assert.equal(response.statusCode, 404)
        done()
      })
    })

    it('should return a 200 if the response is found', function(done){
      this.request.get('/api/v1/meals/lunch', function(error, response){
        if(error){ done(error) }
        assert.equal(response.statusCode, 200)
        done()
      })
    })

    it('should return the all the parameters for the food item', function(done){
      this.request.get('/api/v1/meals/lunch', function(error, response){
        if(error){ done(error) }
        let parsedFood = JSON.parse(response.body.toString())

        assert.equal(parsedFood.length, 1)
        assert.equal(parsedFood[0].id, 4)
        assert.equal(parsedFood[0].name, 'chocolate')
        assert.equal(parsedFood[0].calories, 500)
        assert.deepEqual(datePresenter(parsedFood[0].date), datePresenter(new Date))
        done()
      })
    })

    it('should return the all the parameters for the food item by the queried date', function(done){
      this.request.get('/api/v1/meals/breakfast?date=' + datePresenter(new Date), function(error, response){
        if(error){ done(error) }
        let parsedFood = JSON.parse(response.body)

        assert.equal(parsedFood.length, 2)
        assert.equal(parsedFood[0].id, 1)
        assert.equal(parsedFood[0].name, 'banana')
        assert.equal(parsedFood[0].calories, 400)
        assert.equal(datePresenter(parsedFood[0].date), datePresenter(new Date))
        assert.equal(parsedFood[1].id, 2)
        assert.equal(parsedFood[1].name, 'chocolate')
        assert.equal(parsedFood[1].calories, 500)
        assert.equal(datePresenter(parsedFood[1].date), datePresenter(new Date))
        done()
      })
    })
  })
  describe('GET /api/v1/meals', function(){
    before(function(done) {
      var today = new Date
      var yesterday = new Date(today - (24 * 60 * 60 * 1000))

      Promise.all([
        Meal.create({name: 'breakfast'}),
        Meal.create({name: 'lunch'})
      ]).then(function() {
        return Promise.all([
          Food.create({name: 'banana', calories: 400, active: true, created_at: today, updated_at: today}),
          Food.create({name: 'chocolate', calories: 500, active: true, created_at: yesterday, updated_at: yesterday}),
          Food.create({name: 'chips', calories: 600, active: true, created_at: yesterday, updated_at: yesterday})
        ])
      }).then(function() {
        return Promise.all([
          MealFood.create({meal_id: 1, food_id: 1, date: today}),
          MealFood.create({meal_id: 1, food_id: 2, date: today}),
          MealFood.create({meal_id: 1, food_id: 3, date: yesterday}),
          MealFood.create({meal_id: 2, food_id: 2, date: today})
        ])
      }).then(function() {
        done()
      })
    })

    after(function(done){
      database.raw('TRUNCATE foods, meals RESTART IDENTITY CASCADE')
      .then(function(){
        done()
      })
    })

    it('should return a 200 if the response is found', function(done){
      this.request.get('/api/v1/meals', function(error, response){
        if(error){ done(error) }
        assert.equal(response.statusCode, 200)
        done()
      })
    })

    it('should return the all the parameters for the food item', function(done){
      this.request.get('/api/v1/meals', function(error, response){
        if(error){ done(error) }
        let parsedFood = JSON.parse(response.body.toString())
        assert.equal(parsedFood['breakfast'].length, 3)
        assert.equal(parsedFood['lunch'].length, 1)
        done()
      })
    })

   it('should return the all the parameters for the food item by the queried date', function(done){
      this.request.get('/api/v1/meals?date=' + datePresenter(new Date), function(error, response){
        if(error){ done(error) }
        let parsedFood = JSON.parse(response.body)

        assert.equal(parsedFood['breakfast'].length, 2)
        assert.equal(parsedFood['lunch'].length, 1)
        done()
      })
    })
  })

  describe('POST /api/v1/meal-foods', function(){
    before(function(done) {
      var today = new Date
      var yesterday = new Date(today - (24 * 60 * 60 * 1000))

      Promise.all([
        Meal.create({name: 'breakfast'}),
        Meal.create({name: 'lunch'})
      ]).then(function() {
        return Promise.all([
          Food.create({name: 'banana', calories: 400, active: true, created_at: today, updated_at: today}),
          Food.create({name: 'chocolate', calories: 500, active: true, created_at: yesterday, updated_at: yesterday}),
          Food.create({name: 'chips', calories: 600, active: true, created_at: yesterday, updated_at: yesterday})
        ])
      }).then(function() {
        return Promise.all([
          MealFood.create({meal_id: 1, food_id: 1, date: today}),
          MealFood.create({meal_id: 1, food_id: 2, date: today}),
          MealFood.create({meal_id: 1, food_id: 3, date: yesterday}),
          MealFood.create({meal_id: 2, food_id: 2, date: today})
        ])
      }).then(function() {
        done()
      })
    })

    after(function(done){
      database.raw('TRUNCATE foods, meals RESTART IDENTITY CASCADE')
      .then(function(){
        done()
      })
    })

    it('should return the all the parameters for the meal food item', function(done){
      var new_food = { meal_id: 2, food_id: 3, date: new Date }
      this.request.post('/api/v1/meal-foods', {form: new_food}, function(error, response) {
        if(error){ done(error) }
        let parsedFood = JSON.parse(response.body.toString())

        assert.equal(parsedFood['id'], 5)
        assert.equal(parsedFood['meal_id'], 2)
        assert.equal(parsedFood['food_id'], 3)
        done()
      })
    })
  })

  describe('DELETE /api/v1/meal-foods/:id', function(){
    before(function(done) {
      var today = new Date
      var yesterday = new Date(today - (24 * 60 * 60 * 1000))

      Promise.all([
        Meal.create({name: 'breakfast'})
      ]).then(function() {
        return Promise.all([
          Food.create({name: 'banana', calories: 400, active: true, created_at: today, updated_at: today})
        ])
      }).then(function() {
        return Promise.all([
          MealFood.create({meal_id: 1, food_id: 1, date: today})
        ])
      }).then(function() {
        done()
      })
    })

    after(function(done){
      database.raw('TRUNCATE foods, meals RESTART IDENTITY CASCADE')
      .then(function(){
        done()
      })
    })

    it('will delete a meal_food', function(done) {
      this.request.delete('/api/v1/meal-foods/1', function(error, response){
        if(error){ done(error) }
        assert.equal(response.statusCode, 200)
        database.raw('SELECT * FROM meal_foods WHERE id = 1').then(function(data){
          assert.deepEqual(data.rows, [])
        })
        done()
      })
    })
  })
})


function datePresenter(timeStamp){
  return dateFormat(timeStamp, "yyyy-mm-dd")
}
