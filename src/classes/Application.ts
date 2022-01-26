import * as PIXI from "pixi.js";

import Floor from "./Floor";
import Player from "./Player";

export default class Application extends PIXI.Application {
  private floor!: Floor;
  private player!: Player;

  constructor() {
    super({ width: window.innerWidth, height: window.innerHeight });

    document.body.appendChild(this.view);

    window.devicePixelRatio = 1;
    PIXI.settings.RESOLUTION = 1;
    PIXI.settings.ROUND_PIXELS = false;
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    this.renderer.view.style.display = "block";
    this.renderer.view.style.position = "absolute";

    this.init();

    window.addEventListener("resize", this.onResize.bind(this));
  }

  private init(): void {
    this.loader.add("spritesheet", "assets/dungeon_crawler_spritesheet.json");
    this.loader.load(this.draw.bind(this));
  }

  private draw(): void {
    this.stage.sortableChildren = true;

    this.floor = new Floor();
    this.player = new Player();

    this.stage.addChild(this.floor);
    this.stage.addChild(this.player);

    this.onResize();

    this.ticker.add(this.onUpdate.bind(this));
  }

  private onUpdate(delta: number): void {
    this.floor.onUpdate(delta);
    this.player.onUpdate(delta);

    this.player.zIndex = this.floor.zIndex + 10;

    this.player.position.set(this.renderer.width / 2, this.renderer.height / 2);
  }

  private onResize(): void {
    this.renderer.resize(window.innerWidth, window.innerHeight);

    const { width, height } = this.renderer;

    this.floor.onResize(width, height);
  }
}
