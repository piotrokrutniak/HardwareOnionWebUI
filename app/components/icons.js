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

  export function ArrowLeftIcon(props){
    return (
      <svg
        className={props.className}
        xmlns="http://www.w3.org/2000/svg"
        width={800}
        height={800}
        viewBox="-4.5 0 20 20"
        {...props}
      >
        <title>{"arrow_left [#335]"}</title>
        <path
          fill={props.fill ?? "white"}
          fillRule="evenodd"
          d="M10.634.292a1.063 1.063 0 0 0-1.464 0L.607 8.556a1.95 1.95 0 0 0 0 2.827l8.625 8.325c.4.385 1.048.39 1.454.01a.975.975 0 0 0 .01-1.425l-7.893-7.617a.975.975 0 0 1 0-1.414l7.83-7.557a.974.974 0 0 0 0-1.413"
        />
      </svg>
    )
  }

  export function ArrowRightIcon(props){
    return (
      <svg
        className={props.className}
        xmlns="http://www.w3.org/2000/svg"
        width={800}
        height={800}
        viewBox="-4.5 0 20 20"
        {...props}
      >
        <title>{"arrow_right [#336]"}</title>
        <path
          fill={props.color ?? "white"}
          fillRule="evenodd"
          d="M.366 19.708c.405.39 1.06.39 1.464 0l8.563-8.264a1.95 1.95 0 0 0 0-2.827L1.768.292A1.063 1.063 0 0 0 .314.282a.976.976 0 0 0-.011 1.425l7.894 7.617a.975.975 0 0 1 0 1.414L.366 18.295a.974.974 0 0 0 0 1.413"
        />
      </svg>
    )
  }

  export function ArrowDoubleLeftIcon(props){
    return(
      <svg
        className={props.className}
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
          d="m19 19-6.293-6.293a1 1 0 0 1 0-1.414L19 5M11 19l-6.293-6.293a1 1 0 0 1 0-1.414L11 5"
        />
      </svg>
    )
  }

  
  export function ArrowDoubleRightIcon(props){ 
    return(
      <svg
        className={props.className}
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
          d="m5.5 5 6.293 6.293a1 1 0 0 1 0 1.414L5.5 19M13.5 5l6.293 6.293a1 1 0 0 1 0 1.414L13.5 19"
        />
      </svg>
    )
  }

