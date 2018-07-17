const { CLIEngine } = require('eslint');
const paths = require('../config/paths');

const baseConfig = require(paths.selfESLintConfig);

module.exports = argv => {
  const engine = new CLIEngine({
    baseConfig,
    useEslintrc: false,
    ignore: false,
    ignorePath: paths.selfIgnore,
    fix: argv.write,
  });

  const report = engine.executeOnFiles([paths.projectRoot]);
  let { errorCount } = report;

  if (argv.write) {
    // Write any fixes to disk
    CLIEngine.outputFixes(report);
    errorCount -= report.fixableErrorCount;
  }

  // Print the linting results
  const formatter = CLIEngine.getFormatter();
  const output = formatter(report.results);
  console.log(output);

  if (errorCount > 0) {
    process.exit(1);
  }
};
