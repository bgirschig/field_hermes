import '@/style/colors.css';
import '@/style/layout.css';
import * as theme from '@/style/theme';
import * as THREE from 'three';
import bichromicMaterial from '@/materials/bichromicMaterial';
import textureSrc from '@/resources/albedo_sharp_small.png';

const textureLoader = new THREE.TextureLoader();

let camera;
let scene;
let renderer;
let geometry;
let material;
let mesh;
let light;

/** Main app method. everything starts from here */
function main() {
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
  camera.position.setZ(3);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(theme.background);

  geometry = new THREE.SphereGeometry( 1, 50, 50 );
  material = bichromicMaterial({
    map: textureLoader.load(textureSrc),
    color1: new THREE.Color(theme.foreground),
    color2: new THREE.Color(theme.background),
  });
  mesh = new THREE.Mesh( geometry, material );
  mesh.position.setY(-1.1);

  scene.add( mesh );

  light = new THREE.AmbientLight('white', 1);
  scene.add( light );

  renderer = new THREE.WebGLRenderer( {antialias: true} );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  loop();
}

/** Update function, called just before the render, on each frame */
function update() {
  mesh.rotation.x += 0.001;
}

/** loop, called every frame */
function loop() {
  requestAnimationFrame( loop );
  update();
  renderer.render( scene, camera );
}

main();
