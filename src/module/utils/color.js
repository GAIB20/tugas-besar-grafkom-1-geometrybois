"use strict";

class Color  {
    // Scale 0..1
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    getHexRepresentation(){
        return Color.rgbToHex(this.r,this.g, this.b);
    }

    // the RGB values input are within the valid range [0, 1]
    static rgbToHex(r,g,b){
        r = Math.max(0, Math.min(1, r)) *255;
        g = Math.max(0, Math.min(1, g)) * 255;
        b = Math.max(0, Math.min(1, b)) * 255;
    
        // Convert the RGB values to hexadecimal format
        var hexR = r.toString(16).padStart(2, '0');
        var hexG = g.toString(16).padStart(2, '0');
        var hexB = b.toString(16).padStart(2, '0');
    
        // Concatenate the hexadecimal values to form the hex color code
        var hexColor = '#' + hexR + hexG + hexB;
        
        return hexColor.toUpperCase(); // Optionally, convert to uppercase
    }

    static hexToRgba(hex, alpha) {
        // Remove the # character if it's included
        hex = hex.replace('#', '');
    
        // Parse the hex values to rgb in scale 0..1
        var r = parseInt(hex.substring(0, 2), 16)/255;
        var g = parseInt(hex.substring(2, 4), 16)/255;
        var b = parseInt(hex.substring(4, 6), 16)/255;
    
        // Ensure alpha is in the range [0, 1]
        alpha = alpha || 1;
        alpha = Math.min(Math.max(0, alpha), 1);
    
        // Return the RGBA value
        return {r:r, g:g, b:b, a:alpha};
    }
    
}

export default Color;