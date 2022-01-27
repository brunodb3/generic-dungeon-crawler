import * as PIXI from "pixi.js";

import { Engine } from "@classes";

export class Floor extends PIXI.TilingSprite {
  private engine: Engine;

  constructor(engine: Engine, width?: number, height?: number) {
    const texture = PIXI.Texture.from(`floor/floor_5.png`);

    if (!width) width = 100;
    if (!height) height = 100;

    super(texture, width, height);

    this.engine = engine;

    this.anchor.set(0.5);
  }

  public onResize(width?: number, height?: number): void {
    if (width) this.width = width;
    if (height) this.height = height;
  }

  public gameLoop(): void {
    const { vx, vy } = this.engine.movement.getVelocityValues();

    // negative velocity as this is the floor moving, not the player
    this.tilePosition.x += -vx;
    this.tilePosition.y += -vy;
  }
}
