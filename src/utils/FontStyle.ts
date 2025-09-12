import {CSSProperties} from "react";
import {Property} from "csstype";

export const FontStyle = {
    font: getFont
}

function getFont(fontSize: Property.FontSize, fontWeight: Property.FontWeight): CSSProperties  {
    return  {
        fontSize: fontSize,
        fontWeight: fontWeight
    }
}