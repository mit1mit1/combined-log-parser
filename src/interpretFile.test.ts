import interpretFile from './interpretFile';

describe("Can interpret single valid file", () => {
    test("Reads valid HTTP", async () => {
        const interpretedFile = await interpretFile('./src/mocks/log-example.txt');
        expect(interpretedFile.ipAddressCounts).toEqual({'168.41.191.41': 1});
        expect(interpretedFile.uriCounts).toEqual({'/this/page/does/not/exist/': 1});
    });
});
