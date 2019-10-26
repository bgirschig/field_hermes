import {Group} from 'three';
import GameEngine from './GameEngine';

/**  */
export default class GameObject extends Group {
  /** constructs a gameObject */
  constructor() {
    super();
    this.active = true;

    /** @type {GameEngine} */
    this.game = null;
  }

  /**
   * What to do on update. To be implemented by extending class
   * @override
   * @param {Object} info
   * @param {Number} info.frame - current frame index
   * @param {Number} info.time - current time (high precision milliseconds)
   * @param {Number} info.deltaTime - time between last update and current one
   * @param {Number} info.frameRate -  current framerate
   */
  update(info) {
  }

  onKeyDown() {
  }

  onKeyUp() {
  }
}
