import topThreeValues from './topThree';

describe("Can get top values", () => {
    test("Reads three values", () => {
        const testObject = {'biggestKey': 12, 'middleKey': 5, 'smallestKey': 2};
        expect(topThreeValues(testObject).first.key).toEqual('biggestKey');
        expect(topThreeValues(testObject).third.key).toEqual('smallestKey');
    });
});
