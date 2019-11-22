import GameObject from '@/js/gameEngine/GameObject';

import SocketStubClient from '@/js/utils/socketStubClient';


/** Swing controller */
export default class Swing extends GameObject {
  constructor() {
    super();
    this.value = 0;
    this.waitingDetection = false;
    this.debugView = document.querySelector('.debugImg');
    this.connect();
  }

  async connect() {
    const detectorStub = new SocketStubClient('ws://localhost:8765');
    window.detector = detectorStub;
    this.detectorStub = detectorStub;
    await detectorStub.readyPromise;

    detectorStub.call('setCamera', 0);
  }

  async update({time}) {
    if (!this.waitingDetection && this.detectorStub.ready) {
      this.waitingDetection = true;
      const [value, debugImg] = await this.detectorStub.call('detect', true);
      this.value = value;
      this.debugView.src = debugImg;
      this.waitingDetection = false;
    }
  }
}
