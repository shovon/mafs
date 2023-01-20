import { delete4D, get4D, getSize4D, has4D, iterate4D, Map4D, set4D } from "./Map4D"

type Point2D = [number, number]

export class SideMap<V> {
  private _map: Map4D<number, V> = new Map()

  constructor(iterable: Iterable<[[Point2D, Point2D], V]> = []) {
    for (const [side, v] of iterable) {
      this.set(side, v)
    }
  }

  get([[x1, y1], [x2, y2]]: [Point2D, Point2D]): V | undefined {
    return get4D(this._map, [x1, y1, x2, y2])
  }

  set([[x1, y1], [x2, y2]]: [Point2D, Point2D], v: V) {
    set4D(this._map, [x1, y1, x2, y2], v)
  }

  has([[x1, y1], [x2, y2]]: [Point2D, Point2D]): boolean {
    return has4D(this._map, [x1, y1, x2, y2])
  }

  delete([[x1, y1], [x2, y2]]: [Point2D, Point2D]) {
    delete4D(this._map, [x1, y1, x2, y2])
  }

  *[Symbol.iterator](): IterableIterator<[[Point2D, Point2D], V]> {
    for (const [[x1, y1, x2, y2], v] of iterate4D(this._map)) {
      yield [
        [
          [x1, y1],
          [x2, y2],
        ],
        v,
      ]
    }
  }

  get size(): number {
    return getSize4D(this._map)
  }

  toString() {
    ;[...this].map(([key, v]) => `${sideToStr(key)}, ${v}`).join(",")
  }
}

const pointToStr = ([x, y]: Point2D) => `(${x},${y})`

const sideToStr = ([a, b]: [Point2D, Point2D]) => `[${pointToStr(a)},${pointToStr(b)}]`

export class SideSet {
  private _map: SideMap<[Point2D, Point2D]> = new SideMap()

  has(side: [Point2D, Point2D]): boolean {
    return this._map.has(side)
  }

  add(side: [Point2D, Point2D]) {
    this._map.set(side, side)
  }

  delete(k: [Point2D, Point2D]) {
    this._map.delete(k)
  }

  *[Symbol.iterator](): IterableIterator<[Point2D, Point2D]> {
    for (const [side] of this._map) {
      yield side
    }
  }

  get size(): number {
    return this._map.size
  }

  toString() {
    return `[${[...this._map].map(([v]) => sideToStr(v)).join(",")}]`
  }
}