import GameObject from '@/js/gameEngine/GameObject';
import bichromicMaterial from '@/materials/bichromicMaterial';
import planetTexture from '@/resources/albedo_sharp.png';
import * as THREE from 'three';
import * as theme from '@/style/theme';

const textureLoader = new THREE.TextureLoader();

/** Hermes planet */
export default class Planet extends GameObject {
  /** Constructs a textured planet object */
  constructor() {
    super();

    const geometry = new THREE.SphereGeometry( 1, 80, 80 );
    const material = bichromicMaterial({
      map: textureLoader.load(planetTexture),
      color1: new THREE.Color(theme.background),
      color2: new THREE.Color(theme.foreground),
    });
    this.mesh = new THREE.Mesh( geometry, material );
    this.add(this.mesh);
  }
}
