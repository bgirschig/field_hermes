import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();
const textures = [
  textureLoader.load(require('@/resources/stars/1.png')),
  textureLoader.load(require('@/resources/stars/2.png')),
  textureLoader.load(require('@/resources/stars/3.png')),
  textureLoader.load(require('@/resources/stars/4.png')),
  textureLoader.load(require('@/resources/stars/5.png')),
  textureLoader.load(require('@/resources/stars/6.png')),
];

/**
 * Creates and returns a star field
 * @param {Number} count How many stars to create
 * @param {THREE.Color} color
 * @return {THREE.Geometry}
 */
export default function createStars(count, color) {
  const pointDimensions = 3;
  const countPerTexture = Math.ceil(count / textures.length);
  const group = new THREE.Group();

  textures.forEach(textureItem => {
    // Create vertices
    const vertices = new Float32Array(count * pointDimensions);
    const valueCount = countPerTexture * pointDimensions;
    for ( let i = 0; i < valueCount; i += 3 ) {
      vertices[i + 0] = THREE.Math.randFloatSpread( 100 );
      vertices[i + 1] = THREE.Math.randFloatSpread( 100 );
      vertices[i + 2] = THREE.Math.randFloatSpread( 100 );
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
    group.add(stars);
  });

  return group;
};
