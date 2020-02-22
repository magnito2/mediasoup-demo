module.exports =
{
	env:
	{
		browser: true,
		es6: true,
		node: true
	},
	plugins:
	[
		'import',
		'react',
		'jsx-control-statements'
	],
	extends:
	[
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:jsx-control-statements/recommended'
	],
	settings:
	{
		react:
		{
			pragma: 'React',
			version: '16'
		}
	},
	parser: "babel-eslint",
	parserOptions:
	{
		ecmaVersion: 2018,
		sourceType: 'module',
		ecmaFeatures:
		{
			impliedStrict: true,
			jsx: true
		}
	},
	rules:
	{
		'array-bracket-spacing': [ 2, 'always',
		{
			objectsInArrays: true,
		  arraysInArrays: true
		}],
		'arrow-parens': [ 2, 'always' ],
		'arrow-spacing': 2,
		'block-spacing': [ 2, 'always' ],
		'brace-style': [ 2, 'allman', { allowSingleLine: true } ],
		'camelcase': 2,
		'comma-dangle': 2,
		'comma-spacing': [ 2, { before: false, after: true } ],
		'comma-style': 2,
		'computed-property-spacing': 2,
		'constructor-super': 2,
		'func-call-spacing': 2,
		'generator-star-spacing': 2,
		'guard-for-in': 2,
		'indent': [ 2, 'tab', { 'SwitchCase': 1 } ],
		'key-spacing': [ 2,
		{
			singleLine:
			{
				beforeColon: false,
				afterColon: true
			},
			multiLine:
			{
				beforeColon: true,
				afterColon: true,
				align: 'colon'
			}
		}],
		'keyword-spacing': 2,
		'linebreak-style': [ 2, 'unix' ],
		'lines-around-comment': [ 2,
		{
			allowBlockStart: true,
			allowObjectStart: true,
			beforeBlockComment: true,
			beforeLineComment: false
		}],
		'max-len': [ 2, 94,
		{
			tabWidth: 2,
			comments: 110,
			ignoreUrls: true,
			ignoreStrings: true,
			ignoreTemplateLiterals: true,
			ignoreRegExpLiterals: true
		}],
		'newline-after-var': 2,
		'newline-before-return': 2,
		'newline-per-chained-call': 2,
		'no-alert': 2,
		'no-caller': 2,
		'no-case-declarations': 2,
		'no-catch-shadow': 2,
		'no-class-assign': 2,
		'no-confusing-arrow': 2,
		'no-console': 2,
		'no-const-assign': 2,
		'no-debugger': 2,
		'no-dupe-args': 2,
		'no-dupe-keys': 2,
		'no-duplicate-case': 2,
		'no-div-regex': 2,
		'no-empty': [ 2, { allowEmptyCatch: true } ],
		'no-empty-pattern': 2,
		'no-else-return': 0,
		'no-eval': 2,
		'no-extend-native': 2,
		'no-ex-assign': 2,
		'no-extra-bind': 2,
		'no-extra-boolean-cast': 2,
		'no-extra-label': 2,
		'no-extra-semi': 2,
		'no-fallthrough': 2,
		'no-func-assign': 2,
		'no-global-assign': 2,
		'no-implicit-coercion': 2,
		'no-implicit-globals': 2,
		'no-inner-declarations': 2,
		'no-invalid-regexp': 2,
		'no-invalid-this': 2,
		'no-irregular-whitespace': 2,
		'no-lonely-if': 2,
		'no-mixed-operators': 2,
		'no-mixed-spaces-and-tabs': 2,
		'no-multi-spaces': 2,
		'no-multi-str': 2,
		'no-multiple-empty-lines': [ 2, { max: 1, maxEOF: 0, maxBOF: 0 } ],
		'no-native-reassign': 2,
		'no-negated-in-lhs': 2,
		'no-new': 2,
		'no-new-func': 2,
		'no-new-wrappers': 2,
		'no-obj-calls': 2,
		'no-proto': 2,
		'no-prototype-builtins': 0,
		'no-redeclare': 2,
		'no-regex-spaces': 2,
		'no-restricted-imports': 2,
		'no-return-assign': 2,
		'no-self-assign': 2,
		'no-self-compare': 2,
		'no-sequences': 2,
		'no-shadow': 2,
		'no-shadow-restricted-names': 2,
		'no-spaced-func': 2,
		'no-sparse-arrays': 2,
		'no-this-before-super': 2,
		'no-throw-literal': 2,
		'no-undef': 2,
		'no-unexpected-multiline': 2,
		'no-unmodified-loop-condition': 2,
		'no-unreachable': 2,
		'no-unused-vars': [ 1, { vars: 'all', args: 'after-used' }],
		'no-use-before-define': [ 2, { functions: false } ],
		'no-useless-call': 2,
		'no-useless-computed-key': 2,
		'no-useless-concat': 2,
		'no-useless-rename': 2,
		'no-var': 2,
		'no-whitespace-before-property': 2,
		'object-curly-newline': 0,
		'object-curly-spacing': [ 2, 'always' ],
		'object-property-newline': [ 2, { allowMultiplePropertiesPerLine: true } ],
		'prefer-const': 2,
		'prefer-rest-params': 2,
		'prefer-spread': 2,
		'prefer-template': 2,
		'quotes': [ 2, 'single', { avoidEscape: true } ],
		'semi': [ 2, 'always' ],
		'semi-spacing': 2,
		'space-before-blocks': 2,
		'space-before-function-paren': [ 2,
		{
			anonymous  : 'never',
			named      : 'never',
			asyncArrow : 'always'
		}],
		'space-in-parens': [ 2, 'never' ],
		'spaced-comment': [ 2, 'always' ],
		'strict': 2,
		'valid-typeof': 2,
		'eol-last': 2,
		'yoda': 2,
		// eslint-plugin-import options.
		'import/extensions': 2,
		'import/no-duplicates': 2,
		// eslint-plugin-react options.
		'jsx-quotes': [ 2, 'prefer-single' ],
		'react/display-name': [ 2, { ignoreTranspilerName: false } ],
		'react/forbid-prop-types': 0,
		'react/jsx-boolean-value': 2,
		'react/jsx-closing-bracket-location': 2,
		'react/jsx-curly-spacing': 2,
		'react/jsx-equals-spacing': 2,
		'react/jsx-handler-names': 2,
		'react/jsx-indent-props': [ 2, 'tab' ],
		'react/jsx-indent': [ 2, 'tab' ],
		'react/jsx-key': 2,
		'react/jsx-max-props-per-line': 0,
		'react/jsx-no-bind': 0,
		'react/jsx-no-duplicate-props': 2,
		'react/jsx-no-literals': 0,
		'react/jsx-no-undef': 0,
		'react/jsx-pascal-case': 2,
		'react/jsx-sort-prop-types': 0,
		'react/jsx-sort-props': 0,
		'react/jsx-uses-react': 2,
		'react/jsx-uses-vars': 2,
		'react/no-danger': 2,
		'react/no-deprecated': 2,
		'react/no-did-mount-set-state': 2,
		'react/no-did-update-set-state': 2,
		'react/no-direct-mutation-state': 2,
		'react/no-is-mounted': 2,
		'react/no-multi-comp': 0,
		'react/no-set-state': 0,
		'react/no-string-refs': 0,
		'react/no-unknown-property': 2,
		'react/prefer-es6-class': 2,
		'react/prop-types': [ 2, { skipUndeclared: true } ],
		'react/react-in-jsx-scope': 2,
		'react/self-closing-comp': 2,
		'react/sort-comp': 0,
		'react/jsx-wrap-multilines': [ 2,
		{
			declaration: false,
			assignment: false,
			return: true
		}]
	}
};
