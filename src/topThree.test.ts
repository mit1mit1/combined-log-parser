import topThreeValues from './topThree';

describe("Can get top three values from an object", () => {
    test("Reads three values", () => {
        const testObject = {'biggestKey': 12, 'middleKey': 5, 'smallestKey': 2};
        expect(topThreeValues(testObject).topKeyValuePair.keyString).toEqual('biggestKey');
        expect(topThreeValues(testObject).thirdKeyValuePair.keyString).toEqual('smallestKey');
    });

    test("Gets top three from five sorted values", () => {
        const testObject = {'biggestKey': 12, 'secondKey': 5, 'thirdKey': 4, 'fourthKey': 3, 'lastKey': 1};
        expect(topThreeValues(testObject).topKeyValuePair.keyString).toEqual('biggestKey');
        expect(topThreeValues(testObject).thirdKeyValuePair.keyString).toEqual('thirdKey');
    });

    test("Gets top three from five unsorted values", () => {
        const testObject = {'thirdKey': 4, 'fourthKey': 3, 'biggestKey': 12, 'secondKey': 5, 'lastKey': 1};
        expect(topThreeValues(testObject).topKeyValuePair.keyString).toEqual('biggestKey');
        expect(topThreeValues(testObject).secondKeyValuePair.keyString).toEqual('secondKey');
        expect(topThreeValues(testObject).thirdKeyValuePair.keyString).toEqual('thirdKey');
    });

    test("Gets top two from two values", () => {
        const testObject = {'biggestKey': -1, 'secondKey': -5};
        expect(topThreeValues(testObject).topKeyValuePair.keyString).toEqual('biggestKey');
        expect(topThreeValues(testObject).secondKeyValuePair.keyString).toEqual('secondKey');
        expect(topThreeValues(testObject).thirdKeyValuePair).toBeUndefined();
    });

    test("Gets top zero from zero values", () => {
        const testObject = {};
        expect(topThreeValues(testObject).topKeyValuePair).toBeUndefined();
        expect(topThreeValues(testObject).secondKeyValuePair).toBeUndefined();
        expect(topThreeValues(testObject).thirdKeyValuePair).toBeUndefined();
    });
});
