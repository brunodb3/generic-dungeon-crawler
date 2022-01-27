import * as PIXI from "pixi.js";

import { Engine } from "@classes";

export abstract class Scene extends PIXI.Container {
  public engine: Engine;

  constructor(engine: Engine) {
    super();

    this.engine = engine;
    this.sortableChildren = true;
  }

  public abstract name: string;
  public abstract show(): void;
  public abstract hide(): void;
  public abstract onResize(): void;
  public abstract gameLoop(delta: number): void;

  // @todo: set scene state (pause / play scene)
}
