import type { SVGProps } from 'react';

export function StartexHubLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 310 50" // Defines the coordinate system and aspect ratio
      {...props} // Allows passing className, style, etc.
    >
      <style>
        {`
          .sl-text { font-family: 'Inter', Arial, sans-serif; font-size: 36px; font-weight: bold; fill: hsl(var(--foreground)); letter-spacing: -0.5px;}
          .sl-text-hub { font-family: 'Inter', Arial, sans-serif; font-size: 36px; font-weight: bold; fill: hsl(var(--foreground)); letter-spacing: 0px;}
          .sl-a { fill: hsl(var(--primary)); }
        `}
      </style>
      
      {/* Text "ST" */}
      <text x="0" y="38" className="sl-text">ST</text>
      
      {/* Stylized "A" as a polygon */}
      {/* Points: (top-center), (bottom-left-outer), (bottom-left-inner), (inner-lower-peak), (bottom-right-inner), (bottom-right-outer) */}
      <polygon className="sl-a" points="75,6  50,40 60,40  75,22  90,40 100,40" />
      
      {/* Text "RTEX" */}
      <text x="104" y="38" className="sl-text">RTEX</text>
      
      {/* Text "HUB" with slightly more spacing before it */}
      <text x="230" y="38" className="sl-text-hub">HUB</text>
    </svg>
  );
}
