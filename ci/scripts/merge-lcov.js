const { glob } = require('glob');
const fs = require('fs');
const path = require('path');

const getLcovFiles = function (src) {
  return glob.sync(`${src}/**/lcov.info`);
};

(async () => {
  console.log(`[INFO] Looking for lcov files in coverage`);
  const files = getLcovFiles('coverage');
  console.log(`[INFO] Found ${files.length} lcov files`);
  const mergedReport = files.reduce(
    (mergedReport, currFile) => (mergedReport += fs.readFileSync(currFile)),
    ''
  );
  await fs.writeFile(
    path.resolve('./coverage/lcov.info'),
    mergedReport,
    (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    }
  );
})();
