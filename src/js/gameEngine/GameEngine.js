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

    this.keyboardState = {};
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));

    this.dom = this.renderer.domElement;
    document.body.appendChild( this.dom );

    this.prevTime = performance.now();
    this.paused = false;
  }

  onKeyDown(e) {
    if (this.keyboardState[e.key]) return;
    this.keyboardState[e.key] = true;
    this.applyTochildren({methodName: 'onKeyDown', args: [e], skipInvisible: false});
  }

  onKeyUp(e) {
    if (!this.keyboardState[e.key]) return;
    this.keyboardState[e.key] = false;
    this.applyTochildren({methodName: 'onKeyUp', args: [e], skipInvisible: false});
  }

  /** gameEngine's main loop function */
  loop() {
    this.loopRequest = requestAnimationFrame(this.loop.bind(this));

    const now = performance.now();
    const deltaTime = now - this.prevTime;
    this.prevTime = now;
    const frameRate = 1000/deltaTime;
    this.applyTochildren({methodName: 'update', args: [{
      frame: this.frame,
      time: now,
      deltaTime,
      frameRate,
      keyboard: this.keyboardState,
      skipInvisible: false,
    }]});
    this.renderer.render( this.scene, this.camera );
    this.frame += 1;
  }

  get paused() {
    return this._paused;
  }
  set paused(value) {
    if (value === this.paused) return;
    this._paused = value;

    if (!this.paused && !this.loopRequest) {
      this.loopRequest = requestAnimationFrame(this.loop.bind(this));
    } else {
      cancelAnimationFrame(this.loopRequest);
      this.loopRequest = null;
    }
  }

  /** Scene width */
  get width() {
    return this.renderer.domElement.width;
  }
  /** Scene height */
  get height() {
    return this.renderer.domElement.height;
  }

  applyTochildren({methodName=null, method=null, args=[], skipDisabled=true,
    skipInvisible=true} = {}) {
    this.children.forEach(child => {
      if (skipDisabled && !child.active) return;
      if (skipInvisible && !child.visible) return;
      if (methodName) child[methodName](...args);
      else if (method) method(child, ...args);
    });
  }

  /**
   * Adds a gameObject to the scene
   * @param {GameObject} child
   */
  add(child) {
    this.scene.add(child);
    child.game = this;
    this.children.push(child);
  }

  /**
   * Removes a gameObject from the scene
   * @param {GameObject} child
   */
  remove(child) {
    this.scene.remove(child);
    child.game = null;
    const idx = this.children.indexOf(child);
    this.children.splice(idx, 1);
  }
}
