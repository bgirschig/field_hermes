import GameObject from '@/js/gameEngine/GameObject';

const FULL_ROTATE_SPEED = -0.001;
const FULL_FLY_SPEED = -0.013;

export default class CameraHandler extends GameObject {
  constructor(camera) {
    super();
    this.rotating = false;
    this.flying = true;

    this.add(camera);
    camera.position.y = 1.1;
    camera.rotateX(-0.09);

    this.rotateSpeed = FULL_ROTATE_SPEED;
    this.flySpeed = 0;
  }

  update({frame}) {
    if (this.game.keyboardState['f']) {
      // fly mode
      this.rotateSpeed -= this.rotateSpeed * 0.01;
      this.flySpeed += (FULL_FLY_SPEED - this.flySpeed) * 0.005;
      if (frame%30===0) console.log(this.flySpeed);
    } else {
      // rotate mode
      this.rotateSpeed += (FULL_ROTATE_SPEED - this.rotateSpeed) * 0.02;
      this.flySpeed * 0.02;
    }

    this.rotateX(this.rotateSpeed);
    this.translateZ(this.flySpeed);
  }
}
