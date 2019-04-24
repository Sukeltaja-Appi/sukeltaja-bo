module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "jest": true,
    "es6": true
  },
  "plugins": [
    "react",
    "react-hooks"
  ],
  "rules": {
    "no-console": 0,
    "no-use-before-define": "off",
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
    "comma-dangle": "off",
    "react/jsx-uses-vars": 2,
    "react-hooks/rules-of-hooks": "error"
  },
  "globals": {
    "fetch": false
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
