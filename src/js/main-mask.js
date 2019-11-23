import * as camera from '@/js/utils/camera';
import SocketStubClient from '@/js/utils/socketStubClient';

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
/** @type {SocketStubClient} */
let detectorStub;

// config
let brushRadius = 30;

// state
let drawing = false;
let scalingBrush = false;
let canvasBounds = null;
let isAdding = false;
let maskOnly = false;
let mouseDownPos = null;

async function init() {
  mainCanvas = document.querySelector('canvas');
  maskCanvas = document.createElement('canvas');
  cursor = document.querySelector('.cursor');

  detectorStub = new SocketStubClient('ws://localhost:8765');
  await detectorStub.readyPromise;

  // initialize camera
  const cameraInfo = await camera.init();
  video = cameraInfo.video;
  // initialize main canvas
  mainCanvas.width = video.videoWidth;
  mainCanvas.height = video.videoHeight;
  mainCtx = mainCanvas.getContext('2d');
  // initialize mask canvas
  maskCanvas.width = video.videoWidth;
  maskCanvas.height = video.videoHeight;
  maskCtx = maskCanvas.getContext('2d');
  loadSaved();
  // initialize controls
  document.querySelectorAll('.controls button').forEach(control => {
    control.addEventListener('click', () => onControl(control.dataset.action));
  });
  // various
  canvasBounds = mainCanvas.getBoundingClientRect();

  // initialize event
  window.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mouseup', onMouseUp);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('keyup', onKey);

  // start
  loop();
}

async function loadSaved() {
  const dataURI = await detectorStub.call('getMask');
  if (dataURI) {
    const img = new Image;
    img.onload = () => {
      maskCtx.drawImage(img, 0, 0);
    };
    img.src = dataURI;
  } else {
    maskCtx.fillStyle = 'white';
    maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
  }
}

function onMouseDown(e) {
  mouseDownPos = screenToCanvas(e.clientX, e.clientY);
  if (e.altKey) {
    scalingBrush = true;
  } else {
    drawing = true;
    onMouseMove(e);
  }
}

function onMouseUp(e) {
  drawing = false;
  scalingBrush = false;
}

function onMouseMove(e) {
  const position = screenToCanvas(e.clientX, e.clientY);
  if (drawing) {
    maskCtx.beginPath();
    maskCtx.ellipse(position.x, position.y, brushRadius, brushRadius, 0, 0, Math.PI*2);
    maskCtx.fillStyle = isAdding ? 'white' : 'black';
    maskCtx.fill();
  }

  if (scalingBrush) {
    const dist = Math.sqrt((position.x - mouseDownPos.x) ** 2 + (position.y - mouseDownPos.y) ** 2);
    brushRadius = dist;
    cursor.style.width = `${brushRadius*2}px`;
    cursor.style.height = `${brushRadius*2}px`;
    cursor.style.transform = `
      translate(${mouseDownPos.screenX}px, ${mouseDownPos.screenY}px)
      translate(-50%, -50%)`;
  } else {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  }
}

function onKey(e) {
  if (e.key === 'x') isAdding = !isAdding;
  if (e.key === 'm') maskOnly = !maskOnly;
}

function onControl(action) {
  switch (action) {
    case 'save':
      const dataURL = maskCanvas.toDataURL('image/png');
      detectorStub.call('setMask', dataURL);
      break;
    default:
      console.log('action not implemented:', action);
      break;
  }
}

function loop() {
  requestAnimationFrame(loop);

  mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  if (maskOnly) {
    mainCtx.globalAlpha = 1;
    mainCtx.globalCompositeOperation = 'source-over';
  } else {
    mainCtx.globalAlpha = 1;
    mainCtx.drawImage(video, 0, 0);
    mainCtx.globalCompositeOperation = 'multiply';
    mainCtx.globalAlpha = 0.6;
  }
  mainCtx.drawImage(maskCanvas, 0, 0);
}

function screenToCanvas(x, y) {
  return {
    x: x - canvasBounds.x,
    y: y - canvasBounds.y,
    screenX: x,
    screenY: y,
  };
}

init();

