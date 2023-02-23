import {  useGLTF, Text, Float } from "@react-three/drei"
import { OrbitControls , shaderMaterial, Center, Text3D, meshPhongMaterial} from '@react-three/drei'
import { useRef , useEffect, useState, useMemo} from "react"
import { Perf } from "r3f-perf"
import * as THREE from 'three'
import { useThree } from "@react-three/fiber"
import { Physics, RigidBody, Debug, CuboidCollider } from "@react-three/rapier";
import { Suspense } from "react"

import SoftBodyMesh from "./SoftBody/SoftBodyMesh"
import SoftBodyMaterial from "./SoftBody/SoftBodyMaterial"

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
const gtlfLoader = new GLTFLoader()

import Title from "./Title/Title.js"
import Particles from "./Particles/Particles.js"



let sphere = new THREE.SphereGeometry( 1, 60, 60 );
let knot = new THREE.TorusKnotGeometry( 1, .3, 100, 16 );

// let sceneGroup,  gltfVar
// gtlfLoader.load(
//   'birb.glb',
//   (gltf) => {
//     console.log(gltf)
//     gltfVar = gltf
//     gltf.scene.scale.set(1,1,1)
//     sceneGroup = gltf.scene
//     console.log(gltfVar)
 
//     console.log(gltfVar.scene.children[0].geometry)

    

//   }
// )



export default function Experience(){


  let birb = useRef()
  let text = useRef()
  const model = useGLTF('./birb.glb')

  console.log(text)


    return <>

      <Title/>
      <Particles/>
      <OrbitControls makeDefault enableZoom={true} maxPolarAngle={Math.PI * .5}/>
   
     <SoftBodyMesh pos={[-4, 0, 0]} geometry={sphere}></SoftBodyMesh>

     <SoftBodyMesh pos={[0, 0, 0]} geometry={model.scene.children[0].geometry}></SoftBodyMesh>
     <SoftBodyMesh pos={[4, 0, 0]} geometry={knot}></SoftBodyMesh>


     
     

    </>
}