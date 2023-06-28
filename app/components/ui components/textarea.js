"use client";

export default function TextArea({...props}){
    //const onChange = props.formInput ? props.onChange(newValue) : props.onChange(id, newValue)

    function onChange(newValue){
        return props.formInput ? props.onChange(props.id, newValue) : props.onChange(newValue)
    }

    return(
        <div className={`${props.wrapperStyle} w-full max-md:col-span-2 max-w-full h-auto`}>
        <label className={`${props.labelStyle} ${props.label == true ? "" : "hidden"} block mb-3`} htmlFor="sort">{props.label}</label>
        <textarea onChange={(e) => onChange(e.target.value) ?? e} className={`${props.inputStyle} transition-all outline-white-900/30 outline outline-1 hover:outline-turquoise-50/60 focus:outline-turquoise-50 p-2 h-10 w-full`} 
                        type={props.type ?? "text"} defaultValue={props.defaultValue ?? ""} placeholder={props.placeHolder}/>
        </div>
    )
}