export class SudokuSolver {
  initField = (field: string[][]) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        field[i][j] = this.getRandom();
      }
    }
    return field;
  };

  checkRow = (subject: string[][], index: number) => {
    const base = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      base[parseInt(subject[index][i])] = 1;
    }
    for (let i = 0; i < 9; i++) {
      sum += base[i];
    }
    return sum == 9;
  };

  checkCol = (subject: string[][], index: number) => {
    const base = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      base[parseInt(subject[i][index])] = 1;
    }
    for (let i = 0; i < 9; i++) {
      sum += base[i];
    }
    return sum == 9;
  };

  checkBox = (subject: string[][], index: number) => {
    const base = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      const rowIndex = (index / 3) * 3 + i / 3;
      const colIndex = (i % 3) * 3 + (i % 3);
      base[parseInt(subject[rowIndex][colIndex])] = 1;
    }
    for (let i = 0; i < 9; i++) {
      sum += base[i];
    }

    return sum == 9;
  };

  getRandom = () => {
    return String(Math.floor(Math.random() * 9) + 1);
  };
}
