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
        const result = new Array(9).fill(0);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let sum = 0;
                for (let k = 0; k < 3; k++) {
                    sum += m1[i * 3 + k] * m2[k * 3 + j];
                }
                result[i * 3 + j] = sum;
            }
        }
        return result;
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