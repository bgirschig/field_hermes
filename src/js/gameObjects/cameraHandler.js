import GameObject from '@/js/gameEngine/GameObject';
import {Group} from 'three';
import {TweenLite, Power2} from 'gsap/TweenMax';

const FULL_ROTATE_SPEED = -0.002;
const FULL_FLY_SPEED = -0.013;
const SWING_LENGTH = 0.5;

export default class CameraHandler extends GameObject {
  /**
   * @param {THREE.Camera} camera
   * @param {GameObject} swing
   * @param {GameObject} planet
   */
  constructor(camera, swing, planet) {
    super();
    this.rotating = false;
    this.flying = false;
    this.swing = swing;

    this.swingGroup = new Group();
    this.swingGroup.position.y = 1.1 + SWING_LENGTH;
    this.add(this.swingGroup);

    this.camera = camera;
    this.planet = planet;

    camera.rotateX(-0.09);
    camera.position.y = -SWING_LENGTH;
    this.swingGroup.add(camera);

    /** @type {import('gsap').Tween} */
    this.tweener = null;

    this.rotateSpeed = FULL_ROTATE_SPEED;
    this.flySpeed = 0;
    this.swingInfluence = 0;
  }

  update() {
    this.swingGroup.position.z = this.swing.value * 1.5 * this.swingInfluence;
    this.rotateX(this.rotateSpeed);
    this.translateZ(this.flySpeed);
  }

  onKeyUp(e) {
    if (e.key === 'f') this.toggleFlyMode();
    if (e.code === 'Space') this.game.paused = !this.game.paused;
  }

  toggleFlyMode() {
    if (this.tweener) this.tweener.kill();
    if (this.flying) {
      this.flying = false;
      this.tweener = TweenLite.to(this, 3, {
        rotateSpeed: FULL_ROTATE_SPEED,
        flySpeed: 0,
        swingInfluence: 0,
        ease: Power2.easeInOut,
        onComplete: () => {
          this.getWorldPosition(this.planet.position);
        },
      });
    } else {
      this.flying = true;
      this.tweener = TweenLite.to(this, 3, {
        rotateSpeed: 0,
        flySpeed: FULL_FLY_SPEED,
        swingInfluence: 1,
        ease: Power2.easeInOut,
      });
    }
  }
}
