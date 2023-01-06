

export const getColor = (value: string) => {
  let color = value.replace("#", "0xff");
  return color

};


export const toDouble = (value: any) => {

  return parseFloat(value).toFixed(1)
}

export const toInt = (value: any) => {

  if (value.indexOf("#") === 0) {
    value = value.replace("#", "0xff");
    return value
  }
  return parseInt(value);

}







