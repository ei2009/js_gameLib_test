//必要なimport
import "phaser";
import { BootScene } from "./scenes/boot-scene";

//ゲームの基本設定
const config: Phaser.Types.Core.GameConfig = {
  title: "botMonster", //タイトル
  version: "0.0.1", //バージョン
  width: 640, //画面幅
  height: 480, //画面高さ
  parent: "game", //DOM上の親
  type: Phaser.AUTO, //canvasかwebGLかを自動選択
  scene: [BootScene], //利用するSceneクラス
};

//ゲームメインのクラス
export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

//windowイベントで、ロードされたらゲーム開始
window.addEventListener("load", () => {
  var game = new Game(config);
});
