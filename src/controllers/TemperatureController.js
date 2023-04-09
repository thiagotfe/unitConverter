/* eslint-disable no-unreachable */
import { get } from 'lodash';

class TemperaturaController {
  async index(req, res) {
    const options = [
      {
        name: 'celsius',
        letter: 'C',
        min: -273.15,
      },
      {
        name: 'farenheit',
        letter: 'F',
        min: -459.67,
      },
      {
        name: 'kelvin',
        letter: 'K',
        min: 0,
      },
    ];

    const showLetters = () => {
      const letters = options.map((option) => option.letter);
      return letters;
    };

    function getOptionByLetter(letter) {
      for (let i = 0; i < options.length; i += 1) {
        if (options[i].letter === letter) return { ...options[i] };
      }
      return false;
    }

    /*
    function getLetterByName(name) {
      for (let i = 0; i < options.length; i += 1) {
        if (options[i].name === name) return options[i].letter;
      }
    }
    */

    function validUnit(unit) {
      if (typeof unit === 'string') {
        unit = unit.toUpperCase();
        const option = getOptionByLetter(unit);
        if (option !== false) return { ...option };
      }
      return false;
    }

    try {
      const { value, unit_in, unit_out } = req.body;

      // VALIDATIONS
      // eslint-disable-next-line prefer-const
      let errors = [];
      if (!Number.isFinite(value)) {
        errors.push('value are required and must be integer or float');
      }

      const validUnitIn = validUnit(unit_in);
      const validUnitOut = validUnit(unit_out);

      if (!validUnitIn) {
        errors.push(`unit_in are required, must be string and one of this letters: ${showLetters()}`);
      }
      if (value < validUnitIn.min) {
        errors.push(`unit_in must be more than or equal to ${validUnitIn.min} for temperatures in ${validUnitIn.name}`);
      }
      if (!validUnitOut) {
        errors.push(`unit_out are required, must be string and one of this letters: ${showLetters()}`);
      }

      if (errors.length > 0) {
        return res.status(400).json({
          errors,
        });
      }

      const toReturn = {};

      // c -> c | k -> k | f -> k
      if (unit_in === unit_out) {
        toReturn.value = value;
      } else if (validUnitIn.letter === 'K') {
        // k -> c || k -> f
        if (validUnitOut.letter === 'C') {
          toReturn.value = value - 273;
        } else if (validUnitOut.letter === 'F') {
          toReturn.value = ((value - 273) * 1.8) + 32;
        }
      } else if (validUnitIn.letter === 'C') {
        // c -> k || c -> f
        if (validUnitOut.letter === 'K') {
          toReturn.value = value + 273;
        } else if (validUnitOut.letter === 'F') {
          toReturn.value = (value * 1.8) + 32;
        }
      } else if (validUnitIn.letter === 'F') {
        // f -> c || f -> k
        if (validUnitOut.letter === 'C') {
          toReturn.value = (value - 32) / 1.8;
        } else if (validUnitOut.letter === 'K') {
          toReturn.value = (value - 32) * (5 / 9) + 273;
        }
      }

      toReturn.value = Number(toReturn.value.toFixed(2));
      toReturn.unit = validUnitOut.name;
      toReturn.convertedTo = `${validUnitIn.name} to ${validUnitOut.name}`;
      return res.json(toReturn);
    } catch (e) {
      console.log(e);
      const eToMap = get(e, 'errors', [{ message: 'Unknown error' }]);
      return res.status(400).json({
        errors: eToMap.map((err) => err.message),
      });
    }
  }
}
export default new TemperaturaController();
