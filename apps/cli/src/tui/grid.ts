export type IconStyle = "image" | "glyph" | "none";

export type OptionGrid = {
  columns: number;
  rows: number;
  itemHeight: number;
  iconColumns: number;
  gap: number;
  cellWidth: number;
  labelOffset: number;
  descriptions: boolean;
  hub: boolean;
};

type GridInput = {
  count: number;
  labelWidth: number;
  iconStyle: IconStyle;
  multi: boolean;
  panelWidth: number;
  fullWidth: number;
  height: number;
  hub: boolean;
};

type ItemShape = { height: number; iconColumns: number; labelGap: number };

const TALL_IMAGE: ItemShape = { height: 2, iconColumns: 4, labelGap: 2 };
const SHORT_IMAGE: ItemShape = { height: 1, iconColumns: 2, labelGap: 2 };
const GLYPH: ItemShape = { height: 1, iconColumns: 1, labelGap: 2 };
const BARE: ItemShape = { height: 1, iconColumns: 0, labelGap: 0 };
const SHAPES: Record<IconStyle, ItemShape[]> = {
  image: [TALL_IMAGE, SHORT_IMAGE],
  glyph: [GLYPH],
  none: [BARE],
};

const MAX_LABEL_WIDTH = 24;
const SNUG_LABEL_WIDTH = 20;
const NARROW_LABEL_WIDTH = 16;
const CELL_PADDING = 2;
const ITEM_GAP = 1;
const DESCRIPTION_ROW = 1;

function gridShape(
  input: GridInput,
  shape: ItemShape,
  gap: number,
  width: number,
  hub: boolean,
  maxLabel = MAX_LABEL_WIDTH,
) {
  const labelOffset = (input.multi ? 4 : 2) + shape.iconColumns + shape.labelGap;
  const cellWidth = labelOffset + Math.min(input.labelWidth, maxLabel) + CELL_PADDING;
  return {
    rows: Math.max(1, Math.floor((input.height - DESCRIPTION_ROW + gap) / (shape.height + gap))),
    columns: Math.max(1, Math.floor(width / cellWidth)),
    itemHeight: shape.height,
    iconColumns: shape.iconColumns,
    gap,
    cellWidth,
    labelOffset,
    descriptions: false,
    hub,
  };
}

function balanced(grid: OptionGrid, count: number, fullWidth: number): OptionGrid {
  const columns = Math.ceil(count / grid.rows);
  const spread = grid.hub ? grid.cellWidth : Math.floor(fullWidth / columns);
  return {
    ...grid,
    columns,
    rows: Math.ceil(count / columns),
    cellWidth: Math.max(grid.cellWidth, spread),
  };
}

export function planOptionGrid(input: GridInput): OptionGrid {
  const shapes = SHAPES[input.iconStyle];
  const first = shapes[0] ?? BARE;
  const last = shapes.at(-1) ?? BARE;
  const listWidth = input.hub ? input.panelWidth : input.fullWidth;

  if (input.count * (first.height + ITEM_GAP) - ITEM_GAP <= input.height) {
    return {
      ...gridShape(input, first, ITEM_GAP, listWidth, input.hub),
      columns: 1,
      rows: input.count,
      cellWidth: listWidth,
      descriptions: true,
    };
  }

  const attempts = [
    ...(input.hub ? [gridShape(input, first, ITEM_GAP, input.panelWidth, true)] : []),
    ...shapes.flatMap((shape) => [
      gridShape(input, shape, ITEM_GAP, input.fullWidth, false),
      gridShape(input, shape, ITEM_GAP, input.fullWidth, false, SNUG_LABEL_WIDTH),
    ]),
    gridShape(input, last, 0, input.fullWidth, false),
    gridShape(input, last, 0, input.fullWidth, false, NARROW_LABEL_WIDTH),
  ];
  const fitting = attempts.find((grid) => grid.rows * grid.columns >= input.count);
  return fitting
    ? balanced(fitting, input.count, input.fullWidth)
    : gridShape(input, last, 0, input.fullWidth, false, NARROW_LABEL_WIDTH);
}

export function firstVisibleOption(grid: OptionGrid, cursor: number, count: number): number {
  const visible = grid.rows * grid.columns;
  if (visible >= count) return 0;
  if (grid.columns === 1) {
    return Math.min(Math.max(0, cursor - Math.floor(visible / 2)), count - visible);
  }
  const lastColumn = Math.ceil(count / grid.rows) - grid.columns;
  const column = Math.floor(cursor / grid.rows) - Math.floor(grid.columns / 2);
  return Math.min(Math.max(0, column), lastColumn) * grid.rows;
}
