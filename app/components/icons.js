import react from "react"

export function HamburgerIcon(props){ 
    return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={800}
      height={800}
      fill={props.fill ?? "none"}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke={props.color ?? "white"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 17h14M5 12h14M5 7h14"
      />
    </svg>
  )}