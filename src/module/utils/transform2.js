import Vector2 from "./Vector2.js";

class Transform2 {

    /**
     * @returns {number[]}
     * @description Create an identity matrix
     */
    static identity() {
        return [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ];
    }

    /**
     * @param {number} width 
     * @param {number} height 
     * @returns {number[]}
     * @description Create M, a projection matrix
     * 
     * ```P' = M * P```
     * 
     * that is do:
     * - convert the position from pixel to clip space (-1, +1)
     * - flip the Y coordinate because WebGL considers positive Y as up and negative Y as down
     */
    static projection(width, height) {
        return [
            2 / width, 0, 0,
            0, -2 / height, 0,
            -1, 1, 1
        ];
    }

    /**
     * @param {number} tx 
     * @param {number} ty 
     * @returns {number[]}
     * @description Create a translation matrix
     */
    static translation(tx, ty) {
        return [
            1, 0, 0,
            0, 1, 0,
            tx, ty, 1
        ];
    }

    /**
     * 
     * @param {number} angleInRadians
     * @returns {number[]}
     * @description Create a rotation matrix
     */
    static rotation(angleInRadians) {
        var c = Math.cos(angleInRadians);
        var s = Math.sin(angleInRadians);
        return [
            c, -s, 0,
            s, c, 0,
            0, 0, 1
        ];
    }

    /**
     * @param {number} sx 
     * @param {number} sy 
     * @returns {number[]}
     * @description Create a scaling matrix
     */
    static scaling(sx, sy) {
        return [
            sx, 0, 0,
            0, sy, 0,
            0, 0, 1
        ];
    }

    /**
     * @param {number} shx in radians
     * @returns {number[]}
     * @description Create a shear X matrix
     */
    static shear(shx) {
        if (shx === 0) return Transform2.identity();
        shx = 1 / Math.tan(shx);
        return [
            1, shx, 0,
            0, 1, 0,
            0, 0, 1
        ];
    }


    /**
     * @param {number[]} m1 
     * @param {number[]} m2 
     * @returns {number[]}
     * @description Multiply two matrices
     */
    static multiply(m1, m2) {
        var a00 = m1[0 * 3 + 0];
        var a01 = m1[0 * 3 + 1];
        var a02 = m1[0 * 3 + 2];
        var a10 = m1[1 * 3 + 0];
        var a11 = m1[1 * 3 + 1];
        var a12 = m1[1 * 3 + 2];
        var a20 = m1[2 * 3 + 0];
        var a21 = m1[2 * 3 + 1];
        var a22 = m1[2 * 3 + 2];
        var b00 = m2[0 * 3 + 0];
        var b01 = m2[0 * 3 + 1];
        var b02 = m2[0 * 3 + 2];
        var b10 = m2[1 * 3 + 0];
        var b11 = m2[1 * 3 + 1];
        var b12 = m2[1 * 3 + 2];
        var b20 = m2[2 * 3 + 0];
        var b21 = m2[2 * 3 + 1];
        var b22 = m2[2 * 3 + 2];
        return [
        b00 * a00 + b01 * a10 + b02 * a20,
        b00 * a01 + b01 * a11 + b02 * a21,
        b00 * a02 + b01 * a12 + b02 * a22,
        b10 * a00 + b11 * a10 + b12 * a20,
        b10 * a01 + b11 * a11 + b12 * a21,
        b10 * a02 + b11 * a12 + b12 * a22,
        b20 * a00 + b21 * a10 + b22 * a20,
        b20 * a01 + b21 * a11 + b22 * a21,
        b20 * a02 + b21 * a12 + b22 * a22,
        ];
    }

    static translate(matrix, tx, ty) {
        return Transform2.multiply(matrix, Transform2.translation(tx, ty));
    }

    static rotate(matrix, angleInRadians) {
        return Transform2.multiply(matrix, Transform2.rotation(angleInRadians));
    }

    static scale(matrix, sx, sy) {
        return Transform2.multiply(matrix, Transform2.scaling(sx, sy));
    }

    static shearing(matrix, shx) {
        return Transform2.multiply(matrix, Transform2.shear(shx));
    }

    static degreeToRadian(degree) {
        return degree * Math.PI / 180;
    }

    static general(
        width, height,
        tx, ty,
        angleInRadians,
        sx, sy,
        sh
    ) {

        var matrix
        matrix = Transform2.projection(width, height);
        matrix = Transform2.translate(matrix, tx, ty);
        matrix = Transform2.rotate(matrix, angleInRadians);
        matrix = Transform2.scale(matrix, sx, sy);
        matrix = Transform2.shearing(matrix, sh);

        return matrix;
    }
}

export default Transform2;
/* 
TODO:
<script id="vertex-shader-2d" type="x-shader/x-vertex">
attribute vec2 a_position;
 
uniform mat3 u_matrix;
 
void main() {
  // Multiply the position by the matrix.
  gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);
}
</script>
*/