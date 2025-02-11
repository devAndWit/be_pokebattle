export default class ErrorPokemon extends Error {
  constructor(message, customMsg) {
    super(message);
    this.customMsg = customMsg;
  }
}
