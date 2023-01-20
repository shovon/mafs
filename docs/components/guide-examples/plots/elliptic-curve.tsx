"use client"

import {
  Mafs,
  CartesianCoordinates,
  Plot,
  Theme,
} from "mafs"

export default function EllipticCurve() {
  const sigmoid1 = (x: number) => 2 / (1 + Math.exp(-x)) - 1

  return (
    <Mafs height={300}>
      <CartesianCoordinates />
      <Plot.Implicit zero={Math.sin} color={Theme.blue} />
    </Mafs>
  )
}
