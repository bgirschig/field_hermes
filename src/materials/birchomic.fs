varying vec2 vUv;
uniform sampler2D map;
uniform vec3 color1;
uniform vec3 color2;

void main() {
  vec2 texcoord = vec2(0.0, 0.0);
  vec3 color = texture2D( map, vUv ).rgb;
  gl_FragColor.rgb = color * color1 + (1.0-color) * color2;
}