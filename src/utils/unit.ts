const isNumerical = (val:string) => /^([0-9]+)$/gi.test(val.toString()) ;

const isPercentage = (val:string) => /([0-9]+)%$/gi.test(val);

const isPixel = (val:string) => /([0-9]+)(px|dpx)$/gi.test(val);

const isEm = (val:string) => /([0-9]+)em$/gi.test(val);

const isRem = (val:string) => /([0-9]+)rem$/gi.test(val);

const isPt = (val:string) => /([0-9]+)pt$/gi.test(val);

export { isNumerical, isPercentage, isPixel, isPt, isEm, isRem };
