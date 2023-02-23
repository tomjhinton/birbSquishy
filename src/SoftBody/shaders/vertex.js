export default /* glsl */ `
varying vec2 vUv;
uniform float uTime;
uniform float u_progress;
uniform vec3 uMousePosition;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec3 pos;


void coswarp(inout vec3 trip, float warpsScale ){

    trip.xyz += warpsScale * .1 * sin(3. * trip.yzx + (uTime * .15));
    trip.xyz += warpsScale * .05 * sin(11. * trip.yzx + (uTime * .15));
    trip.xyz += warpsScale * .025 * sin(17. * trip.yzx + (uTime * .15));
    
  }  

  

void main()
{
  vPosition = position;

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  float distance = length(uMousePosition - modelPosition.xyz);
  float squishFactor = smoothstep(0.0, 1., 1.0 - distance);
  modelPosition.z -= squishFactor *( (sin(u_progress) +1.) * .5);

  // vPosition += (uMousePosition - position) * squishFactor * (((sin(u_progress) + 1.0) * 0.5) * 4.);


  vec4 viewPosition = viewMatrix * modelPosition;
vec4 projectionPosition = projectionMatrix * viewPosition;

gl_Position = projectionPosition;

    vUv = uv;
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    vNormal = normalize(normalMatrix * normal);
    pos = modelPosition.xyz;
}`


// vec4 modelPosition = modelMatrix * vec4(position, 1.0);
// coswarp(modelPosition.xyz, 1.);
// vec4 viewPosition = viewMatrix * modelPosition;
// vec4 projectionPosition = projectionMatrix * viewPosition;

// gl_Position = projectionPosition;
