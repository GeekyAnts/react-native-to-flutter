import { dartType } from "../config/layout-props";



export const getPositioned = (styles: any, object: any, ast?: any) => {

  object.properties = [];
  if (styles.hasOwnProperty("position")) {
    if (styles["position"] === "absolute") {
      console.log(object);
      console.log(ast);
      ast["namedProp"] = "child";

      delete object.namedProp;

      if (styles.top) {
        let top: any = dartType.double;


        top = { ...top, "namedProp": "top", value: styles.top };
        object.properties.push(top);

      }
      if (styles.bottom) {
        let bottom: any = dartType.double;
        bottom = { ...bottom, "namedProp": "bottom", value: styles.bottom };
        object.properties.push(bottom);

      }

      if (styles.left) {
        let left: any = dartType.double;

        left = { ...left, "namedProp": "left", value: styles.left };
        object.properties.push(left);

      }
      if (styles.right) {
        let right: any = dartType.double;


        right = { ...right, "namedProp": "right", value: styles.right };
        object.properties.push(right);

      }
      object.properties.push(ast);
      return { nested: true, object };
    }
  } else {
    return object;
  }
};
