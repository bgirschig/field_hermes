import GameObject from '@/js/gameEngine/GameObject';

const FULL_ROTATE_SPEED = -0.01;
const FULL_FLY_SPEED = -0.008;

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

  update() {
    if (this.rotating) this.rotateSpeed += (FULL_ROTATE_SPEED - this.rotateSpeed) * 0.02;
    else this.rotateSpeed -= this.rotateSpeed * 0.02;

    if (this.flying) this.flySpeed += (FULL_FLY_SPEED - this.flySpeed) * 0.02;
    else this.flySpeed * 0.02;

    this.rotateX(this.rotateSpeed);
    this.translateZ(this.flySpeed);

    const rotating = Math.abs(this.rotateSpeed) > 0.000005;
    const flying = Math.abs(this.flySpeed) > 0.000005;
    this.needsRender = rotating || flying;
  }
}
