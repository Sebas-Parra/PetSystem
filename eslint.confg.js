//llamar a la libreria que me permite realizar estas cnfiguraciones
const js = require('@eslint/js');

module.exports = [
    {
        files: ['src/**/*.js'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'commonjs',
        },
        ...js.configs.recommended,
    }
]