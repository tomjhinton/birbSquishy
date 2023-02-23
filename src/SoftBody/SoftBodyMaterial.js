
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from 'three'
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'


const SoftBodyMaterial = shaderMaterial(
    {
      uTime: 0,
      uSquishStrength: 0,
      uMousePosition: [0, 0, 0],
      u_progress: 0,
      lightDirection:  new THREE.Vector3(0.0, 0.0, 3.0).normalize() 
    },
    vertexShader,
    fragmentShader
  );
  
  extend({ SoftBodyMaterial });

  export { SoftBodyMaterial}