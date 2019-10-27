import GameObject from '@/js/gameEngine/GameObject';

/** Swing controller */
export default class Swing extends GameObject {
  constructor() {
    super();
    this.value = 0;
  }

  update({time}) {
    this.value = Math.sin(time / 500);
    // console.log(this.value);
  }
}
