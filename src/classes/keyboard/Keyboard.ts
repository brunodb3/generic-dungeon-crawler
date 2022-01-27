export interface KeyboardKey {
  targetKey: string;
  isDown: boolean;
  onPress?: () => void;
  onRelease?: () => void;
  upHandler?: (event: KeyboardEvent) => void;
  downHandler?: (event: KeyboardEvent) => void;
}

export class Keyboard {
  public targetKey: string;
  public isDown: boolean = false;

  public onPress?: () => void;
  public onRelease?: () => void;

  constructor(targetKey: string) {
    this.targetKey = targetKey;

    window.addEventListener("keyup", this.upHandler.bind(this));
    window.addEventListener("keydown", this.downHandler.bind(this));
  }

  private upHandler(event: KeyboardEvent): void {
    if (event.code === this.targetKey) {
      if (this.onRelease) {
        this.onRelease();
      }

      this.isDown = false;
    }
  }

  private downHandler(event: KeyboardEvent): void {
    if (event.code === this.targetKey) {
      if (this.onPress) {
        this.onPress();
      }

      this.isDown = true;
    }
  }
}
