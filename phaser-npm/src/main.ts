import * as p from 'phaser';

// Phaser3のゲームクラスの記述（Phaser.Gameクラスを継承したMainクラスの記述）
class Main extends p.Game {
  constructor() {
    // p.Gameのコンフィグ
    const config: p.Types.Core.GameConfig = {
      type: p.AUTO,
      width: 800, // ゲーム横幅
      height: 600, // ゲーム縦幅
      backgroundColor: '#aaa',
    };
    super(config); // p.Gameクラスにコンフィグを渡す

    // シーンをスタート
    this.scene.start('preload');
  }
}

// ブラウザでDOM描写終了直後に呼び出される
window.onload = () => {
  // Mainクラスのインスタンスを生成（ここで初めてゲームが生成）
  const GameApp: p.Game = new Main();
};
