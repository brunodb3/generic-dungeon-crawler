import * as PIXI from "pixi.js";
import Application from "./Application";

export default class Floor extends PIXI.TilingSprite {
  private app: Application;

  constructor(app: Application, width?: number, height?: number) {
    const texture = PIXI.Texture.from(`floor/floor_5.png`);

    if (!width) width = 100;
    if (!height) height = 100;

    super(texture, width, height);

    this.app = app;

    this.anchor.set(0.5);
    this.scale.set(5);

    this.app.stage.addChild(this);
  }

  public onResize(width?: number, height?: number): void {
    if (width) this.width = width;
    if (height) this.height = height;
  }

  public gameLoop(delta: number): void {
    const { vx, vy } = this.app.movement.getVelocityValues();

    // negative velocity as this is the floor moving, not the player
    this.tilePosition.x += -vx;
    this.tilePosition.y += -vy;
  }
}
