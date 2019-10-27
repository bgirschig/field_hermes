import * as THREE from 'three';
import GameObject from '@/js/gameEngine/GameObject';

const textureLoader = new THREE.TextureLoader();
const textures = [
  textureLoader.load(require('@/resources/stars/1.png')),
  textureLoader.load(require('@/resources/stars/2.png')),
  textureLoader.load(require('@/resources/stars/3.png')),
  textureLoader.load(require('@/resources/stars/4.png')),
  textureLoader.load(require('@/resources/stars/5.png')),
  textureLoader.load(require('@/resources/stars/6.png')),
];

/** Hermes planet */
export default class Stars extends GameObject {
  /**
   * Constructs a star field object
   * @param {Number} count
   * @param {THREE.Color} color
   * @param {Number} spread
   */
  constructor(count, color, spread = 100) {
    super();

    // /////////////////////////////////////////////////////////////////////////
    const pointDimensions = 3;
    const countPerTexture = Math.ceil(count / textures.length);

    textures.forEach(textureItem => {
      // Create vertices
      const valueCount = countPerTexture * pointDimensions;
      const vertices = new Float32Array(valueCount);
      for ( let i = 0; i < valueCount; i += 3 ) {
        vertices[i + 0] = THREE.Math.randFloatSpread( spread );
        vertices[i + 1] = THREE.Math.randFloatSpread( spread );
        vertices[i + 2] = THREE.Math.randFloatSpread( spread );
      }

      // Add vertices to a geometry
      const geometry = new THREE.BufferGeometry();
      geometry.addAttribute('position', new THREE.BufferAttribute(vertices, pointDimensions));

      // Create material
      const material = new THREE.PointsMaterial({
        color: color || 0xFFFFFF,
        size: .8,
        map: textureItem,
        alphaTest: 0.5,
      });

      // Merge geometry and material into a mesh, add the mesh to the group
      const stars = new THREE.Points(geometry, material);
      this.add(stars);
    });
  }
}
