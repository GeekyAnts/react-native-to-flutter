

export const getColor = (value: string) => {
  let color = value.replace("#", "0xff");
  return color

};


export const toDouble = (value: any) => {

  return parseFloat(value).toFixed(1)
}

export const toInt = (value: any) => {
  if(typeof value === "string"){
    if (value.indexOf("#") === 0) {
      value = value.replace("#", "0xff");
      return value
    }
  } else if(typeof value === "number"){
    return value;
  }
  
  return parseInt(value);

}







