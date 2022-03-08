export const EpsilonRound = (value: number) : number => {
    return Math.round((value + Number.EPSILON) * 100) / 100;
};

export const ToCurrency = (value: number) : string => {
    return value.toLocaleString("en-CA",{style: 'currency', currency: 'CAD'});
};