export interface CombinedLogFormatLine {
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

const getHTTPRequestObject = (httpRequestString: string) => {
    const [method, uri, protocol] = httpRequestString.split(' ')
    return {
        method, uri, protocol
    }
}

const interpretLine = (line: string): CombinedLogFormatLine => {
    const [beginning, httpRequestParts, middle, referringSite, whitespace, browserInfo] = line.split('"', 6).map((value) => value.trim());
    const [firstThree, timeStampWithCloseBracket] = beginning.split('[');
    const [ipAddress, clientIdentity, requesterId] = firstThree.split(' ')
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

export default interpretLine;