import getFileData from "./getFileData";
import minimistLite from 'minimist-lite';
import getTopNKeyValuePairs from "./getTopNKeyValuePairs";

const filename = minimistLite(process.argv.slice(2))['filename'];

getFileData(filename).then((result) => {
    console.log('Number of unique ip addresses: ', Object.keys(result.ipAddressCounts).length)
    console.log('Top three ip addresses: ', getTopNKeyValuePairs(result.ipAddressCounts, 3));
    console.log('Top three urls: ', getTopNKeyValuePairs(result.uriCounts, 3));
});
