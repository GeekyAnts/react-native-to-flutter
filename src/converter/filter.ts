/////////////////////////////////////////////////////////
//
//	Filter Func
//

import { border, borderRadius, color, flexbox,  space } from "../utils/styled-system";

/////////////////////////////////////////////////////////
const isText = (key:any) => {
  if (key.indexOf("font") === 0) {
    return true;
  } else if (key.indexOf("text-") === 0) {
    return true;
  } else if (key === "color" || key === "letter-spacing") {
    return true;
  } else {
    return false;
  }
};

const isDecoration = (key:any) => {
 
  if (
    key === "backgroundImage" ||
    key === "backgroundColor" ||
    key === "border" ||
    key === "boxShadow"
  ) {
    return true;

  } else if (key.indexOf("border") >= 0) {
    return true;
  } else {
    return false;
  }
};

const isPositioned = ({ key, val, decls }:any) => {
  const position = decls.getVal("position");
  const hasPosition = position === "absolute" || position === "fixed";

  const isTLRBAttr =
    hasPosition &&
    (key === "top" || key === "left" || key === "right" || key === "bottom");
  const isPositionAttr =
    key === "position" && (val === "absolute" || val === "fixed");

  if (isTLRBAttr || isPositionAttr) {
    return true;
  }
  return false;
};

const isOpacity = ({ key }:any) => {
  if (key === "opacity") return true;
  return false;
};

const isFlex = ({ key, val }:any) => {
  if (/^flex/.test(key)) return true;
  if (key === "display" && /flex/gi.test(val)) return true;
  if (key === "justify-content" || key === "align-items") return true;
  return false;
};

const isCenter = ({ key, val, decls }:any) => {
  if (isFlex({ key, val, decls })) {
    const alignItems = decls.getVal("align-items");
    const justifyContent = decls.getVal("justify-content");
    if (alignItems === "center" && justifyContent === "center") return true;
  }
  return false;
};

const isRow = ({ key, val, decls }:any) => {
  if (isFlex({ key, val, decls })) {
    const direction = decls.getVal("flex-direction", "row");
    if (direction === "row") return true;
  }
  return false;
};

const isColumn = ({ key, val, decls }:any) => {
  if (isFlex({ key, val, decls })) {
    const direction = decls.getVal("flex-direction", "row");
    if (direction === "column") return true;
  }
  return false;
};

const isTransform = ({ key, }:any) => {
  if (key && /transform$/gi.test(key)) return true;
  return false;
};


const isBorderRadius = ({key}:any) =>{
  
  if(borderRadius.hasOwnProperty(key)) return true;
  return false;
}

const isAlignment = ({key}:any)=>{
  if(flexbox.hasOwnProperty(key)) return true;
  return false;
}

const isSpace = ({key}:any) =>{
  if(space.hasOwnProperty(key)) return true;
  return false;
}

const isColor = ({key}:any)=>{
  if(color.hasOwnProperty(key)) return true;
  return false;
}

const isBorder = ({key}:any)=>{
 
  if(border.hasOwnProperty(key)) return true;
  return false;
}



export {
  isText,
  isDecoration,
  isPositioned,
  isOpacity,
  isTransform,
  isFlex,
  isColumn,
  isCenter,
  isRow,
  isBorderRadius,
  isAlignment,
  isSpace,
  isColor,
  isBorder,
  
};
