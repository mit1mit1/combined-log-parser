import getTopNKeyValuePairs from './getTopNKeyValuePairs';

describe("Can get top three values from an object", () => {
    test("Reads three values", () => {
        const testObject = {'biggestKey': 12, 'middleKey': 5, 'smallestKey': 2};
        const topNPairs = getTopNKeyValuePairs(testObject, 3);
        expect(topNPairs[0].keyString).toEqual('biggestKey');
        expect(topNPairs[2].keyString).toEqual('smallestKey');
    });

    test("Gets top three from five sorted values", () => {
        const testObject = {'biggestKey': 12, 'secondKey': 5, 'thirdKey': 4, 'fourthKey': 3, 'lastKey': 1};
        const topNPairs = getTopNKeyValuePairs(testObject, 3);
        expect(topNPairs[0].keyString).toEqual('biggestKey');
        expect(topNPairs[2].keyString).toEqual('thirdKey');
    });

    test("Gets top three from five unsorted values", () => {
        const testObject = {'thirdKey': 4, 'fourthKey': 3, 'biggestKey': 12, 'secondKey': 5, 'lastKey': 1};
        const topNPairs = getTopNKeyValuePairs(testObject, 3);
        expect(topNPairs[0].keyString).toEqual('biggestKey');
        expect(topNPairs[1].keyString).toEqual('secondKey');
        expect(topNPairs[2].keyString).toEqual('thirdKey');
    });

    test("Gets top two from five unsorted values", () => {
        const testObject = {'thirdKey': 4, 'fourthKey': 3, 'biggestKey': 12, 'secondKey': 5, 'lastKey': 1};
        const topNPairs = getTopNKeyValuePairs(testObject, 2);
        expect(topNPairs[0].keyString).toEqual('biggestKey');
        expect(topNPairs[1].keyString).toEqual('secondKey');
        expect(topNPairs[2]).toBeUndefined();
    });

    test("Gets top zero from five unsorted values", () => {
        const testObject = {'thirdKey': 4, 'fourthKey': 3, 'biggestKey': 12, 'secondKey': 5, 'lastKey': 1};
        const topNPairs = getTopNKeyValuePairs(testObject, 0);
        expect(topNPairs).toEqual([]);
    });

    test("Gets top two from two values", () => {
        const testObject = {'biggestKey': -1, 'secondKey': -5};
        const topNPairs = getTopNKeyValuePairs(testObject, 3);
        expect(topNPairs[0].keyString).toEqual('biggestKey');
        expect(topNPairs[1].keyString).toEqual('secondKey');
        expect(topNPairs[2]).toBeUndefined();
    });

    test("Gets top zero from zero values", () => {
        const testObject = {};
        const topNPairs = getTopNKeyValuePairs(testObject, 3);
        expect(topNPairs[0]).toBeUndefined();
        expect(topNPairs[1]).toBeUndefined();
        expect(topNPairs[2]).toBeUndefined();
    });
});
