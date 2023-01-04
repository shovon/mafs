import * as React from "react"
import { Stroked } from "../../display/Theme"
import { useScaleContext } from "../../view/ScaleContext"

export interface ImplicitFunctionProps extends Stroked {
  zero: (x: number, y: number) => number
  color?: string
  style?: "solid" | "dashed"
  minimumSamplingDepth?: number
  svgPathProps?: React.SVGProps<SVGPathElement>
}

export const ImplicitFunction: React.VFC<ImplicitFunctionProps> = ({
  zero,
  color,
  style = "solid",
  weight = 2,
  opacity = 1.0,
  minimumSamplingDepth = 8,
  svgPathProps = {},
}: ImplicitFunctionProps) => {
  const { cssScale, scaleX, scaleY } = useScaleContext()

  const svgPath = ""

  return (
    <path
      d={svgPath}
      strokeWidth={weight}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={style === "dashed" ? "1,10" : undefined}
      transform={cssScale}
      {...svgPathProps}
      style={{
        stroke: color || "var(--mafs-fg)",
        strokeOpacity: opacity,
        vectorEffect: "non-scaling-stroke",
        ...ImplicitFunction(svgPathProps.style || {}),
      }}
    />
  )
}
