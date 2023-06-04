export default function TextBox({...props}){
    return(
        <div className={`${props.wrapperStyle} w-full max-md:col-span-2 max-w-full h-20`}>
        <label className={`${props.labelStyle} block mb-3`} htmlFor="sort">{props.label}</label>
        <input className={`${props.inputStyle} p-2 h-10 w-full`} type={props.type ?? "text"} placeholder={props.placeHolder}/>
        </div>
    )
}