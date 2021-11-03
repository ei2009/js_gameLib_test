import p5 from 'p5';
import { keyState } from '../main';
import { Map } from './Map';

class Player {
  private x: number;
  private y: number;
  sideLen: number; // プレイヤーの１辺の長さ
  map: Map; // プレイヤーの存在するマップ
  actionWaitTime: number = 4; // プレイヤーが一度行動してから次の行動までの時間を設定
  actionCount: number = this.actionWaitTime; // プレイヤーの行動回数
  constructor(x: number, y: number, sideLen: number, map: Map) {
    this.x = x;
    this.y = y;
    this.sideLen = sideLen;
    this.map = map;
  }

  public moveX(x: number): void {
    if (this.checkRange(this.x + x, this.y)) {
      this.x += x;
    }
  }

  public moveY(y: number): void {
    if (this.checkRange(this.x, this.y + y)) {
      this.y += y;
    }
  }

  public moveLeft(x: number = 1): void {
    if (keyState.left) {
      this.moveX(-x);
    }
  }

  public moveRight(x: number = 1): void {
    if (keyState.right) {
      this.moveX(x);
    }
  }

  public moveUp(y: number = 1): void {
    if (keyState.up) {
      this.moveY(-y);
    }
  }

  public moveDown(y: number = 1): void {
    if (keyState.down) {
      this.moveY(y);
    }
  }

  public playerMove(): void {
    this.moveLeft();
    this.moveRight();
    this.moveUp();
    this.moveDown();
  }

  // プレイヤーの範囲チェック(プレイヤーが移動できるかどうか)
  public checkRange(movedX: number, movedY: number): boolean {
    return this.map.isTile(movedX, movedY);
  }

  // プレイヤーの行動を更新
  public update(): void {
    // 行動回数を更新
    this.actionCount--;

    // 一定回数行動を待ったら行動回数をリセット
    if (this.actionCount <= 0) {
      this.actionCount = this.actionWaitTime;
      this.playerMove();
    }
  }

  // マップ上にプレイヤーを赤色に描画
  public draw(p: p5): void {
    p.fill('red');
    const x = this.x * this.sideLen;
    const y = this.y * this.sideLen;
    // 描画
    p.rect(x, y, this.sideLen, this.sideLen);
  }
}

export { Player };
