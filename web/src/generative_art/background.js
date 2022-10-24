import p5 from "p5";
import P5 from "p5";

// Creating the sketch itself
const sketch = (imagesSaveDir: any) => {
  // DEMO: Prepare an array of MyCircle instances
  // The sketch setup method

  p5.setup = () => {
    // Creating and positioning the canvas
  };

  let yoff = 0.0;
  let count = 0;
  // The sketch draw method
  p5.draw = () => {
    if (count == 125) {
      p5.noLoop();
    }

    p5.background(256, 1.2);
    p5.pixelDensity(4);
    p5.smooth();
    p5.noStroke();

    let d = p5.width / 20;
    let xoff = 0.0;

    for (let x = 0; x < p5.width + d; x += d) {
      let ny = p5.map(p5.noise(xoff, yoff), 0, 1, -200, 800);
      noiseWave(x, ny, 141, 158, 132);
      xoff += 10;
    }

    for (let x = 0; x < p5.width + d; x += d) {
      let ny = p5.map(p5.noise(xoff, yoff), 0, 1, -200, 800);
      noiseWave(x, ny, 197, 223, 223);
      xoff += 6;
    }

    for (let x = 0; x < p5.width + d; x += d) {
      let ny = p5.map(p5.noise(xoff, yoff), 0, 1, -200, 800);
      noiseWave(x, ny, 230, 136, 21);
      xoff += 1;
    }
    for (let x = 0; x < p5.width + d; x += d) {
      let ny = p5.map(p5.noise(xoff, yoff), 0, 1, -200, 800);
      noiseWave(x, ny, 167, 22, 102);
      xoff += 3;
    }
    for (let x = 0; x < p5.width + d; x += d) {
      let ny = p5.map(p5.noise(xoff, yoff), 0, 1, -200, 800);
      noiseWave(x, ny, 211, 22, 56);
      xoff += 9;
    }
    yoff += 0.1;
    count++;
  };

  function noiseWave(x: number, y: number, r: number, g: number, b: number) {
    for (let i = 0; i < 15; i++) {
      p5.push();
      p5.translate(x, y);
      p5.fill(r, g, b, 0.05);
      p5.ellipse(0, 0, i * 10);
      p5.pop();
    }
  }
};

export const genImages = (
  startIndex: number,
  endIndex: number,
  imagesSaveDir: string
) => {
  p5.createSketch(sketch(imagesSaveDir));
};
