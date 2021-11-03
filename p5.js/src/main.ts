import p5 from 'p5';
import { Player } from './class/Player';
import { Map } from './class/Map';
// bodyを灰色にする
document.body.style.backgroundColor = '#ccc';

// キーボード入力の状態を保持する
const keyState = {
  up: false,
  down: false,
  left: false,
  right: false,
};

const sketch = (p: p5) => {
  // canvasのサイズ
  const canvasLength = Math.min(window.innerWidth, window.innerHeight) * 0.9;

  // マップに配置するタイルの数
  const tileNumber = 10;

  // マップのタイルの大きさ
  const tileSize = canvasLength / tileNumber;

  // マップを作成
  const map = new Map(canvasLength, tileNumber);

  // プレイヤーを作成
  const player = new Player(0, 0, tileSize, map);

  p.setup = () => {
    // canvasを作成
    p.createCanvas(canvasLength, canvasLength);
    // 背景色を#fff(白)にする
    p.background('#fff');
  };

  // キーが押されている間、プレイヤーの行動を更新する

  p.keyPressed = () => {
    // キー入力を保持する
    const k = p.keyCode;

    if (k === p.UP_ARROW) {
      keyState.up = true;
    }
    if (k === p.DOWN_ARROW) {
      keyState.down = true;
    }
    if (k === p.LEFT_ARROW) {
      keyState.left = true;
    }
    if (k === p.RIGHT_ARROW) {
      keyState.right = true;
    }
  };

  p.keyReleased = () => {
    // キー入力を解除する
    const k = p.keyCode;
    if (k === p.UP_ARROW) {
      keyState.up = false;
    }
    if (k === p.DOWN_ARROW) {
      keyState.down = false;
    }
    if (k === p.LEFT_ARROW) {
      keyState.left = false;
    }
    if (k === p.RIGHT_ARROW) {
      keyState.right = false;
    }
  };

  p.draw = () => {
    if (p.keyIsPressed) {
      player.update();
    }
    p.background('#fff');
    map.draw(p, player);
  };
};

new p5(sketch);

export { keyState };
