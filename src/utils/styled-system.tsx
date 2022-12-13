import sizes from "../theme/size";
import { isNumerical } from "./unit";


export const getColor = (value: string) => {
  let color = value.replace("#", "0xff");
  return color

};


export const getFontWeight = (styles: any,object:any) =>{

  if(isNumerical(styles.fontWeight)){
    object.value = 'w'+styles.fontWeight;
  } else {
    object.value = styles.fontWeight
  }
  return object
}


export const getTextAlign = (styles: any,object:any) =>{
  object.value = styles.textAlign;
  return object
}


export const getFontFamily = (styles:any,object:any)=>{
  debugger
  object.value = styles.fontFamily;
  return object
}






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

export const getBoxConstraints = (value: string, property: string) => {
  var token: string = value;
  var resolvedTokenValue = sizes[token];

  console.log(resolvedTokenValue)
  return property.replace("_", resolvedTokenValue)
}


export const layout = {
  width: {
    property: 'width',
    scale: 'sizes',
  },
  w: {
    property: 'width',
    scale: 'sizes',
  },
  height: {
    property: 'height',
    scale: 'sizes',
  },
  h: {
    property: 'height',
    scale: 'sizes',
  },
  minWidth: {
    property: 'minWidth',
    scale: 'sizes',
  },
  minW: {
    property: 'minWidth',
    scale: 'sizes',
  },
  minHeight: {
    property: 'minHeight',
    scale: 'sizes',
  },
  minH: {
    property: 'minHeight',
    scale: 'sizes',
  },
  maxWidth: {
    property: 'maxWidth',
    scale: 'sizes',
  },
  maxW: {
    property: 'maxWidth',
    scale: 'sizes',
  },
  maxHeight: {
    property: 'maxHeight',
    scale: 'sizes',
  },
  maxH: {
    property: 'maxHeight',
    scale: 'sizes',
  },
  size: {
    property: 'BoxConstraints(minHeight: _, minWidth: _)',
    scale: 'sizes',
    transformer: getBoxConstraints
  },
  boxSize: {
    properties: ['width', 'height'],
    scale: 'sizes',
  },
  overflow: true,
  overflowX: true,
  overflowY: true,
  display: true,
  verticalAlign: true,
  textAlign: true,
} as const;

