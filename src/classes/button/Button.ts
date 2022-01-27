import * as PIXI from "pixi.js";

import { Audio } from "@classes";

export class Button extends PIXI.Sprite {
  private selectAudio: Audio;
  private text: PIXI.Text;

  constructor(value: string) {
    const texture = PIXI.Texture.from(`menu_button.png`);

    super(texture);

    this.buttonMode = true;
    this.interactive = true;

    this.anchor.set(0.5);
    this.scale.set(3);

    this.text = new PIXI.Text(value, {
      fontSize: "100pt",
      align: "center",
    });

    this.text.anchor.set(0.5);
    this.text.scale.set(0.1);

    this.addChild(this.text);

    this.selectAudio = new Audio("/assets/audio/effects/select.wav");

    this.on("pointerdown", () => {
      this.selectAudio.play();
    });
  }
}
