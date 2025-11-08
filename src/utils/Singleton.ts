class Singleton {
  private static _instance: Singleton | null = null;

  private constructor() {}

  static getInstance() {
    if (!this._instance) {
      this._instance = new Singleton();
    }
    return this._instance;
  }
}

export default Singleton;
