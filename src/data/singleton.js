import 'es6-symbol/implement';

const singleton = Symbol();
const singletonEnforcer = Symbol();

export default class Singleton {
  constructor(enforcer) {
    if(enforcer != singletonEnforcer) throw "Cannot construct singleton";
  }

  static get instance() {
    if(!this[singleton]) {
      this[singleton] = new Singleton(singletonEnforcer);
    }
    return this[singleton];
  }

  getData(key) {
    return this[key];
  }

  setData(key, data) {
    this[key] = data;
  }
}
