export default function Button({...props}){
    return(
        <button onClick={props.onClick} 
                className={`${props.className}  block my-auto p-1 px-3 bg-opacity-70 rounded-md
                            ${props.color ? props.color : "bg-turquoise-50" } 
                            ${props.height ? props.height : "h-10"} 
                            hover:transition-all hover:bg-opacity-100
                            active:opacity-80
                            `}> 
            <div className={`${props.textClassName}`}> {props.text}{props.icon} </div>
        </button>
    )
}