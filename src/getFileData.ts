import getLineData, { CombinedLogFormatData } from './getLineData';
import fs from 'fs';
import readline from 'readline';

interface IPAddressData {
    [key: string]: number;
}

interface URIData {
    [key: string]: number;
}

interface FileData {
    ipAddressCounts: IPAddressData;
    uriCounts: URIData;
}

const getFileData = async (filename: string): Promise<FileData> => {
    const fileStream = fs.createReadStream(filename);
    const readLines = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    const data: FileData = {
        ipAddressCounts: {},
        uriCounts: {},
    }

    let index = 0;
    for await (const line of readLines) {
        index++;
        let interpretedLine: CombinedLogFormatData;
        if (line == '') {
            continue;
        }
        try {
            interpretedLine = getLineData(line);
        } catch (e) {
            console.warn('Got error reading line ' + index);
            console.warn(e);
            continue;
        }
        if (data.ipAddressCounts[interpretedLine.ipAddress]) {
            data.ipAddressCounts[interpretedLine.ipAddress]++;
        } else {
            data.ipAddressCounts[interpretedLine.ipAddress] = 1;
        }
        if (data.uriCounts[interpretedLine.httpRequest.uri]) {
            data.uriCounts[interpretedLine.httpRequest.uri]++;
        } else {
            data.uriCounts[interpretedLine.httpRequest.uri] = 1;
        }
    };
    return data;
}

export default getFileData;
