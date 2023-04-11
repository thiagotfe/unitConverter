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

## TEMPERATURE
**Description:** Convert units of temperature.

**Url:** `/temperature/`

**Method:** `POST`

**Body (JSON)**:
```
{
	"value": 110,
	"unit_in":"C",
	"unit_out":"F"
}
```
**Important:** `unit_in` and `unit_out` must be `string` and one of this letters:
- C - Celsius
- F - Farenheit
- K - Kelvin

### Success Response:
**Code:** `200`

**Content Example:**
```
{
	"value": 230,
	"unit": "farenheit",
	"convertedTo": "celsius to farenheit"
}
```

### Error Responses:
**Code**: `400`

**Conditions:**
- `value` is `required` and must be `integer` or `float`
- `unit_in` and `unit_out` are required, must be `string` and one of this letters: `C`, `F`, or `K`.
- `value` must be greater than or equal to the minimum possible value for `unit_in`.

**Content Example:**
```
{
	"errors": [
		//Error message
	]
}
```
