import React, { useState } from "react";
import "./App.css";
import Table from "./components/Table";
import { isValid } from "./services/sudoku-helper";

function App() {
  const [interactive, setInteractive] = useState<boolean>(false);
  const [grid, setGrid] = useState<(number | null)[][]>([
    [5, 3, null, null, 7, null, null, null, null],
    [6, null, null, 1, 9, 5, null, null, null],
    [null, 9, 8, null, null, null, null, 6, null],
    [8, null, null, null, 6, null, null, null, 3],
    [4, null, null, 8, null, 3, null, null, 1],
    [7, null, null, null, 2, null, null, null, 6],
    [null, 6, null, null, null, null, 2, 8, null],
    [null, null, null, 4, 1, 9, null, null, 5],
    [null, null, null, null, 8, null, null, 7, 9],
  ]);

  async function solveSudoku(
    grid: (number | null)[][],
    row: number = 0,
    column: number = 0,
  ): Promise<boolean> {
    if (row >= grid.length) return true;
    if (column >= grid[row].length) {
      return solveSudoku(grid, row + 1, 0);
    }
    // Pre-inserted numbers
    if (grid[row][column] !== null) {
      return solveSudoku(grid, row, column + 1);
    }

    for (let i = 1; i <= 9; i++) {
      grid[row][column] = i;
      if (isValid(grid, row, column)) {
        if (interactive && i === 9) {
          setGrid([...grid]);
          await new Promise((resolve) => setTimeout(resolve, 0));
        }

        if (await solveSudoku(grid, row, column + 1)) {
          setGrid([...grid]);
          return true;
        }
      }
    }

    grid[row][column] = null;
    return false;
  }

  return (
    <>
      <Table
        grid={grid}
        onCellChange={(
          rowIndex: number,
          columnIndex: number,
          value: number | null,
        ) => {
          const newNumbers = [...grid];
          newNumbers[rowIndex][columnIndex] = value === 0 ? null : value;
          setGrid(newNumbers);
        }}
      />
      <div>
        <input
          name={"interactive-checkbox"}
          type={"checkbox"}
          onChange={({ target }) => setInteractive(target.checked)}
          checked={interactive}
        ></input>{" "}
        <label htmlFor={"interactive-checkbox"}>Interactive (slow)</label>
      </div>
      <button onClick={() => setTimeout(() => solveSudoku([...grid]), 0)}>
        Solve Sudoku
      </button>
      <button
        onClick={() =>
          setGrid([
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
          ])
        }
      >
        Clear
      </button>
    </>
  );
}

export default App;
