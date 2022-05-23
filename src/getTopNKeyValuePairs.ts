const getTopNKeyValuePairs = (object: { [key: string]: number }, n: number) => {
    const keyValuePairArray = Object.entries({ ...object }).map(([key, value]) => ({ keyString: key, count: value }));
    const sortedPairs = keyValuePairArray.sort((a, b) => {
        return b.count - a.count
    });
    return sortedPairs.slice(0, n);
}

export default getTopNKeyValuePairs;
