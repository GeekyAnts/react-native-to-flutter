import { styleSystem } from "./config";

export function addProperty(myObject: any, val: any, prop: any, style: any, ast: any) {
  let newProp: any;
  if (styleSystem.hasOwnProperty(prop)) {
    if (myObject.type === "constructor" || myObject.type === "enum") {
     
      newProp = { ...styleSystem[prop].class, namedProp: styleSystem[prop].property };
      if (typeof newProp.value === "object") {
        newProp.value = { ...newProp.value, value: val };
      } else {
        if(newProp.hasOwnProperty("value")){
          newProp.value = val;
        }
       
      }


      if (styleSystem[prop].transformer) {

        // newProp.properties = []
        newProp = styleSystem[prop].transformer(style, newProp, ast);

        if (newProp.nested) {
          return newProp;
        }
      }




    } else {

      newProp = { ...myObject, value: val, namedProp: styleSystem[prop].property };
    }
  }

  if (newProp.class !== myObject.class) {
    if (styleSystem[prop].hasOwnProperty("partOf")) {

      let index = myObject["properties"].findIndex((data: any) => {
        return data.namedProp === newProp.namedProp;

      });

      if (index < 0) {
        myObject = { ...myObject, properties: myObject.properties };
        myObject.properties.push(newProp);
      }
    } else {
      myObject = newProp;
    }

  } else {
    myObject = newProp;
  }


  return myObject;
}
