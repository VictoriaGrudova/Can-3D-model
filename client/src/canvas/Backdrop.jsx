import React, { useRef } from 'react';
import { useFrame  } from '@react-three/fiber';
import { easing } from 'maath';
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';

const Backdrop = () => {
  const shadows = useRef();
  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60} 
      alphaTest={0.85}
      scale={4}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={1.5}
        ambient={0.55}
        position={[5,5,-10]}
      />
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={1.5}
        ambient={0.75}
        position={[-5,5,-10]}
      />

    </AccumulativeShadows>
  )
}

export default Backdrop