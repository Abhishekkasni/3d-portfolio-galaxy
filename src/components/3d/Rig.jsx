import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Rig({ activeProject }) {
  return useFrame((state) => {
    const targetVec = new THREE.Vector3()
    const lookAtVec = new THREE.Vector3()

    if (activeProject) {
      // Landed: Sit on top of the huge planet crust
      targetVec.set(activeProject.position[0], activeProject.position[1] + 2, activeProject.position[2] + 6)
      lookAtVec.set(activeProject.position[0], activeProject.position[1] + 1.5, activeProject.position[2] - 20)
    } else {
      // Orbit: Move with mouse
      targetVec.set(state.mouse.x * 6, state.mouse.y * 3, 20)
      lookAtVec.set(0, 0, 0)
    }

    state.camera.position.lerp(targetVec, 0.1)
    state.camera.lookAt(lookAtVec)
  })
}