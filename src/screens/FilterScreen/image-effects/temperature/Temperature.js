const GL = require("gl-react");
const React = require("react");
const PropTypes = require("prop-types");

const shaders = GL.Shaders.create({
    Temperature: {
        frag: `
      precision highp float;
      varying vec2 uv;
      uniform sampler2D t;
      uniform float temp;
      uniform vec2 resolution; 
      const float LuminancePreservationFactor = 1.0;
      const float PI2 = 6.2831853071;
      // Valid from 1000 to 40000 K (and additionally 0 for pure full white)
      vec3 colorTemperatureToRGB(const in float temperature){
        // Values from: http://blenderartists.org/forum/showthread.php?270332-OSL-Goodness&p=2268693&viewfull=1#post2268693   
        mat3 m = (temperature <= 6500.0) ? mat3(vec3(0.0, -2902.1955373783176, -8257.7997278925690),
                                              vec3(0.0, 1669.5803561666639, 2575.2827530017594),
                                              vec3(1.0, 1.3302673723350029, 1.8993753891711275)) : 
                         mat3(vec3(1745.0425298314172, 1216.6168361476490, -8257.7997278925690),
                                              vec3(-2666.3474220535695, -2173.1012343082230, 2575.2827530017594),
                                              vec3(0.55995389139931482, 0.70381203140554553, 1.8993753891711275)); 
        return mix(clamp(vec3(m[0] / (vec3(clamp(temperature, 1000.0, 40000.0)) + m[1]) + m[2]), vec3(0.0), vec3(1.0)), vec3(1.0), smoothstep(1000.0, 0.0, temperature));
      }
      void main () {
        float temperature = temp;
        float temperatureStrength = 1.0;
    
        vec3 inColor = texture2D(t, uv).xyz;    
        vec3 outColor = mix(inColor, inColor * colorTemperatureToRGB(temperature), temperatureStrength); 
        #ifdef WithQuickAndDirtyLuminancePreservation        
        outColor *= mix(1.0, dot(inColor, vec3(0.2126, 0.7152, 0.0722)) / max(dot(outColor, vec3(0.2126, 0.7152, 0.0722)), 1e-5), LuminancePreservationFactor);  
        #endif
        gl_FragColor = vec4(outColor, 1.0);
      }`
    }
});

module.exports = GL.createComponent(
    ({ children: t, temp }) => {
        if (temp < 1000) temp = 0;
        return <GL.Node
            shader={shaders.Temperature}
            uniforms={{
                t,
                temp,
            }}
        />
    },
    {
        displayName: "Temperature",
        defaultProps: {
            temp: 0,
        },
        propTypes: {
            children: PropTypes.any.isRequired,
            temp: PropTypes.number,
        }
    }
);
