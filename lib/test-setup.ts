import { DeepPartial } from "./deep-partial";

export class TestSetup<TConfig, TResult> {
  private defaultConfig: TConfig;
  private setupFunc: (config: TConfig) => TResult;

  constructor(defaultConfig: TConfig, setupFunc: (config: TConfig) => TResult) {
    this.defaultConfig = defaultConfig;
    this.setupFunc = setupFunc;
  }

  run(override?: DeepPartial<TConfig> | ((config: TConfig) => void)): TResult {
    let config: TConfig;

    if (typeof override !== "function") {
      config = { ...this.defaultConfig, ...override };
    } else {
      config = { ...this.defaultConfig };
      override(config);
    }

    return this.setupFunc(config);
  }
}
