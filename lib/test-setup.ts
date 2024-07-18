import { DeepPartial } from "./deep-partial";

export class TestSetup<TConfig, TResult> {
  private defaultConfig: TConfig;
  private setupFunc: (config: TConfig) => TResult;

  constructor(defaultConfig: TConfig, setupFunc: (config: TConfig) => TResult) {
    this.defaultConfig = defaultConfig;
    this.setupFunc = setupFunc;
  }

  run(override?: DeepPartial<TConfig> | ((config: TConfig) => void)): TResult {
    let config = { ...this.defaultConfig };

    if (typeof override === "function") {
      override(this.defaultConfig);
    } else {
      config = { ...config, ...override };
    }

    return this.setupFunc(config);
  }
}
