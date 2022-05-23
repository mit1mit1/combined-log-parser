import getFileData from './getFileData';

describe("Can interpret single valid file", () => {
    test("Reads single valid line", async () => {
        const fileData = await getFileData('./src/mocks/one-valid-line.log');
        expect(fileData.ipAddressCounts).toEqual({ '168.41.191.41': 1 });
        expect(fileData.uriCounts).toEqual({ '/this/page/does/not/exist/': 1 });
    });

    test("Reads multiple valid lines", async () => {
        const fileData = await getFileData('./src/mocks/multiple-valid-lines.log');
        expect(fileData.ipAddressCounts).toEqual({
            "50.112.00.11": 4,
            "72.44.32.10": 2,
            "79.125.00.21": 1,
        });
        expect(fileData.uriCounts).toEqual({
            "/asset.css": 3,
            "/download/counter/": 1,
            "/hosting/": 1,
            "/newsletter/": 1,
            "/translations/": 1,
        });
    });

    test("Reads empty file", async () => {
        const fileData = await getFileData('./src/mocks/empty-file.log');
        expect(fileData.ipAddressCounts).toEqual({});
        expect(fileData.uriCounts).toEqual({});
    });
});

describe("Skips invalid lines in a file", () => {
    test("Reads all valid lines from a file with some invalid lines", async () => {
        const fileData = await getFileData('./src/mocks/some-invalid-lines.log');
        expect(fileData.ipAddressCounts).toEqual({
            "50.112.00.11": 2,
            "72.44.32.10": 2,
            "79.125.00.21": 1,
        });
        expect(fileData.uriCounts).toEqual({
            "/asset.css": 1,
            "/download/counter/": 1,
            "/hosting/": 1,
            "/newsletter/": 1,
            "/translations/": 1,
        });
    });
});
