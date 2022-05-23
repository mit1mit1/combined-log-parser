const topThreeValues = (object: {[key: string]: number}) => {
    const result = {
        topKeyValuePair: {keyString: '', amount: Number.NEGATIVE_INFINITY},
        secondKeyValuePair: {keyString: '', amount: Number.NEGATIVE_INFINITY},
        thirdKeyValuePair: {keyString: '', amount: Number.NEGATIVE_INFINITY},
    }
    Object.entries(object).forEach(([key, value]) => {
        if (value > result.topKeyValuePair.amount) {
            result.thirdKeyValuePair = {...result.secondKeyValuePair};
            result.secondKeyValuePair = {...result.topKeyValuePair};
            result.topKeyValuePair = {keyString: key, amount: value};
        } else if (value > result.secondKeyValuePair.amount) {
            result.thirdKeyValuePair = {...result.secondKeyValuePair};
            result.secondKeyValuePair = {keyString: key, amount: value};
        } else if (value > result.thirdKeyValuePair.amount) {
            result.thirdKeyValuePair = {keyString: key, amount: value};
        }
    });
    Object.entries(result).forEach(([key, pair]) => {
        if (pair.amount == Number.NEGATIVE_INFINITY && pair.keyString == '') {
            delete result[key];
        }
    })
    return result;
} 

export default topThreeValues;
