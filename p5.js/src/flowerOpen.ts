import p5 from 'p5';

const flowerOpen = (
  p: p5,
  color1: p5.Color = p.color('#fffbe3'),
  color2: p5.Color = p.color('#24495c'),
  color1amount: number = 1,
) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.angleMode(p.DEGREES); // 回転角度を度数法で指定
    p.noStroke(); // 塗りつぶし
    p.background('#131821');
    p.blendMode(p.LIGHTEST);
  };

  p.draw = () => {
    p.fill(p.lerpColor(color2, color1, color1amount));
    p.translate(p.width / 2, p.height / 2);
    p.rotate(p.frameCount * 13);
    p.ellipse(p.frameCount / 2, 0, p.frameCount, p.frameCount / 3);
    color1amount *= 0.995;
  };
};

export { flowerOpen };
