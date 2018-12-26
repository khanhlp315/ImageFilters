import GL from 'gl-react'
import React from 'react'
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'

const shaders = GL.Shaders.create({
    F1977: {
        frag: `
      precision highp float;
      varying vec2 uv;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      void main () {
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        texel = vec3(
                    texture2D(inputImageTexture2, vec2(texel.r, .16666)).r,
                    texture2D(inputImageTexture2, vec2(texel.g, .5)).g,
                    texture2D(inputImageTexture2, vec2(texel.b, .83333)).b);
        gl_FragColor = vec4(texel, 1.0);
      }`
    }
});

module.exports = GL.createComponent(
    ({ children: inputImageTexture }) => {
        return <GL.Node
            shader={shaders.F1977}
            uniforms={{
                inputImageTexture,
                inputImageTexture2: resolveAssetSource(require('./resources/1977map.png'))
            }}
        />
    },
    {
        displayName: "F1977"
    }
);
