import * as React from "react"
import { vec } from "../../vec"
import { Stroked } from "../Theme"
import { useTransformContext } from "../../context/TransformContext"
import { usePaneContext } from "../../context/PaneContext"

export interface ImplicitProps extends Stroked {
  /** A function that takes a `x` and `y` value and returns a number. */
  zero: (x: number, y: number) => number
  /** The minimum recursive depth of the sampling algorithm. */
  searchDepth?: number
  /** The maximum recursive depth of the sampling algorithm. */
  plotDepth?: number

  svgPathProps?: React.SVGProps<SVGPathElement>
}

export function Implicit({
  zero,
  color,
  style = "solid",
  weight = 2,
  opacity = 1.0,
  searchDepth = 5,
  plotDepth = 3,
  svgPathProps = {},
}: ImplicitProps) {
  const { viewTransform } = useTransformContext()
  const {
    xPaneRange: [xMin, xMax],
    yPaneRange: [yMin, yMax],
  } = usePaneContext()

  console.log(xMin, yMin, ",", xMax, yMax)

  // Negative because the y-axis is flipped in the SVG coordinate system.
  // const pixelsPerSquare = -vec.det(viewTransform)

  // const errorThreshold = 0.1 / pixelsPerSquare

  const svgPath = React.useMemo(() => "", [zero, xMin, xMax, yMin, yMax, searchDepth, plotDepth])

  return (
    <path
      d={svgPath}
      strokeWidth={weight}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={style === "dashed" ? "1,10" : undefined}
      {...svgPathProps}
      style={{
        stroke: color || "var(--mafs-fg)",
        strokeOpacity: opacity,
        vectorEffect: "non-scaling-stroke",
        transform: "var(--mafs-view-transform)",
        ...(svgPathProps.style || {}),
      }}
    />
  )
}
