const topThreeValues = (object: {[key: string]: number}) => {
    const result = {
        first: {key: '', value: Number.NEGATIVE_INFINITY},
        second: {key: '', value: Number.NEGATIVE_INFINITY},
        third: {key: '', value: Number.NEGATIVE_INFINITY},
    }
    Object.entries(object).forEach(([key, value]) => {
        if (value > result.first.value) {
            result.third.key = result.second.key;
            result.third.value = result.third.value;
            result.second.key = result.first.key;
            result.second.value = result.first.value;
            result.first.key = key;
            result.first.value = value;
        } else if (value > result.second.value) {
            result.third.value = result.second.value;
            result.third.key = result.second.key;
            result.second.value = value;
            result.second.key = key;
        } else if (value > result.third.value) {
            result.third.value = value;
            result.third.key = key;
        }
    });
    Object.entries(result).forEach(([key, value]) => {
        if (value.value == Number.NEGATIVE_INFINITY && value.key == '') {
            delete result[key];
        }
    })
    return result;
} 

export default topThreeValues;
