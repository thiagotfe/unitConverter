import { get } from 'lodash';

class LengthController {
  async index(req, res) {
    const options = [
      {
        name: 'kilometers',
        number: 0,
        toMeters: 1000,
      },
      {
        name: 'hectometers',
        number: 1,
        toMeters: 100,
      },
      {
        name: 'decameters',
        number: 2,
        toMeters: 10,
      },
      {
        name: 'meters',
        number: 3,
        toMeters: 1,
      },
      {
        name: 'decimeters',
        number: 4,
        toMeters: 0.1,
      },
      {
        name: 'centimeters',
        number: 5,
        toMeters: 0.01,
      },
      {
        name: 'milimeters',
        number: 6,
        toMeters: 0.001,
      },
      {
        name: 'micrometers',
        number: 7,
        toMeters: 0.000001,
      },
      {
        name: 'nanometers',
        number: 8,
        toMeters: 0.000000001,
      },
      {
        name: 'miles',
        number: 9,
        toMeters: 1609.35,
      },
      {
        name: 'yards',
        number: 10,
        toMeters: 0.9144,
      },
      {
        name: 'feet',
        number: 11,
        toMeters: 0.3048,
      },
      {
        name: 'inches',
        number: 12,
        toMeters: 0.0254,
      },
    ];

    const getOptionNumberByName = (name) => {
      for (let index = 0; index < options.length; index += 1) {
        if (options[index].name === name) return options[index].number;
      }
      return false;
    };

    const getOptionNameByNumber = (unit) => {
      for (let index = 0; index < options.length; index += 1) {
        if (options[index].number === unit) return options[index].name;
      }
      return false;
    };
    const getOptionToMetersByNumber = (unit) => {
      for (let index = 0; index < options.length; index += 1) {
        if (options[index].number === unit) return options[index].toMeters;
      }
      return false;
    };
    const validUnit = (input) => {
      if (input === undefined
        || !Number.isInteger(input)
        || input < options[0].number
        || input > options[options.length - 1].number) {
        return false;
      }
      return true;
    };

    const convert = (val, inp, out) => {
      // UNIT OUTPUT == METER
      if (getOptionNameByNumber(out) === 'meters') {
        const newValue = val * getOptionToMetersByNumber(inp);
        return {
          value: Number(newValue.toFixed(10)),
          unit: getOptionNameByNumber(out),
          convertedTo: `${getOptionNameByNumber(inp)} to ${getOptionNameByNumber(out)}`,
        };
      }

      // UNIT INPUT == METER
      if (getOptionNameByNumber(inp) === 'meters') {
        const newValue = val / getOptionToMetersByNumber(out);
        return {
          value: Number(newValue.toFixed(10)),
          unit: getOptionNameByNumber(out),
          convertedTo: `${getOptionNameByNumber(inp)} to ${getOptionNameByNumber(out)}`,
        };
      }

      // UNIT INPUT AND OUTPUT !== METER
      const newValue1 = convert(val, inp, getOptionNumberByName('meters'));
      const newValue2 = convert(newValue1.value, getOptionNumberByName('meters'), out);
      return {
        value: Number(newValue2.value.toFixed(10)),
        unit: getOptionNameByNumber(out),
        convertedTo: `${getOptionNameByNumber(inp)} to ${getOptionNameByNumber(out)}`,
      };
    };

    try {
      const { value, unit_in, unit_out } = req.body;

      // VALIDATIONS
      // eslint-disable-next-line prefer-const
      let errors = [];
      if (!Number.isFinite(value)) {
        errors.push('value are required and must be integer or float');
      }

      if (!validUnit(unit_in)) {
        errors.push(`unit_in are required, must be integer and between ${options[0].number} and ${options[options.length - 1].number}`);
      }

      if (!validUnit(unit_out)) {
        errors.push(`unit_out are required, must be integer and between ${options[0].number} and ${options[options.length - 1].number}`);
      }

      if (errors.length > 0) {
        return res.status(400).json({
          errors,
        });
      }

      // UNIT INPUT === UNIT OUTPUT
      if (unit_in === unit_out) {
        return res.json({
          value,
          unit: getOptionNameByNumber(unit_out),
          convertedTo: `${getOptionNameByNumber(unit_in)} to ${getOptionNameByNumber(unit_out)}`,
        });
      }

      //  UNIT INPUT !== UNIT OUTPUT
      const conv = convert(value, unit_in, unit_out);

      return res.json({ ...conv });
    } catch (e) {
      console.log(e);
      const eToMap = get(e, 'errors', [{ message: 'Unknown error' }]);
      return res.status(400).json({
        errors: eToMap.map((err) => err.message),
      });
    }
  }
}
export default new LengthController();
