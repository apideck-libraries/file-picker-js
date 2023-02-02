module.exports = {
  rollup(config, options) {
    if (options.format === 'umd') {
      config.input = config.input.replace('index.ts', 'index.umd.ts');
      config.output.name = 'FilePicker';
      config.output.exports = 'default';
      return config;
    }
    return config;
  },
};
