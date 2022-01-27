import * as PIXI from "pixi.js";

import { Engine } from "@classes";

export class Player extends PIXI.AnimatedSprite {
  private engine: Engine;

  private idleTextures: PIXI.Texture<PIXI.Resource>[];
  private runningTextures: PIXI.Texture<PIXI.Resource>[];

  constructor(engine: Engine) {
    const idleTextures = [];
    const runningTextures = [];

    for (let i = 0; i < 6; i++) {
      idleTextures.push(PIXI.Texture.from(`knight/knight_idle_anim_f${i}.png`));
    }

    for (let i = 0; i < 6; i++) {
      runningTextures.push(
        PIXI.Texture.from(`knight/knight_run_anim_f${i}.png`)
      );
    }

    super(idleTextures);

    this.engine = engine;

    this.idleTextures = idleTextures;
    this.runningTextures = runningTextures;

    this.anchor.set(0.5);
    this.scale.set(5);

    this.animationSpeed = 0.15;
  }

  public gameLoop(): void {
    this.position.set(window.innerWidth / 2, window.innerHeight / 2);

    if (!this.playing) this.play();

    const { vx, vy } = this.engine.movement.getVelocityValues();

    if (vx !== 0 || vy !== 0) {
      if (this.textures !== this.runningTextures) {
        this.stop();
        this.textures = this.runningTextures;
        this.play();
      }
    } else {
      if (this.textures !== this.idleTextures) {
        this.stop();
        this.textures = this.idleTextures;
        this.play();
      }
    }

    // @todo: maybe track mouse position instead of velocity? for aiming attacks
    if (vx > 0) {
      this.scale.x = 0 + Math.abs(this.scale.x);
    } else if (vx < 0) {
      this.scale.x = 0 - Math.abs(this.scale.x);
    }
  }
}
