import { DeepPartial } from "./deep-partial";

export class TestSetup<TConfig, TResult> {
  private defaultConfig: TConfig;
  private setupFunc: (config: TConfig) => TResult;

  constructor(defaultConfig: TConfig, setupFunc: (config: TConfig) => TResult) {
    this.defaultConfig = defaultConfig;
    this.setupFunc = setupFunc;
  }

  run(overrides: DeepPartial<TConfig> = {}): TResult {
    return this.setupFunc({ ...this.defaultConfig, ...overrides });
  }

  run2(overrideFunc: (config: TConfig) => void = () => {}): TResult {
    const config = { ...this.defaultConfig };
    overrideFunc(config);

    return this.setupFunc(config);
  }
}
