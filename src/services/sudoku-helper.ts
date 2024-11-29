export function isValid(
  grid: (number | null)[][],
  row: number,
  column: number,
): boolean {
  const rowSet: Set<number> = new Set();
  const columnSet: Set<number> = new Set();
  let rowNumbersCount: number = 0;
  let columnNumbersCount: number = 0;

  // Vertical
  for (let i = 0; i < grid[row].length; i++) {
    if (grid[i][column] !== null) {
      rowSet.add(grid[i][column]!);
      rowNumbersCount++;
    }
  }

  // Horizontal
  for (let i = 0; i < grid[row].length; i++) {
    if (grid[row][i] !== null) {
      columnSet.add(grid[row][i]!);
      columnNumbersCount++;
    }
  }

  // Square
  const startRow = Math.floor(row - (row % 3));
  const startColumn = Math.floor(column - (column % 3));

  let squareNumbers = 0;
  const squareNumberSet = new Set<number>();
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startColumn; j < startColumn + 3; j++) {
      if (grid[i][j]) {
        squareNumbers++;
        squareNumberSet.add(grid[i][j]!);
      }
    }
  }

  return (
    rowSet.size === rowNumbersCount &&
    columnSet.size === columnNumbersCount &&
    squareNumbers === squareNumberSet.size
  );
}
