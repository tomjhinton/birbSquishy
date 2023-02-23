import { Suspense, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import  {SoftBodyMaterial}  from "./SoftBodyMaterial";
import * as THREE from 'three'
import gsap from "gsap";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'

const SoftBodyMesh = ({ geometry, pos, gltf }) => {
  const meshRef = useRef();
  const { camera } = useThree();
  const [mousePosition, setMousePosition] = useState([0, 0, 0]);
  const [squishStrength, setSquishStrength] = useState(0);

  // const SoftBodyMaterial = shaderMaterial(
  //   {
  //     uTime: 0,
  //     uSquishStrength: 0,
  //     uMousePosition: [0, 0, 0],
  //     u_progress: 0,
  //     lightDirection:  new THREE.Vector3(0.0, 0.0, 3.0).normalize() 
  //   },
  //   vertexShader,
  //   fragmentShader
  // );
  
  // extend({ SoftBodyMaterial });

  const softBodyMaterial = useRef()

  let running = false;

	let finished = function () {
		running = false;
	};

  useFrame(() => {
    // Update the time uniform
    meshRef.current.material.uniforms.uTime.value += 0.01;

    // Update the mouse position uniform
    // const mouse3D = new THREE.Vector3(
    //   (mousePosition[0] / window.innerWidth) * 2 - 1,
    //   (-mousePosition[1] / window.innerHeight) * 2 + 1,
    //   0.5
    // ).unproject(camera);
    // meshRef.current.material.uniforms.uMousePosition.value = mouse3D;
  });

  const handleMouseDown = (event) => {
    console.log(event)
    // Update the squish strength
    if(!running){
      running = true
    meshRef.current.material.uniforms.uMousePosition.value = event.point;
    gsap.to(meshRef.current.material.uniforms.u_progress, {
      duration: 6.5,
      value: meshRef.current.material.uniforms.u_progress.value + (Math.PI * 2.),
      delay: 0,
      onComplete: finished
    });
  }

    // Update the mouse position
    setMousePosition([event.clientX, event.clientY]);
  };

  const handleMouseUp = () => {
    // Reset the squish strength
    setSquishStrength(0);
  };

  function LightPositionUpdater() {
    const { scene } = useThree();

    useFrame(() => {
      // Get the position of the first directional light in the scene
      const light = scene.getObjectByProperty('type', 'DirectionalLight');
      if (light) {
        meshRef.current.material.uniforms.lightDirection.value.copy(light.position);
      }
    });

    return null;
  }

  return (
    <>
          <LightPositionUpdater />

 
    <mesh
      ref={meshRef}
      onClick={handleMouseDown}
      onPointerUp={handleMouseUp}
      onPointerOver={ ()=>  document.body.style.cursor = 'pointer'}
      onPointerLeave={ ()=>  document.body.style.cursor = 'auto'}
      position={pos}
    >
       <softBodyMaterial side={THREE.DoubleSide}  uSquishStrength={0} />
      {/* <SoftBodyMaterial uSquishStrength={squishStrength} /> */}
      {/* <meshBasicMaterial/> */}
      <bufferGeometry {...geometry} />
    </mesh>


    {gltf &&  <primitive object={model.scene}>
    <softBodyMaterial side={THREE.DoubleSide}  uSquishStrength={squishStrength} />


    </primitive>}

          <LightPositionUpdater />
</>
  );
};

export default SoftBodyMesh;
