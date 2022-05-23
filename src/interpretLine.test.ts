import interpretLine from './interpretLine';

describe("Can interpret single line", () => {
    test("Reads valid HTTP", () => {
        const combinedLogLine = `177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7"`;
        const interpretedLine = interpretLine(combinedLogLine);
        expect(interpretedLine.ipAddress).toEqual('177.71.128.21');
        expect(interpretedLine.httpRequest.uri).toEqual('/intranet-analytics/');
    });
});
