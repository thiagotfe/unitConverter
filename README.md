# Unit Converter

**An API that converts units such as length, temperature, weight, and volume from one unit to another.**

## LENGTH
**Description:** Convert units of length.

**Url:** `/length/`

**Method:** `POST`

**Body (JSON)**:
```
{
	"value": 10,
	"unit_in":3,
	"unit_out":5
}
```
**Important:** `unit_in` and `unit_out` must be `integer` and between `0` and `12`:
- 0 - kilometers
- 1 - hectometers
- 2 - decameters
- 3 - meters
- 4 - decimeters
- 5 - centimeters
- 6 - milimeters
- 7 - micrometers
- 8 - nanometers
- 9 - miles
- 10 - yards
- 11 - feet
- 12 - inches

### Success Response:
**Code:** `200`

**Content Example:**
```
{
	"value": 1000,
	"unit": "centimeters",
	"convertedTo": "meters to centimeters"
}
```

### Error Responses:
**Code**: `400`

**Conditions:**
- `value` is `required` and must be `integer` or `float`
- `unit_in` and `unit_out` are required and must be `integer` and between `0` and `12`

**Content Example:**
```
{
	"errors": [
		//Error message
	]
}
```
