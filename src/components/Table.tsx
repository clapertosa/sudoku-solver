import React from "react";
import TableCell from "./TableCell";

export default function Table({
  grid,
  onCellChange,
}: {
  grid: (number | null)[][];
  onCellChange: (
    rowIndex: number,
    cellIndex: number,
    value: number | null,
  ) => void;
}) {
  return (
    <table>
      <tbody>
        {grid.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <TableCell
                key={cellIndex}
                rowIndex={rowIndex}
                columnIndex={cellIndex}
                value={cell}
                onCellChange={onCellChange}
              ></TableCell>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
