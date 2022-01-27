import * as PIXI from "pixi.js";

import { Engine, Button, Scene } from "@classes";

export class Menu extends Scene {
  public startButton: Button;
  public gameTitle: PIXI.Sprite;
  public background: PIXI.Sprite;

  public name: string = "menu";

  constructor(engine: Engine) {
    super(engine);

    this.background = new PIXI.Sprite(PIXI.Texture.from("menu_background"));
    this.background.anchor.set(0.5);
    this.background.scale.set(1);

    this.gameTitle = new PIXI.Sprite(PIXI.Texture.from("menu_title"));
    this.gameTitle.anchor.set(0.5);
    this.gameTitle.scale.set(0.3);

    this.addChild(this.background);
    this.addChild(this.gameTitle);

    this.startButton = new Button("Start Game");
    this.addChild(this.startButton);

    this.onResize();
    window.addEventListener("resize", this.onResize.bind(this));

    this.startButton.on("pointerdown", () => {
      this.engine.startScene("dungeon");
    });
  }

  public show(): void {
    this.engine.app.stage.addChild(this);
  }
  public hide(): void {
    this.engine.app.stage.removeChild(this);
  }

  public gameLoop(): void {}

  public onResize(): void {
    this.background.position.set(window.innerWidth / 2, window.innerHeight / 2);
    this.gameTitle.position.set(window.innerWidth / 2, window.innerHeight / 5);

    this.startButton.position.set(
      window.innerWidth / 2,
      window.innerHeight / 2
    );
  }
}
