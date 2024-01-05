export class SudokuSquare {
  value: number | null = null;
  index = 0;
  column = 0;
  row = 0;
  threeByThree = 0;
  unuseNumbers: (number | null)[] = [];

  // 自身が属する3X3の場所を返す
  getThreeOnThreeObjectKey = (x: number, y: number) => {
    switch (true) {
      case (x == 0 || x == 1 || x == 2) && (y == 0 || y == 1 || y == 2):
        return 0;
      case (x == 0 || x == 1 || x == 2) && (y == 3 || y == 4 || y == 5):
        return 1;
      case (x == 0 || x == 1 || x == 2) && (y == 6 || y == 7 || y == 8):
        return 2;
      case (x == 3 || x == 4 || x == 5) && (y == 0 || y == 1 || y == 2):
        return 3;
      case (x == 3 || x == 4 || x == 5) && (y == 3 || y == 4 || y == 5):
        return 4;
      case (x == 3 || x == 4 || x == 5) && (y == 6 || y == 7 || y == 8):
        return 5;
      case (x == 6 || x == 7 || x == 8) && (y == 0 || y == 1 || y == 2):
        return 6;
      case (x == 6 || x == 7 || x == 8) && (y == 3 || y == 4 || y == 5):
        return 7;
      case (x == 6 || x == 7 || x == 8) && (y == 6 || y == 7 || y == 8):
        return 8;
      default:
        return 0;
    }
  };

  constructor(x: number, y: number, i: number) {
    this.index = i;
    this.column = x;
    this.row = y;
    this.threeByThree = this.getThreeOnThreeObjectKey(x, y);
  }
}
