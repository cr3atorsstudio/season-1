// @ts-ignore
import p5 from "node-p5";

// Generate and Save the generative art as a png image
const sketch = (
  startIndex: number,
  endIndex: number,
  imagesSaveDir: string
) => {
  // @ts-expect-error: Because node-p5 doesn't support typescript
  return (p) => {
    let color1 = p.map(startIndex, 0, 100, 0, 255);
    let color2 = p.map(endIndex, 0, 100, 0, 255);
    let yoff = 0.0;
    let count = 0;

    p.setup = () => {
      let canvas = p.createCanvas(300, 300);
      p.colorMode(255, 255, 255, 1);
      p.pixelDensity(4);
      p.smooth();
      p.noStroke();
      setTimeout(() => {
        p.saveCanvas(canvas, imagesSaveDir, "png").then((filename: any) => {
          console.log(`saved the canvas as ${filename}`);
        });
      }, 2000);
    };
    p.draw = () => {
      if (count >= 120) {
        p.noLoop();
      }

      p.pixelDensity(4);
      p.smooth();
      p.noStroke();

      let d = p.width / 20;
      let xoff = 0.0;

      for (let x = 0; x < p.width + d; x += d) {
        let ny = p.map(p.noise(xoff, yoff), 0, 1, -200, 800);
        noiseWave(x, ny, color1, color2);
        xoff += 10;
      }
      for (let x = 0; x < p.width + d; x += d) {
        let ny = p.map(p.noise(xoff, yoff), 0, 1, -200, 800);
        noiseWave(x, ny, color2, color1);
        xoff += 10;
      }

      yoff += 0.1;
      count++;
    };

    //@ts-ignore
    function noiseWave(x: number, y: number, color1: number, color2: number) {
      for (let i = 0; i < 20; i++) {
        p.push();
        p.translate(x, y);
        //p.fill(255, 204, 0);
        p.fill(color1, color2, p.map(color1 + color2, 0, 255, 1, 255), 5);
        //p.fill(color1, color2, p.map(color1 + color2, 0, 255, 1, 255), 20);
        p.ellipse(0, 0, i * 8);
        p.pop();
      }
    }
  };
};

export const generateBackgroundImage = async (
  startIndex: string,
  endIndex: string,
  imagesSaveDir: string
) => {
  await p5.createSketch(
    sketch(parseInt(startIndex), parseInt(endIndex), imagesSaveDir)
  );
};
