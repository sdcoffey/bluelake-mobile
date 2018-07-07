module.exports = {
	"extends": [
		"plugin:react/recommended",
		"eslint:recommended"
	],
	"plugins": [
		"react",
		"react-native"
	],
  "parser": "babel-eslint",
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true,
      "modules": true
		},
	},
  "rules": {
    "react/prop-types": 1
  }
};
