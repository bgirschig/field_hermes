import GameObject from '@/js/gameEngine/GameObject';
import {Group} from 'three';

const FULL_ROTATE_SPEED = -0.001;
const FULL_FLY_SPEED = -0.013;
const SWING_LENGTH = 0.5;

export default class CameraHandler extends GameObject {
  constructor(camera, swing) {
    super();
    this.rotating = false;
    this.flying = true;
    this.swing = swing;

    this.swingGroup = new Group();
    this.swingGroup.position.y = 1.1 + SWING_LENGTH;
    this.add(this.swingGroup);

    camera.rotateX(-0.09);
    camera.position.y = -SWING_LENGTH;
    this.swingGroup.add(camera);

    this.rotateSpeed = FULL_ROTATE_SPEED;
    this.flySpeed = 0;
    this.swingInfluence = 0;
  }

  update({keyboard}) {
    if (keyboard['f']) {
      // fly mode
      this.rotateSpeed += (0 - this.rotateSpeed) * 0.02;
      this.flySpeed += (FULL_FLY_SPEED - this.flySpeed) * 0.01;
      this.swingInfluence += (1 - this.swingInfluence) * 0.01;
    } else {
      // rotate mode
      this.rotateSpeed += (FULL_ROTATE_SPEED - this.rotateSpeed) * 0.02;
      this.flySpeed += (0 - this.flySpeed) * 0.02;
      this.swingInfluence += (0 - this.swingInfluence) * 0.02;
    }

    this.swingGroup.rotation.x += this.swing.value * 0.003 * this.swingInfluence;
    this.rotateX(this.rotateSpeed);
    this.translateZ(this.flySpeed);
  }
}
