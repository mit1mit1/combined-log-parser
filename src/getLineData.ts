export interface CombinedLogFormatData {
    ipAddress: string;
    clientIdentity: string;
    requesterId: string;
    timestamp: string;
    httpRequest: HTTPRequest;
    responseStatus: string;
    objectReturnedSize: string;
    referringSite: string;
    browserInfo: string;
}

interface HTTPRequest {
    method: string;
    uri: string;
    protocol: string;
}

const errorString = 'Invalid log line format, please use the combined log format (https://httpd.apache.org/docs/2.4/logs.html)';

const getHTTPRequestObject = (httpRequestString: string) => {
    if (httpRequestString.split(' ').length < 3) {
        throw new Error(errorString);
    }
    const [method, uri, protocol] = httpRequestString.split(' ')
    return {
        method, uri, protocol
    }
}

const getLineData = (line: string): CombinedLogFormatData => {
    if (line.split('"').length < 3) {
        throw new Error(errorString);
    }
    const [beginning, httpRequestParts, middle, referringSite, whitespace, browserInfo] = line.split('"').map((value) => value.trim());
    if (beginning.split('[').length < 2) {
        throw new Error(errorString);
    }
    const [firstThree, timeStampWithCloseBracket] = beginning.split('[').map((value) => value.trim());
    if (firstThree.split(' ').length < 3) {
        throw new Error(errorString);
    }
    const [ipAddress, clientIdentity, requesterId] = firstThree.split(' ');
    if (middle.trim().split(' ').length < 2) {
        throw new Error(errorString);
    }
    const [responseStatus, objectReturnedSize] = middle.split(' ');
    return {
        ipAddress,
        clientIdentity,
        requesterId,
        timestamp: timeStampWithCloseBracket.replace(']', ''),
        httpRequest: getHTTPRequestObject(httpRequestParts),
        responseStatus,
        objectReturnedSize,
        referringSite,
        browserInfo,
    }
}

export default getLineData;