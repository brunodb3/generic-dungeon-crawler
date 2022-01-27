import { Floor, Engine, Scene, Player } from "@classes";

export class Dungeon extends Scene {
  public floor: Floor;
  public player: Player;

  public name: string = "dungeon";

  constructor(engine: Engine) {
    super(engine);

    this.floor = new Floor(this.engine);
    this.floor.scale.set(5);

    this.player = new Player(this.engine);

    this.addChild(this.floor);
    this.addChild(this.player);

    this.engine.movement.setVelocity(0.5);
    this.engine.app.ticker.add(this.gameLoop.bind(this));

    if (this.engine.movement.joystick) {
      this.addChild(this.engine.movement.joystick);
    }

    this.onResize();
    window.addEventListener("resize", this.onResize.bind(this));
  }

  public show(): void {
    this.engine.app.stage.addChild(this);
  }
  public hide(): void {
    this.engine.app.stage.removeChild(this);
  }

  public gameLoop(): void {
    this.floor.gameLoop();
    this.player.gameLoop();
  }

  public onResize(): void {
    const { width, height } = this.engine.app.renderer;
    this.floor.onResize(width, height);
  }
}
