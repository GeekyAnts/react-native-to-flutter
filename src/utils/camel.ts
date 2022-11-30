export const toCamel = (val:any) => {
  let re = /-(\w)/g;
  return val.replace(re, function ($1:any) {
    return $1.toUpperCase();
  });
};


