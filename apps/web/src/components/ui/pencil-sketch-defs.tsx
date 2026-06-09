type PencilSketchDefsProps = {
  filterId: string;
};

export function PencilSketchDefs({ filterId }: PencilSketchDefsProps) {
  return (
    <defs>
      <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="2"
          seed="7"
          result="grain"
        />
        <feColorMatrix
          in="grain"
          type="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.4 1.25"
          result="grainMask"
        />
        <feComposite in="SourceGraphic" in2="grainMask" operator="in" result="grained" />
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.012"
          numOctaves="2"
          seed="4"
          result="warp"
        />
        <feDisplacementMap
          in="grained"
          in2="warp"
          scale="5"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
  );
}

export const PENCIL_INK_PINK = "#ec4f8e";
