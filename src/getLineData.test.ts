import getLineData from './getLineData';

describe("Can get data from lines", () => {
    test("Reads valid HTTP line", () => {
        const combinedLogLine = `177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7"`;
        const lineData = getLineData(combinedLogLine);
        expect(lineData.ipAddress).toEqual('177.71.128.21');
        expect(lineData.httpRequest.uri).toEqual('/intranet-analytics/');
    });

    test("Ignores garbage data at end of valid HTTP line", () => {
        const combinedLogLine = `177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7" some extra "" Dat " [ a]`;
        const lineData = getLineData(combinedLogLine);
        expect(lineData.ipAddress).toEqual('177.71.128.21');
        expect(lineData.httpRequest.uri).toEqual('/intranet-analytics/');
    });

    test("Raises errors if not enough data present", () => {
        const lineMissingCloseQuote = `177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1`;
        expect(() => getLineData(lineMissingCloseQuote)).toThrow();
        const lineMissingBrackets = `177.71.128.21 - - 10/Jul/2018:22:21:28 +0200 "GET /intranet-analytics/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7"`;
        expect(() => getLineData(lineMissingBrackets)).toThrow();
        const lineMissingIPAddress = `- - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7"`;
        expect(() => getLineData(lineMissingIPAddress)).toThrow();
        const lineMissingHTTPData = `177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7"`;
        expect(() => getLineData(lineMissingHTTPData)).toThrow();
        const lineMissingResponseStatus = `177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7"`;
        expect(() => getLineData(lineMissingResponseStatus)).toThrow();
    });
});
