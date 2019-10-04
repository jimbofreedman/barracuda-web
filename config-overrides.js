const {
  override,
  addDecoratorsLegacy,
} = require("customize-cra");

module.exports = override(
  addDecoratorsLegacy(), // for Mobx Decorators
);
