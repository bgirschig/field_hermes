varying vec2 vUv;
uniform sampler2D map;
uniform vec3 color1;
uniform vec3 color2;

void main() {
  vec2 texcoord = vec2(0.0, 0.0);
  vec3 mapValue = texture2D( map, vUv ).rgb;
  float luminance = 0.299*mapValue.r + 0.587*mapValue.g + 0.114*mapValue.b;
  float mask = step(luminance, 0.5);
  gl_FragColor.rgb = mask * color1 + (1.0-mask) * color2;
}