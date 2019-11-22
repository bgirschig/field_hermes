import * as camera from '@/js/utils/camera';

// references
/** @type {HTMLVideoElement} */
let video;
/** @type {HTMLCanvasElement} */
let mainCanvas;
/** @type {HTMLCanvasElement} */
let maskCanvas;
/** @type {CanvasRenderingContext2D} */
let maskCtx;
/** @type {CanvasRenderingContext2D} */
let mainCtx;
/** @type {HTMLDivElement} */
let cursor;

// state
let mouseDown = false;

// config
const brushRadius = 30;

async function init() {
  mainCanvas = document.querySelector('canvas');
  maskCanvas = document.createElement('canvas');
  cursor = document.querySelector('.cursor');

  // initialize camera
  const cameraInfo = await camera.init();
  video = cameraInfo.video;
  // initialize main canvas
  mainCanvas.width = video.videoWidth;
  mainCanvas.height = video.videoHeight;
  mainCtx = mainCanvas.getContext('2d');
  mainCtx.globalCompositeOperation = 'multiply';
  // initialize mask canvas
  maskCanvas.width = video.videoWidth;
  maskCanvas.height = video.videoHeight;
  maskCtx = maskCanvas.getContext('2d');
  maskCtx.fillStyle = '#444444';
  maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);

  // initialize event
  window.addEventListener('mousedown', () => mouseDown = true);
  window.addEventListener('mouseup', () => mouseDown = false);
  window.addEventListener('mousemove', onMouseMove);

  // start
  loop();
}

function onMouseMove(e) {
  if (mouseDown) {
    maskCtx.beginPath();
    maskCtx.ellipse(e.clientX, e.clientY, brushRadius, brushRadius, 0, 0, Math.PI*2);
    maskCtx.fillStyle = 'white';
    maskCtx.fill();
  }

  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
}

function loop() {
  requestAnimationFrame(loop);

  mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  mainCtx.drawImage(video, 0, 0);
  mainCtx.drawImage(maskCanvas, 0, 0);
}

init();

