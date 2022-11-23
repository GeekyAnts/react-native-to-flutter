import radii from "./radius";
import { colors } from "./colors";
import { spacing } from "./space";
import {opacity} from "./opacity";
import { sizes } from "./size";
import { typography } from "./typography";
import borderWidths from "./borders";

const theme:any = {
      radii,
      colors,
      spacing,
      opacity,
      sizes,
      borderWidths,
      ...typography
      
};

export  default theme;