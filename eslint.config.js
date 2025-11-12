//llamar a la libreria que me permite realizar estas cnfiguraciones
const js = require('@eslint/js');

module.exports = [
    {
        files: ['src/**/*.js'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'commonjs',
        },
        rules: {
            ...js.configs.recommended.rules,
            //require ; at the end of statements
            semi: ['error', 'always'],
            //require single quotes for strings
            quotes: ['error', 'single'],
            //require curly braces {} for all control statements
            'curly': ['error', 'all'],
            //warn when using console.log
            'no-console': ['warn'],
            // Warn about declared variables that are never used
            'no-unused-vars': ['warn'],
            // Enforce consistent spacing before and after arrow functions
            'arrow-spacing': ['error', { before: true, after: true }],
            // Enforce at least one newline at the end of files
            'eol-last': ['error', 'always'],
        }
    }
]