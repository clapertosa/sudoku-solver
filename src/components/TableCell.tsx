export default function TableCell({
  value,
  rowIndex,
  columnIndex,
  onCellChange,
}: {
  value: number | null;
  rowIndex: number;
  columnIndex: number;
  onCellChange: (
    rowIndex: number,
    cellIndex: number,
    value: number | null,
  ) => void;
}) {
  return (
    <td id={rowIndex + "-" + columnIndex} className={"cell black-border"}>
      <input
        className={"cell-input"}
        value={value || ""}
        onChange={({ target }) => {
          const targetValue = target.value;
          if (targetValue === "" || targetValue === "0")
            return onCellChange(rowIndex, columnIndex, null);

          const parsedNumber = parseInt(targetValue, 10);
          if (isNaN(parsedNumber)) return;

          if (parsedNumber > 9) return;
          onCellChange(rowIndex, columnIndex, parsedNumber);
        }}
      />
    </td>
  );
}
