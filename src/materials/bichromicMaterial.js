import {ShaderMaterial, Color, Uniform} from 'three';
import vertexShader from './default.vs';
import fragmentShader from './birchomic.fs';

/**
 * Creates a new birchomic material instance
 * @param {THREE.Texture} map
 * @return {ShaderMaterial}
 */
export default function({map, color1, color2}) {
  return new ShaderMaterial({
    uniforms: {
      map: {type: 't', value: map},
      color1: new Uniform(new Color(color1)),
      color2: new Uniform(new Color(color2)),
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  });
}
