import '@/style/colors.css';
import '@/style/layout.css';
import * as theme from '@/style/theme';
import * as THREE from 'three';
import bichromicMaterial from '@/materials/bichromicMaterial';
import planetTexture from '@/resources/albedo_sharp_small.png';
import makeStarField from '@/stars';

const textureLoader = new THREE.TextureLoader();

let camera;
let scene;
let renderer;
let light;
let planet;
let starField;

/** Main app method. everything starts from here */
function main() {
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 100 );

  scene = new THREE.Scene();
  scene.background = new THREE.Color(theme.background);

  // create planet
  const geometry = new THREE.SphereGeometry( 1, 50, 50 );
  const material = bichromicMaterial({
    map: textureLoader.load(planetTexture),
    color1: new THREE.Color(theme.foreground),
    color2: new THREE.Color(theme.background),
  });
  planet = new THREE.Mesh( geometry, material );
  planet.position.setY(-1.1);
  scene.add( planet );

  // Create stars
  starField = makeStarField(1000);
  scene.add(starField);

  // Add lighting
  light = new THREE.AmbientLight('white', 1);
  scene.add( light );

  renderer = new THREE.WebGLRenderer( {antialias: true} );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  loop();
}

/** Update function, called just before the render, on each frame */
function update() {
  planet.rotation.x += 0.001;
}

/** loop, called every frame */
function loop() {
  requestAnimationFrame( loop );
  update();
  renderer.render( scene, camera );
}

main();
