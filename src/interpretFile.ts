import interpretLine, { CombinedLogFormatLine } from './interpretLine';
import fs from 'fs';
import readline from 'readline';

interface IPAddressInfo {
    [key: string]: number;
}

interface URIInfo {
    [key: string]: number;
}

interface FileInfo {
    ipAddressCounts: IPAddressInfo;
    uriCounts: URIInfo;
}

const interpretFile = async (filename: string): Promise<FileInfo> => {
    const fileStream = fs.createReadStream(filename);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      });
    const info: FileInfo = {
        ipAddressCounts: {},
        uriCounts: {},
    }
    for await (const line of rl) {
        const interpretedLine = interpretLine(line);
        if (info.ipAddressCounts[interpretedLine.ipAddress]) {
            info.ipAddressCounts[interpretedLine.ipAddress]++;
        } else {
            info.ipAddressCounts[interpretedLine.ipAddress] = 1;
        }
        if (info.uriCounts[interpretedLine.httpRequest.uri]) {
            info.uriCounts[interpretedLine.httpRequest.uri]++;
        } else {
            info.uriCounts[interpretedLine.httpRequest.uri] = 1;
        }
    };
    return info;
}

export default interpretFile;
