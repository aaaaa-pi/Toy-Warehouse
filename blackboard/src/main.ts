import "./style.css";

class blackBoard {
  constructor(
    public el = document.querySelector<HTMLCanvasElement>("#canvas")!,
    public app = el.getContext("2d")!,
    private height = el.height,
    private width = el.width,
    private btns: HTMLDivElement = document.createElement("div"),
    private bgColor = "#000",
    private lineColor = "#fff"
  ) {
    this.initCanvas();
    this.bindEvent();
    this.draw();
  }
  private initCanvas() {
    this.app.fillStyle = this.bgColor;
    this.app.fillRect(0, 0, this.width, this.height);
    this.el.insertAdjacentElement("afterend", this.btns);
    this.btns.classList.add("initCanvas");
  }
  private bindEvent() {
    const callback = this.drawLine.bind(this);
    this.el.addEventListener("mousedown", () => {
      this.app.beginPath();
      this.app.strokeStyle = this.lineColor;
      this.el.addEventListener("mousemove", callback);
      document.addEventListener("mouseup", () => {
        this.el.removeEventListener("mousemove", callback);
      });
    });
  }
  private drawLine(event: MouseEvent) {
    this.app.lineTo(event.offsetX, event.offsetY);
    this.app.stroke();
  }
  public clear() {
    const el = document.createElement("button");
    el.innerText = "清屏";
    el.style.cssText = "padding: 10px";
    this.btns.insertAdjacentElement("afterbegin", el);
    el.addEventListener("click", () => {
      this.app.fillStyle = this.bgColor;
      this.app.fillRect(0, 0, this.width, this.height);
    });
    return this;
  }
  public setLineColor() {
    const colors = ["#f1c40f", "#e74c3c", "#2980b9", "#ecf0f1"];
    const container = document.createElement("div");
    container.classList.add("color-container");
    colors.forEach((color) => {
      const div = document.createElement("div");
      div.style.cssText = `width:25px;height:25px;background:${color}`;
      container.insertAdjacentElement("afterbegin", div);

      div.addEventListener("click", () => {
        this.lineColor = color;
      });
    });
    this.btns.insertAdjacentElement("beforeend", container);
  }
  public erase() {
    const el = document.createElement("button");
    el.innerText = "橡皮擦";
    el.style.cssText = "padding: 10px";
    this.btns.insertAdjacentElement("afterbegin", el);
    el.addEventListener("click", () => {
      this.lineColor = this.bgColor;
      this.app.lineWidth = 25;
    });
    return this;
  }
  public draw() {
    const el = document.createElement("button");
    el.innerText = "画笔";
    el.style.cssText = "padding: 10px";
    this.btns.insertAdjacentElement("afterbegin", el);
    el.addEventListener("click", () => {
      this.lineColor = this.lineColor;
      this.app.lineWidth = 1;
    });
    return this;
  }
  public short() {
    const el = document.createElement("button");
    el.innerText = "截图";
    el.style.cssText = "padding: 10px";
    this.btns.insertAdjacentElement("afterbegin", el);
    const img = document.createElement("img");
    el.addEventListener("click", () => {
      img.src = this.el.toDataURL("image/jpg");
      img.classList.add("image-short");
    });
    this.btns.insertAdjacentElement("afterend", img);
    return this;
  }
}

const instance = new blackBoard();
instance.clear();
instance.setLineColor();
instance.erase();
instance.short();
