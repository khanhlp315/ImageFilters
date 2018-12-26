const GL = require("gl-react");
const React = require("react");
import PropTypes from 'prop-types';

const shaders = GL.Shaders.create({
    blur1D: {
// blur9: from https://github.com/Jam3/glsl-fast-gaussian-blur
        frag: `precision highp float;
varying vec2 uv;
uniform sampler2D t;
uniform vec2 direction, resolution;
vec4 blur9(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
  vec4 color = vec4(0.0);
  vec2 off1 = vec2(1.3846153846) * direction;
  vec2 off2 = vec2(3.2307692308) * direction;
  color += texture2D(image, uv) * 0.2270270270;
  color += texture2D(image, uv + (off1 / resolution)) * 0.3162162162;
  color += texture2D(image, uv - (off1 / resolution)) * 0.3162162162;
  color += texture2D(image, uv + (off2 / resolution)) * 0.0702702703;
  color += texture2D(image, uv - (off2 / resolution)) * 0.0702702703;
  return color;
}
void main () {
  gl_FragColor = blur9(t, uv, resolution, direction);
}`
    }
});

module.exports = GL.createComponent(
    ({ width, height, pixelRatio, direction, children: t }) =>
        <GL.Node
            shader={shaders.blur1D}
            width={width}
            height={height}
            pixelRatio={pixelRatio}
            uniforms={{
                direction,
                resolution: [ width, height ],
                t
            }}
        />,
    {
        displayName: "Blur1D",
        propTypes: {
            direction: PropTypes.array.isRequired,
            children: PropTypes.any.isRequired
        }
    });
