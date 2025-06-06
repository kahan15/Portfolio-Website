
import { Canvas } from "@react-three/fiber";
import { useRef, Suspense } from "react";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";

import { Plane, MeshWobbleMaterial } from "@react-three/drei";



function Blob({ position = [0, 0, 0], color = "#6366f1" }: { position?: [number, number, number], color?: string }) {
  const blobRef = useRef(null);

  return (
    <mesh position={position} ref={blobRef}>
      <Sphere args={[1, 64, 64]} castShadow>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </mesh>
  );
}

// export function ThreeScene() {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 1, delay: 0.5 }}
//       className="absolute inset-0 -z-10"
//     >
//       <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[10, 10, 5]} intensity={1} />
//         <Suspense fallback={null}>
//           <Blob position={[2, 0, 0]} color="#6366f1" />
//           <Blob position={[-2, 0, 1]} color="#8b5cf6" />
//           <Blob position={[0, -2, -1]} color="#3b82f6" />
//         </Suspense>
//         <OrbitControls
//           enableZoom={false}
//           enablePan={false}
//           autoRotate
//           autoRotateSpeed={0.5}
//         />
//       </Canvas>
//     </motion.div>
//   );
// }

export function ThreeScene() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="absolute inset-0 -z-10"
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <Suspense fallback={null}>
          <Plane args={[10, 10, 32, 32]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <MeshWobbleMaterial
              attach="material"
              color="#6366f1"
              factor={0.5}
              speed={0.5}
              transparent
              opacity={0.2}
            />
          </Plane>
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </motion.div>
  );
}

export function ParticleField() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Particles count={300} />
        </Suspense>
      </Canvas>
      
    </div>
  );
}

function Particles({ count = 150 }) {
  const pointsRef = useRef();
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={new Float32Array(count * 3).map(() => (Math.random() - 0.5) * 10)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#8b5cf6" sizeAttenuation transparent />
    </points>
  );
}




