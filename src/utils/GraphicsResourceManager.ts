class GraphicsResourceManager {
  private static _instance: GraphicsResourceManager | null = null;

  private constructor() {}

  static createInstance() {
    this._instance = new GraphicsResourceManager();
  }
  static getInstance() {
    // 싱글턴 인스턴스가 null일 경우를 대비해 assert추가
    if (!this._instance) {
      //런타임 중에 , createInstance가 호출되었다는걸 가정
      throw new Error('GraphicsResourceManager is not initialized');
    }
    return this._instance;
  }
}

export default GraphicsResourceManager;
