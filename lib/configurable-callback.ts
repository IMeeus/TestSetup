import { DeepPartial } from "./deep-partial";

export class ConfigurableCallback<TConfig, TResult> {
  private defaultConfig: TConfig;
  private callback: (config: TConfig) => TResult;

  constructor(defaultConfig: TConfig, callback: (config: TConfig) => TResult) {
    this.defaultConfig = defaultConfig;
    this.callback = callback;
  }

  run(override?: DeepPartial<TConfig> | ((config: TConfig) => void)): TResult {
    let config: TConfig;

    if (typeof override !== "function") {
      config = { ...this.defaultConfig, ...override };
    } else {
      config = { ...this.defaultConfig };
      override(config);
    }

    return this.callback(config);
  }
}
