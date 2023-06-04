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

  export const SearchIcon = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      id="_x32_"
      width={800}
      height={800}
      viewBox="0 0 512 512"
      {...props}
    >
      <style>{`.st0{fill:${props.color}}`}</style>
      <path
        d="M172.625 102.4c-42.674 0-77.392 34.739-77.392 77.438 0 5.932 4.806 10.74 10.733 10.74 5.928 0 10.733-4.808 10.733-10.74 0-30.856 25.088-55.959 55.926-55.959 5.928 0 10.733-4.808 10.733-10.74 0-5.931-4.805-10.739-10.733-10.739z"
        className="st0"
      />
      <path
        d="M361.657 301.511c19.402-30.436 30.645-66.546 30.645-105.244C392.302 88.036 304.318 0 196.151 0c-38.676 0-74.765 11.25-105.182 30.663a197.588 197.588 0 0 0-60.31 60.345C11.257 121.444 0 157.568 0 196.267c0 108.217 87.998 196.266 196.151 196.266 38.676 0 74.779-11.264 105.197-30.677a197.596 197.596 0 0 0 60.309-60.345zm-101.899 18.731c-19.075 9.842-40.708 15.403-63.607 15.403-76.797 0-139.296-62.535-139.296-139.378 0-22.912 5.558-44.558 15.394-63.644 13.318-25.856 34.483-47.019 60.323-60.331 19.075-9.842 40.694-15.403 63.578-15.403 76.812 0 139.296 62.521 139.296 139.378 0 22.898-5.558 44.53-15.394 63.616-13.303 25.856-34.454 47.033-60.294 60.359zM499.516 439.154 386.275 326.13c-16.119 23.552-36.771 44.202-60.309 60.345l113.241 113.024c8.329 8.334 19.246 12.501 30.148 12.501 10.916 0 21.833-4.167 30.162-12.501 16.644-16.669 16.644-43.677-.001-60.345z"
        className="st0"
      />
    </svg>
  )
  
  export const FilterIcon  = (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={800}
        height={800}
        fill={props.fill}
        viewBox="0 0 24 24"
        {...props}
      >
        <path
          stroke={`${props.color}`}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 5.6c0-.56 0-.84-.11-1.054a.998.998 0 0 0-.436-.437C19.24 4 18.96 4 18.4 4H5.6c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C4 4.76 4 5.04 4 5.6v.737c0 .245 0 .367.028.482a1 1 0 0 0 .12.29c.061.1.148.187.32.36l5.063 5.062c.173.173.26.26.321.36.055.09.096.188.12.29.028.114.028.235.028.474v4.756c0 .857 0 1.286.18 1.544a1 1 0 0 0 .674.416c.311.046.695-.145 1.461-.529l.8-.4c.322-.16.482-.24.599-.36a1 1 0 0 0 .231-.374c.055-.158.055-.338.055-.697v-4.348c0-.245 0-.367.028-.482a.998.998 0 0 1 .12-.29c.06-.1.147-.186.317-.356l.004-.004 5.063-5.062c.172-.173.258-.26.32-.36.055-.09.096-.188.12-.29.028-.113.028-.235.028-.474V5.6Z"
        />
      </svg>
    )
   
  export function ShoppingCartSVG({...props}){
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        width={800}
        height={800}
        fill={props.color ?? "white"}
        viewBox="0 0 902.86 902.86"
        {...props}
        >
        <path d="M671.504 577.829 781.989 145.22H902.86v-68H729.174L703.128 179.2 0 178.697l74.753 399.129h596.751v.003zm14.262-330.641-67.077 262.64h-487.49L81.928 246.756l603.838.432zM578.418 825.641c59.961 0 108.743-48.783 108.743-108.744s-48.782-108.742-108.743-108.742H168.717c-59.961 0-108.744 48.781-108.744 108.742s48.782 108.744 108.744 108.744S277.46 776.858 277.46 716.897c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107 12.59-7.928 26.342-7.928 40.742.001 59.961 48.783 108.744 108.744 108.744zM209.46 716.897c0 22.467-18.277 40.744-40.743 40.744s-40.744-18.277-40.744-40.744c0-22.465 18.277-40.742 40.744-40.742 22.466 0 40.743 18.277 40.743 40.742zm409.702 0c0 22.467-18.277 40.744-40.743 40.744s-40.743-18.277-40.743-40.744c0-22.465 18.277-40.742 40.743-40.742s40.743 18.277 40.743 40.742z" />
      </svg>
    )
}

export function UserIcon({...props}){
  return(
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.width}
    viewBox="0 0 24 24"
    {...props}
    >
      <title />
      <g
        fill="none"
        stroke={`${props.color ? props.color : "white"}`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx={12} cy={7} r={4} />
      </g>
    </svg>
  )
}