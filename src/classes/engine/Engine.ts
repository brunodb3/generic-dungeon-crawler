import * as PIXI from "pixi.js";

import { Audio, Movement, Scene } from "@classes";

export class Engine {
  public movement: Movement;
  public app: PIXI.Application;
  public scenes: Scene[] = [];
  public activeScene?: Scene;
  public bgMusic: Audio;

  constructor(app: PIXI.Application) {
    this.app = app;
    this.app.stage.sortableChildren = true;

    this.bgMusic = new Audio("/assets/audio/music/bg_music_challenger.mp3");
    this.bgMusic.element.volume = 0.6;
    this.bgMusic.autoplay();

    this.movement = new Movement();

    this.onResize();
    window.addEventListener("resize", this.onResize.bind(this));
  }

  public onResize(): void {
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
    this.movement.onResize();
  }

  public startScene(name: string): void {
    const target = this.scenes.find((scene) => scene.name === name);

    if (target) {
      for (const scene of this.scenes) {
        if (scene.name !== name) {
          scene.hide();
        }
      }

      target.show();
      this.activeScene = target;
    }
  }
}
