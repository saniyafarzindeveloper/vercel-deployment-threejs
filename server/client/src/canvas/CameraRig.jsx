import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import state from "../store";
import { useRef } from "react";

export default function CameraRig({ children }) {
  const group = useRef();
  const snap = useSnapshot(state);

  //allows to execute code on every rendered frame
  useFrame((state, delta) => {
    //shirt size for diff screen sizes
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    //setting initial position
    let targetPosition = [-0.4, 0, 2];

    //repositioning model(shirt)
    if(snap.intro){
      if(isBreakpoint) targetPosition = [0,0,2];
      if(isMobile) targetPosition = [0, 0.2, 2.5];
    } else{
      if(isMobile) targetPosition = [0, 0, 2.5]
      else targetPosition = [0, 0, 2]
    }

    //setting camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    //set the model rotation
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0], //x,y,z axes
      0.25,
      delta
    );
  });

  return <group ref={group}>{children}</group>;
}
