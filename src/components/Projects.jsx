import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "Uni Management System",
    url: "https://github.com/RohanSoni-02/UniversityManagementSystem",
    image: "projects/uni.png",
    description: "Use React Three Fiber to create a 3D game",
  },
  {
    title: "ChatBot App",
    url: "https://github.com/RohanSoni-02/Chat-Bot-Kotlin-app",
    image: "projects/chat.png",
    description: "Use commands to search on the web, launch gallery, play a game, solve basic arithmetic problems, tell a joke, date and time.",
  },
  {
    title: "AquaVision",
    url: "https://github.com/RohanSoni-02/fish-detection-and-tracking",
    image: "projects/aqua.png",
    description: "Analyze videos with statistical insights using a machine-learning model for fish detection and tracking",
  },
  {
    title: "CyberPython",
    url: "https://github.com/RohanSoni-02/CyberPython",
    image: "projects/snake.png",
    description: "A cybernetic snake's journey through a grid-based world, attempting to eat as many apples as possible on the map.",
  },
  {
    title: "Swin Adventure",
    url: "https://github.com/RohanSoni-02/SwinAdventureGUI",
    image: "projects/swin.png",
    description: "Game allows players to exist within a location/room within the world, the player can move between locations using path",
  },
  {
    title: "Music Player",
    url: "https://github.com/RohanSoni-02/Custom-Music-player",
    image: "projects/music.png",
    description: "Music player with albums allowing play, pause, shuffle, next and previous song.",
  },
  {
    title: "Shape Drawer",
    url: "https://github.com/RohanSoni-02/ShapeDrawer",
    image: "projects/music.png",
    description: "Uses Inheritance and Polymorphism to draw different shapes. Each of the shape class has its own custom drawing implmentation",
  },
  {
    title: "Music Player",
    url: "https://github.com/RohanSoni-02/Custom-Music-player",
    image: "projects/music.png",
    description: "Music player with albums allowing play, pause, shuffle, next and previous song.",
  },
  {
    title: "Music Player",
    url: "https://github.com/RohanSoni-02/Custom-Music-player",
    image: "projects/music.png",
    description: "Music player with albums allowing play, pause, shuffle, next and previous song.",
  },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.16}
        position={[-1, -0.4, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        position={[-1, -0.6, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 2.5,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
