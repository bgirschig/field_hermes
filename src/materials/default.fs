varying vec2 vUv;
uniform sampler2D map;

void main() {
  vec2 texcoord = vec2(0.0, 0.0);
  gl_FragColor.rgb = texture2D( map, vUv ).rgb;
}