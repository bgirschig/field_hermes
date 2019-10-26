import * as THREE from 'three';
import GameObject from './GameObject.js';

/** Threejs based 'game' engine */
export default class GameEngine {
  /**
   * Constructs a gameEngine instance
   * @param {Object} options
   */
  constructor({background=null, width=null, height=null}={}) {
    this.renderer = new THREE.WebGLRenderer( {
      antialias: true,
    } );
    this.renderer.setSize( width || window.innerWidth, height || window.innerHeight );

    this.scene = new THREE.Scene();
    if (background) this.scene.background = new THREE.Color(background);
    this.camera = new THREE.PerspectiveCamera( 70, this.width / this.height, 0.01, 100 );

    this.frame = 0;
    this.children = [];

    document.body.appendChild( this.renderer.domElement );
    this.loop();
  }

  /** gameEngine's main loop function */
  loop() {
    requestAnimationFrame(this.loop.bind(this));

    this.update();
    this.render();
    this.frame += 1;
  }

  /** Scene width */
  get width() {
    return this.renderer.domElement.width;
  }
  /** Scene height */
  get height() {
    return this.renderer.domElement.height;
  }

  /** update all gameObjects */
  update() {
    for (let index = 0; index < this.children.length; index++) {
      const child = this.children[index];
      if (child.active) child.update();
    }
  }

  /** Render the scene */
  render() {
    const needsRender = this.children.some(child => child.active && child.needsRender);
    if (!needsRender) return;
    this.renderer.render( this.scene, this.camera );
    this.children.forEach(child => child.needsRender = false);
  }

  /**
   * Adds a gameObject to the scene
   * @param {GameObject} child
   */
  add(child) {
    this.scene.add(child);
    child.scene = this;
    this.children.push(child);
  }

  /**
   * Removes a gameObject from the scene
   * @param {GameObject} child
   */
  remove(child) {
    this.scene.remove(child);
    child.scene = null;
    const idx = this.children.indexOf(child);
    this.children.splice(idx, 1);
  }
}
