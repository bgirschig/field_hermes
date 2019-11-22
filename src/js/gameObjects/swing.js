import GameObject from '@/js/gameEngine/GameObject';

import SocketStubClient from '@/js/utils/socketStubClient';
import RollingArray from '@/js/utils/RollingArray';

/** Swing controller */
export default class Swing extends GameObject {
  constructor() {
    super();
    this.value = 0;
    this.speed = 0;
    this.prevTime = 0;
    this.waitingDetection = false;
    this.debugView = document.querySelector('.debugImg');
    this.prevValues = new RollingArray(15);
    this.prevSpeeds = new RollingArray(15);
    this.connect();
  }

  async connect() {
    const detectorStub = new SocketStubClient('ws://localhost:8765');
    window.detector = detectorStub;
    this.detectorStub = detectorStub;
    await detectorStub.readyPromise;

    detectorStub.call('setCamera', '/Users/bastienGirschig/Desktop/recording.mov');
    // detectorStub.call('setCamera', 0);
  }

  async update({time}) {
    if (this.waitingDetection) return;
    if (!this.detectorStub.ready) return;

    this.waitingDetection = true;
    const [value, debugImg] = await this.detectorStub.call('detect', true);
    this.waitingDetection = false;

    this.prevValues.append(value);
    if (debugImg) this.debugView.src = debugImg;

    if (this.prevValues.length > 1) {
      this.speed = (this.prevValues.get(-1) - this.prevValues.get(-2)) / (time - this.prevTime);
      this.prevSpeeds.append(this.speed);
      this.value = this.prevValues.average;
      this.smoothSpeed = this.prevSpeeds.average;
    }

    this.prevTime = time;
  }
}
