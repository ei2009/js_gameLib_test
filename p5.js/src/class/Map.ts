import p5 from 'p5';
import { Player } from './Player';
import { Tile } from './Tile';

// class of the Map which has many tiles
class Map {
  private tileNumber: number; // タイルの枚数
  private tileLen: number; // タイル１辺の長さ
  private tiles: Tile[][] = [];

  constructor(mapLen: number, tileNumber: number) {
    this.tileNumber = tileNumber;
    this.tileLen = mapLen / tileNumber;

    // 初期化
    for (let y = 0; y < tileNumber; y++) {
      this.tiles[y] = [];
      for (let x = 0; x < tileNumber; x++) {
        this.tiles[y][x] = new Tile();
      }
    }
  }

  // マップとプレイヤーを描画
  public draw = (p: p5, player: Player) => {
    p.fill('#fff');
    for (let x = 0; x < this.tileNumber; x++) {
      for (let y = 0; y < this.tileNumber; y++) {
        p.rect(x * this.tileLen, y * this.tileLen, this.tileLen, this.tileLen);
      }
    }

    // プレイヤーを描画
    player.draw(p);
  };

  // 移動先にタイルがあるかどうか(移動が可能かどうか)
  public isTile = (movedX: number, movedY: number): boolean => {
    let result: boolean = false;
    if (
      movedX >= 0 &&
      movedX < this.tileNumber &&
      movedY >= 0 &&
      movedY < this.tileNumber
    ) {
      result = true;
    }
    return result;
  };
}

export { Map };
