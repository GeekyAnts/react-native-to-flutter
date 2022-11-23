import toFunit from "./unit";
import Color from "color";

const toFBorderRadius = (val: any,) => {
 debugger;
 val = val["borderRadius"]
    let tl = val["borderTopLeftRadius"] ?? val["borderTopRadius"] ?? val["borderRadius"];
    let tr = val["borderTopRightRadius"] ?? val["borderTopRadius"] ?? val["borderRadius"];
    let br = val["borderBottomRightRadius"] ?? val["borderBottomRadius"] ?? val["borderRadius"]
    let bl = val["borderBottomLeftRadius"] ?? val["borderBottomRadius"] ?? val["borderRadius"]

    if (tl === tr && tr === br && br === bl) {
        if (tl === "50%") {
            return `BoxShape.circle`;
        } else {
            return `BorderRadius.all(const Radius.circular(${toFunit(tl)}))`;
        }
    } else {
        let tl = toFunit(val[0]);
        let tr = toFunit(val[1]);
        let br = toFunit(val[2]);
        let bl = toFunit(val[3]);

        tl = `topLeft: Radius.circular(${tl})`;
        tr = `topRight: Radius.circular(${tr})`;
        br = `bottomRight: Radius.circular(${br})`;
        bl = `bottomLeft: Radius.circular(${bl})`;

        return `BorderRadius.only(${tl}, ${tr}, ${br}, ${bl})`;
    }
}


const toFAlignment = (val: any) => {
    let v = val["alignItems"];
    return `Alignment.${v}`
}

const toFMarginPadding = (val: any) => {

    let top = val["py"] ?? val["my"];
    let right = val["px"] ?? val["mx"];
    let bottom = val["py"] ?? val["my"];
    let left = val["px"] ?? val["mx"];

    if (top === right && right === bottom && bottom === left) {
        top = toFunit(top);

        return `const EdgeInsets.all(${top})`;
    } else {
        top = toFunit(top);
        right = toFunit(right);
        bottom = toFunit(bottom);
        left = toFunit(left);

        return `const EdgeInsets.only(top: ${top}, right: ${right}, bottom: ${bottom}, left: ${left})`;
    }
};



const toFColor = (color: any, val: any, key: any) => {

    let opacity = val;
    if (key === "opacity") {
        

        val = color;
    }

    try {

        val = typeof val === "string" ? val.trim() : val;
        const c16 = Color(val)
            .hex()
            .replace(/^#/, "0xff");
        if (key === "opacity") {
            
            return `Color(${c16}).withOpacity(${opacity})`
        }
        return `Color(${c16})`;
    } catch (e) {
        const c16 = (val + "").replace(/^#/, "0x");
        return `Color(${c16}00)`;
    }
}


const toFBorder = ( styles: any, key: any) => {
   
  
    let width = styles["borderWidth"] ?? "1px"
    let color = styles["borderColor"]
    let style = styles["borderStyle"] ?? "solid"

    width = toFunit(width);

    color = toFColor(styles, color, key);
    console.log(width, color, style);
      return `BorderSide(color: ${color},width: ${width},style: BorderStyle.${style})`.trim();
};

export default toFBorder;


const toAxisAlignment = (val:any) => {
    val = val.replace(/flex-/, "");
    return `${toCamel(val)}`;
  };
  

  const toCamel = (val:any) => {
    let re = /-(\w)/g;
    return val.replace(re, function ($1:any) {
      return $1.toUpperCase();
    });
  };

export { toFBorderRadius, toFColor, toFAlignment, toFMarginPadding,toAxisAlignment }