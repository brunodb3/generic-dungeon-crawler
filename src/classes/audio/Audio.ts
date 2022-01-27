export class Audio {
  public element: HTMLAudioElement;

  constructor(file: string) {
    this.element = document.createElement("audio");

    this.element.setAttribute("src", file);
  }

  public isPaused(): boolean {
    return this.element.paused;
  }

  public play(): void {
    this.element.play();
  }

  public mute(): void {
    this.element.muted = true;
  }

  public unmute(): void {
    this.element.muted = false;
  }

  public autoplay(): void {
    this.element.setAttribute("autoplay", "autoplay");
    this.element.addEventListener("ended", () => {
      this.element.currentTime = 0;
      this.play();
    });

    const playIfPaused = () => {
      if (this.isPaused()) {
        this.play();
      }
    };

    window.addEventListener("click", playIfPaused);
    window.addEventListener("keydown", playIfPaused);
    window.addEventListener("touchstart", playIfPaused);
  }
}
