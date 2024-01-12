import { SudokuSquare } from "./SudokuSquare";
export class SudokuSolver {
  initField = (field: string[][]) => {
    this.completeBoard();
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        field[i][j] = String(this.boardArray[i * 9 + j].value);
      }
    }
    return field;
  };
  // 9×9のボード
  boardArray: SudokuSquare[] = [];
  // １マスの構造体
  // 値
  value = null;
  // 名前
  name = null;
  // インデックス
  index = null;
  // 列
  column = null;
  // 行
  row = null;
  // 3X3
  threeOnthree = null;
  // 使用可能で未使用
  unuseNumbers = null;
  // 値挿入時に使用する添字
  iTmp = 0;
  // 穴あきの数
  HOLE_NUM = 50;

  // メインメソッド
  completeBoard = () => {
    this.createObjectSquareInTheBoard();
    // ゴールノードになるまでぐるぐる
    while (!this.isSolve()) {
      if (this.insertNumberOrBackTracking(this.boardArray[this.iTmp])) {
        this.iTmp += 1;
      } else {
        this.iTmp -= 1;
        // index <= iTmpのsquareのvalueをnullに書き換える
        this.rewriteForNull(this.iTmp);
      }
    }
  };

  // ボードの中のマス構造体をインスタンス化
  createObjectSquareInTheBoard = () => {
    let i = 0;
    for (let x = 0; x < 9; ++x) {
      for (let y = 0; y < 9; ++y) {
        // 1マス生成
        const square = new SudokuSquare(x, y, i);
        // 9x9ボードにプッシュ
        this.boardArray.push(square);
        i += 1;
      }
    }
  };

  // index >= iTmpのsquareのvalueをnullに書き換える
  rewriteForNull = (i: number) => {
    this.boardArray.filter(function (x) {
      if (x.index >= i) {
        x.value = null;
      }
    });
  };

  // ゴールノードかどうか
  isSolve = () => {
    const values = this.boardArray.filter((x) => x.value == null);
    if (values.length == 0) {
      return true;
    }
    return false;
  };

  // 使用可能な数字があれば挿入無ければ戻る
  insertNumberOrBackTracking = (square: SudokuSquare) => {
    // 使用可能な数列
    const availableNumbers = this.getAvailableNumbers(square);
    // このsquareにおいて初めての値挿入処理
    if (square.unuseNumbers.length == 0 && availableNumbers.length != 0) {
      this.takeOutValueAndInsert(square, availableNumbers);
      return true;
    }
    // バックトラッキング中で未使用数列に値がある場合挿入
    if (square.unuseNumbers.length != 0 && square.unuseNumbers.length != 0) {
      this.takeOutValueAndInsert(square, square.unuseNumbers);
      return true;
    }
    // バックトラッキング中で未使用数列に値が無く、使用可能数列に値がある場合挿入
    if (square.unuseNumbers.length == 0 && availableNumbers.length != 0) {
      this.takeOutValueAndInsert(square, availableNumbers);
      return true;
    }
    // バックトラッキングがダメだった場合,未使用数列が空でないノードまで遡る
    if (square.unuseNumbers.length == 0 && availableNumbers.length == 0) {
      this.backTrackingForIsNotEmptyNode();
      return false;
    }
    // バックトラッキング後使用可能数列が空かつ、一つ前の未使用数列がからの場合
    if (
      square.unuseNumbers.length == 0 &&
      availableNumbers.length == 0 &&
      this.boardArray[square.index - 1].unuseNumbers.length == 0
    ) {
      this.backTrackingForIsNotEmptyNode();
      return false;
    }
    return false;
  };

  // 使用可能な数列から値を取り出し挿入し、未使用数列を更新
  takeOutValueAndInsert = (
    square: SudokuSquare,
    numbers: (number | null)[]
  ) => {
    const number = this.shuffle(numbers);
    square.value = number;
    square.unuseNumbers = numbers.filter((x) => x != number);
  };

  // 未使用数列が存在するノードまで戻る
  backTrackingForIsNotEmptyNode = () => {
    const backTrackArr = this.boardArray.filter(
      (x) => x.unuseNumbers.length != 0 && x.unuseNumbers.length != 0
    );
    const backTrackSquare = backTrackArr[backTrackArr.length - 1];
    this.iTmp = backTrackSquare.index + 1;
  };

  // 1から9の数字をランダムで返す
  shuffle = (arrayNumber: (number | null)[]) => {
    return arrayNumber[Math.floor(Math.random() * arrayNumber.length)];
  };

  // 現在判定中の数字が該当する列・行・3X3を抽出
  getObjectNumbersNeedToBeCheck = (square: SudokuSquare) => {
    // 列
    const tempColumnsNumbers = this.boardArray.filter(
      (x) => x.column == square.column
    );
    const columnsNumbers = tempColumnsNumbers
      .map((x) => x.value)
      .filter(function (x) {
        return typeof x === "number";
      });
    // 行
    const tempRowsNumbers = this.boardArray.filter((x) => x.row == square.row);
    let rowsNumbers = tempRowsNumbers.map((x) => x.value);
    rowsNumbers = rowsNumbers.filter(function (x) {
      return typeof x === "number";
    });
    // 3X3
    const tempThreeOnThreesNumbers = this.boardArray.filter(
      (x) => x.threeByThree == square.threeByThree
    );
    let threeOnThreesNumbers = tempThreeOnThreesNumbers.map((x) => x.value);
    threeOnThreesNumbers = threeOnThreesNumbers.filter(function (x) {
      return typeof x === "number";
    });
    // 該当する列・行・3X3の全ての数列を合わせた数列を返す
    return columnsNumbers.concat(rowsNumbers.concat(threeOnThreesNumbers));
  };

  // 使用可能な数字を抽出
  getAvailableNumbers = (square: SudokuSquare) => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    // 自身が属する列・行・3X3の全ての数列
    const alreadyUsedNumber = this.getObjectNumbersNeedToBeCheck(square);
    const arr = alreadyUsedNumber.concat(numbers);
    return arr.filter((v) => {
      return (
        v != null &&
        !(alreadyUsedNumber.indexOf(v) !== -1 && numbers.indexOf(v) !== -1)
      );
    });
  };

  openRandomSquare = (field: string[][]) => {
    const openList: { col: number; row: number }[] = [];
    for (let i = 0; i < this.HOLE_NUM; i++) {
      const x = this.getRandomValue();
      const y = this.getRandomValue();
      const map = { col: x, row: y };
      if (openList.includes(map)) {
        i--;
        continue;
      }
      openList.push(map);
    }
    for (const i in openList) {
      field[openList[i].col][openList[i].row] = "-";
    }
    return field;
  };

  getRandomValue = () => {
    return Math.floor(Math.random() * 9);
  };
}
