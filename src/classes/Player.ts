import * as PIXI from "pixi.js";

export default class Player extends PIXI.AnimatedSprite {
  private app: PIXI.Application;

  constructor(app: PIXI.Application) {
    const textures = [];

    for (let i = 0; i < 6; i++) {
      textures.push(PIXI.Texture.from(`knight/knight_idle_anim_f${i}.png`));
    }

    super(textures);

    this.app = app;

    this.anchor.set(0.5);
    this.scale.set(5);
    this.position.set(
      this.app.renderer.width / 2,
      this.app.renderer.height / 2
    );

    this.animationSpeed = 0.15;
    this.play();
  }
}
