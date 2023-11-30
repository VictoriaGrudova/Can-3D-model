import React from 'react';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

import state from '../store';


const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/Can_model.glb');

  const logoTexture = useTexture(snap.logoDecal);
 
  const fullTexture = useTexture(snap.fullDecal);

  useFrame((state, delta) => easing.dampC(materials.Mat.color,snap.color,0.25,delta)); 

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
        <mesh
            castShadow
            geometry={nodes.Can.geometry}
            material={materials.Mat}
            material-roughness={0.3}
            dispose={null}
            scale={0.04}
        >  
        {snap.isFullTexture && (
            <Decal
                position={[0, 0, 0]}
                rotation={[0, 0, 0]}
                scale={14}
                map={fullTexture}
                bumpScale={0.1}
            />
        )}
        {snap.isLogoTexture && (
            <Decal
                position={[0, 0, 0]}
                rotation={[0, 0, 0]}
                scale={6.42}
                map={logoTexture}
                depthTest={true}
                depthWrite={true}
            />
        )}
        </mesh>
    </group>
  )
}

export default Shirt