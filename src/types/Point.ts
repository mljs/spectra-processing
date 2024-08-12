export interface Point {
  /** x value */
  x: number;

  /** y value */
  y: number;

  /** point index */
  index?: number;
}

export interface PointWithIndex extends Point {
  index: number;
}

export interface PointWithClose extends Point {
  close: boolean;
}
