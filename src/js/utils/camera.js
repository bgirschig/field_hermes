/**
 * @param {Object} config
 * @param {HTMLVideoElement} config.video - (optionnal) Video element to send the camera contents to
 */
export async function init({video} = {}) {
  if (!video) video = document.createElement('video');
  else if (typeof video === 'string') video = document.querySelector(video);

  if (!navigator.mediaDevices.getUserMedia) throw new Error('camera not available');

  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
  video.play();

  await new Promise(resolve => {
    video.addEventListener('loadedmetadata', resolve);
  });

  return {video, stream};
}
