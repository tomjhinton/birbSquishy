import {  useGLTF, Text, Float } from "@react-three/drei"
import { OrbitControls , shaderMaterial, Center, Text3D, meshPhongMaterial} from '@react-three/drei'
import { useRef , useEffect, useState, useMemo} from "react"
import { Perf } from "r3f-perf"
import * as THREE from 'three'
import { useThree, extend, useFrame } from "@react-three/fiber"
import { Physics, RigidBody, Debug, CuboidCollider } from "@react-three/rapier";
import { Suspense } from "react"
import gsap from "gsap"
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'





export default function Title(){

    const TitleMaterial = shaderMaterial(
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
      
      extend({ TitleMaterial });
    



    let text = useRef()


    let running = false;

	let finished = function () {
		running = false;
	};

    const titleMaterial = useRef()
    useFrame((state, delta) => {
        titleMaterial.current.uTime += delta
    })
    

    const handleMouseDown = (event) => {
        console.log(event)
        // Update the squish strength
        if(!running){
            running = true

        text.current.material.uniforms.uMousePosition.value = event.point;
        gsap.to(text.current.material.uniforms.u_progress, {
          duration: 6.5,
          value: text.current.material.uniforms.u_progress.value + (Math.PI * 2.),
          delay: 0,
          onComplete: finished
        });
    }
    
    
      };
    

 
    return <>

<Text3D scale={2} font={'Basement Grotesque Roman_Bold (1).json'} ref={text} position={[-6,4,0]}
onPointerDown={handleMouseDown}
onPointerOver={ ()=>  document.body.style.cursor = 'pointer'}
onPointerLeave={ ()=>  document.body.style.cursor = 'auto'}
>
 Squishy?
 <titleMaterial ref={titleMaterial} side={THREE.DoubleSide} transparent/>

</Text3D>

      

     
     

    </>
}