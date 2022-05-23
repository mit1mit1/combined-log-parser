import interpretFile from "./interpretFile";
import minimistLite from 'minimist-lite';
import topThreeValues from "./topThree";

const argv = minimistLite(process.argv.slice(2));
interpretFile(argv['filename']).then((result) => {
    console.log('number of unique ip addresses: ', Object.keys(result.ipAddressCounts).length)
    console.log('Top three ip addresses: ', topThreeValues(result.ipAddressCounts));
    console.log('Top three urls: ', topThreeValues(result.uriCounts));
});
