const bson_types = [
    'binData',
    'objectId',
    'date',
    'regex',
    'dbPointer',
    'javascript',
    'symbol',
    'javascriptWithScope',
    'timestamp',
    'long',
    'decimal',
    'minKey',
    'maxKey'
]

const get_type = (e) => {
    if (typeof e === "string" && e.startsWith('$') && bson_types.includes(e.substring(1))) {
        return e.substring(1)
    } else if (null === e) {
        return 'null'
    }

    switch (typeof e) {
        case "number":
            return e % 1 === 0 ? 'int' : 'double'
        case "object":
            return Array.isArray(e) ? 'array' : 'object'
        case "string":
            return "string"
        case "boolean":
            return "bool"
        case "undefined":
            return "null"
    }
}

const generate_props = (e, desc) => {
    let schema = {
        bsonType: get_type(e)
    }

    if (desc === 1)
        schema.description = 'description'

    if (get_type(e) === 'object') {
        schema.required = []
        schema.properties = {}
        Object.keys(e).forEach(key => {
            schema.required.push(key)
            schema.properties[key] = generate_props(e[key], desc)
        })
    } else if (get_type(e) === 'array')
        schema.items = generate_props(e[0], desc)

    return schema
}

const gen_validator = (json_obj, desc) => {
    let validator = {
        $jsonSchema: generate_props(json_obj, desc)
    }
    return JSON.stringify(validator, null, 2)
}

example_object = {
  "nome": "gabriele",
  "cognome": "peloso",
  "data_nascita": "$date",
  "emoglobina": "$decimal",
  "dettagli": {
    "interceptor": "$regex",
  }
}

let validator = gen_validator(example_object,0)

console.log(validator)
