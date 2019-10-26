import {Group} from 'three';

/**  */
export default class GameObject extends Group {
  /** constructs a gameObject */
  constructor() {
    super();
    this.active = true;
    this.needsRender = true;
  }

  get needsRender() {
    if (this._needsRender) return true;
    return this.children.some(child => child.needsRender);
  }

  set needsRender(value) {
    this._needsRender = value;
    this.children.forEach(child => child.needsRender = false);
  }

  /** What to do on update. To be implemented by extending class */
  update() {
  }
}
