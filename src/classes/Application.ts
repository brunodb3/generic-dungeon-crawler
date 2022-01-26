import * as PIXI from "pixi.js";

import Floor from "./Floor";
import Player from "./Player";
import Movement from "./Movement";

export default class Application extends PIXI.Application {
  public floor!: Floor;
  public player!: Player;
  public movement!: Movement;

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

    this.floor = new Floor(this);
    this.player = new Player(this);
    this.movement = new Movement(this);

    this.movement.setVelocity(0.3);

    this.onResize();

    this.ticker.add(this.gameLoop.bind(this));
  }

  private gameLoop(delta: number): void {
    this.floor.gameLoop(delta);
    this.player.gameLoop(delta);
  }

  private onResize(): void {
    this.renderer.resize(window.innerWidth, window.innerHeight);

    const { width, height } = this.renderer;
    this.floor.onResize(width, height);

    this.movement.onResize();
  }
}
