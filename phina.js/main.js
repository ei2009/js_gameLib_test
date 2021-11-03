/*
 * 15パズルプログラム
 * (make a game piece of 15)
 */

// phina.js をグローバル領域に展開
phina.globalize();

const screenWidth = 640; // 画面の横幅
const screenHeight = 960; // 画面の縦幅
const gridSize = screenWidth / 4; // グリッドの大きさ
const pieceSize = gridSize * 0.95; // ピースの大きさ
const pieceNumXY = 4; // ピースの横と縦の数
const pieceOffset = gridSize / 2; // ピースの位置調整

phina.define('MainScene', {
  superClass: 'DisplayScene',

  // 初期化
  init: function () {
    this.superInit();
    this.backgroundColor = 'gray';
    const grid = Grid(screenWidth, pieceNumXY);
    const pieceGroup = DisplayElement().addChildTo(this);
    const self = this;

    pieceNumXY.times((spanX) => {
      pieceNumXY.times((spanY) => {
        // number
        const number = spanY * pieceNumXY + spanX + 1;
        const piece = Piece(number).addChildTo(pieceGroup);
        piece.x = grid.span(spanX) + pieceOffset;
        piece.y = grid.span(spanY) + pieceOffset;
        piece.correctX = piece.x;
        piece.correctY = piece.y;

        // タッチを有効にする
        piece.setInteractive(true);

        // タッチイベントを受け取る
        piece.onpointend = function () {
          self.movePiece(this);
        };

        // 16番目は表示しない
        if (number === 16) {
          piece.hide();
        }
      });
    });

    const shuffleButton = Button({
      text: 'シャッフル',
    })
      .addChildTo(this)
      .setPosition(this.gridX.center(), this.gridY.span(13));

    // ボタンを押した時の処理
    shuffleButton.onpush = function () {
      (300).times(function () {
        self.shufflePieces();
      });
      // 残りステップリセット
      self.step = 200;
      // フラグを立てる
      this.isPushed = true;
    };

    this.shuffleButton = shuffleButton;
    this.pieceGroup = pieceGroup;
  },

  // get the empty position
  getBlankPiece: function () {
    let result = null;
    this.pieceGroup.children.some(function (piece) {
      if (piece.number === 16) {
        result = piece;
        return true;
      }
    });
    return result;
  },

  // ピースの移動
  movePiece: function (piece, isInstantly) {
    const blank = this.getBlankPiece();

    // 即入れ替え
    if (isInstantly) {
      const tmpX = piece.x;
      const tmpY = piece.y;
      piece.setPosition(blank.x, blank.y);
      blank.setPosition(tmpX, tmpY);
      return;
    }
    // x, y座標の差の絶対値を取得
    const dx = Math.abs(piece.x - blank.x);
    const dy = Math.abs(piece.y - blank.y);
    // 隣り合わせの判定
    if (
      (piece.x === blank.x && dy === gridSize) ||
      (piece.y === blank.y && dx === gridSize)
    ) {
      // タッチされたピースを記録
      const touchX = piece.x;
      const touchY = piece.y;
      const self = this;
      // tweenerを使って移動
      piece.tweener
        .clear()
        .to({ x: blank.x, y: blank.y }, 200, 'easeOutCubic')
        .call(function () {
          // 空白ピースをタッチされたピースに移動
          blank.setPosition(touchX, touchY);
          // 残りステップを減らす
          self.step--;
          // クリアチェック
          if (self.shuffleButton.isPushed) {
            self.checkPiecePositions();
          }
        });
    }
  },
  // クリア判定
  checkPiecePositions: function () {
    // 正しくないピースがあるかどうか
    const result = this.pieceGroup.children.some(function (piece) {
      if (piece.x !== piece.correctX || piece.y !== piece.correctY) {
        return true;
      }
    });
    const score = this.step;
    if (!result) {
      // クリア
      this.exit({ score: score, message: '15 Puzzle Clear!' });
    }
  },

  // 指定の位置のピースを返す
  getPieceByXY: function (x, y) {
    let result = null;
    this.pieceGroup.children.some(function (piece) {
      if (piece.x === x && piece.y === y) {
        result = piece;
        return true;
      }
    });
    return result;
  },

  // ピースをシャッフル
  shufflePieces: function () {
    const self = this;
    // 隣接ピース格納用
    const pieces = [];
    // 空白ピースを得る
    const blank = this.getBlankPiece();
    // 上下左右隣りのピースがあれば配列に追加
    [1, 0, -1].each(function (i) {
      [1, 0, -1].each(function (j) {
        if (Math.abs(i) != Math.abs(j)) {
          const x = blank.x + i * gridSize;
          const y = blank.y + j * gridSize;
          const target = self.getPieceByXY(x, y);
          if (target !== null) {
            pieces.push(target);
          }
        }
      });
    });
    // 隣接ピースからランダムに選択して空白ピースと入れ替える
    this.movePiece(pieces.random(), 'instantly');
    pieces.clear();
  },
});

// class Piece
phina.define('Piece', {
  superClass: 'RectangleShape',
  init: function (number) {
    this.superInit({
      width: pieceSize,
      height: pieceSize,
      cornerRadius: 10,
      fill: 'silver',
      stroke: 'white',
    });
    // number
    this.number = number;
    this.label = Label({
      text: this.number + '',
      fontSize: pieceSize * 0.6,
      fill: 'white',
    }).addChildTo(this);
  },
});

// main process
phina.main(function () {
  const app = GameApp({
    startLabel: 'main',
  });
  app.run();
});
