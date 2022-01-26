import * as PIXI from "pixi.js";

export default class Dungeon extends PIXI.TilingSprite {
  constructor(width?: number, height?: number) {
    const texture = PIXI.Texture.from(`floor/floor_1.png`);

    if (!width) width = 100;
    if (!height) height = 100;

    super(texture, width, height);

    this.anchor.set(0.5);
    this.scale.set(3);
  }

  public onUpdate(delta: number): void {}

  // @todo: procedural dungeons with rot.js?
  // https://github.com/staff0rd/dungeon
  // https://ondras.github.io/rot.js/manual/#map/dungeon
}
