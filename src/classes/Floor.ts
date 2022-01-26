import * as PIXI from "pixi.js";

import Movement from "./Movement";

export default class Floor extends PIXI.TilingSprite {
  private movement: Movement;

  constructor(width?: number, height?: number) {
    const texture = PIXI.Texture.from(`floor/floor_5.png`);

    if (!width) width = 100;
    if (!height) height = 100;

    super(texture, width, height);

    this.anchor.set(0.5);
    this.scale.set(5);

    // negative velocity for inverted movement, as this is the floor and not the player
    this.movement = new Movement({ velocity: -0.5 });
  }

  public onResize(width?: number, height?: number): void {
    if (width) this.width = width;
    if (height) this.height = height;
  }

  public onUpdate(delta: number): void {
    const { vx, vy } = this.movement.getVelocityValues();

    this.tilePosition.x += vx;
    this.tilePosition.y += vy;
  }
}
