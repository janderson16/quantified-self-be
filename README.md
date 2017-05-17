# Foods

### Parameters

* id: integer
* name: string
* calories: integer
* active: boolean
* created_at: timestamp
* updated_at: timestamp

## GET /api/v1/foods

* Returns all parameters for active foods in the database sorted by the 'created_at' date.
* Does not support querying.


## GET /api/v1/foods/:id

* Returns food item by the specified ID.
  * Parameters: id, name, calories, active, created_at, updated_at
* Returns a 404 if no food item is found with specified by ID.


## POST /api/v1/foods, body: { form: parameters }

* Required parameters: name, calories
* Parameters automatically assigned: id, active created_at, updated_at
* Successful POST returns food item with all parameters
* Failed POST returns 404

## PUT /api/v1/foods/:id, body: { form: parameters }

* At least one of the parameters required in body: name, calories
* Parameters automatically updated: updated_at
* Parameters discouraged from changing: active, created_at 
* Successful PUT returns food item with all parameters
* Failed PUT returns 404

## DELETE /api/v1/foods/:id

* Does not delete the item, but changes it to "active = false"
* Parameters automatically updated: updated_at
* Successful DELETE returns 200
* Failed DELETE returns 404


# Meals

### Parameters

* id : integer
* name: string

## GET /api/v1/meals

* Highly recommended query: date
* Returns all foods grouped by meal

## GET /api/v1/meals/:name

* Highly recommended query: date
* Returns all foods for the specified meal


# MealFoods

### Parameters

* id: integer
* meal_id: integer
* food_id: integer
* date: date

## POST /api/v1/foods, body: { form: parameters }

* Required parameters: meal_id, food_id, date
* Parameters automatically assigned: id
* Successful POST returns meal-food item with all parameters
* Failed POST returns 404

## DELETE /api/v1/meal-foods/:id

* Successful DELETE returns 200
* Failed DELETE returns 404
