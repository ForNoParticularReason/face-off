import shorthand from 'json-schema-shorthand';

let schema = {
  id: "http://aotds.babyl.ca/schema.json",
  definitions: {
    movement: {
      id: "#movement",
      object: {
        velocity: "number!",
        heading: "number!",
        coords: 'object!',
        trajectory: 'object',
        remaining_power: "number",
      }
    },
    "ship_navigation": {
      id: '#ship_navigation',
      "object": {
        heading: 'number!',
        velocity: 'number!',
      },
    },
  },
};


shorthand(schema)
