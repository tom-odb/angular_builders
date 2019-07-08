const TSG = require('ts-json-schema-generator');
const path = require('path');

import toUpperCamelcase from "../utils/to-upper-camelcase";

export default (filePath: string, dir: string) => new Promise((resolve, reject) => {
    try {
        const type = toUpperCamelcase(filePath.replace(/\.model\.ts$/, ''));
        const generatorConfig = {
            type,
            path: path.join(dir, 'types', filePath),
            expose: 'export',
            topRef: true,
            jsDoc: 'extended',
			strictTuples: true,
			skipTypeCheck: true, // TODO: re-enable once this is fixed: https://github.com/vega/ts-json-schema-generator/pull/109
        };

        const generator = TSG.createGenerator(generatorConfig);
        const schema = generator.createSchema(type);

        resolve({ schema, type });
    } catch (err) {
        reject(err);
    }
});
