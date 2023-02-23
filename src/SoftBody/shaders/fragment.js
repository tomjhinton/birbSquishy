export default /* glsl */`uniform float uTime;

varying vec2 vUv;
uniform vec3 uMousePosition;
varying vec3 pos;
uniform float u_progress;




  
vec2 rotate2D (vec2 _st, float _angle) {
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;

}

void coswarp(inout vec3 trip, float warpsScale ){

  trip.xyz += warpsScale * .1 * sin(3. * trip.yzx + (uTime * .15));
  trip.xyz += warpsScale * .05 * sin(11. * trip.yzx + (uTime * .15));
  trip.xyz += warpsScale * .025 * sin(17. * trip.yzx + (uTime * .15));
  
}  

void uvRipple(inout vec2 uv, float intensity){

vec2 p = uv -.5;


  float cLength=length(p);

   uv= uv +(p/cLength)*cos(cLength*15.0-uTime*.5)*intensity;

} 


uniform vec3 lightDirection;

varying vec3 vNormal;
varying vec3 vWorldPosition;
void main(){


  vec2 uv = vUv;
  vec3 color = vec3(uv.x, uv.y, 1.);
  coswarp(color, 3.);
  coswarp(color, 3.);
  vec3 lightDirection = normalize(vec3(1.0, 1.0, 1.0));
  float diffuse = max(dot(normalize(vWorldPosition), lightDirection), 0.0);


  float distance = length(uMousePosition - pos);
  float squishFactor = smoothstep(0.0, 1., 1.0 - distance);
  color -= squishFactor *( (sin(u_progress) +1.) * .5) * 1.5;

  // color -= 1. -pos.z;
  gl_FragColor = vec4(color, 1. );
}`