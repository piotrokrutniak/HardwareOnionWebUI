export function Dropdown({...props}){

    function onChange(newValue){
        return props.formInput ? props.setDropdownValue(props.id, newValue) : props.setDropdownValue(newValue)
    }

    return(
        <div className={`${props.className ?? ""} sticky max-md:col-span-2`}>
            <label className={`${props.showLabel ? "" : "hidden"} block mb-3`} htmlFor="sort">{props.label}</label>
            <select className="p-2 transition-all w-full text-white-900 bg-transparent border-2 rounded-md border-white-900/20 hover:cursor-pointer hover:border-turquoise-50/40 focus:border-turquoise-50/60" id="sort" name="Sort by" 
                    value={props.dropdownValue} 
                    onChange={(e) => onChange(e.target.value) ?? e}>

            {props.dropdownValues.map((p) => (<DropdownOption text={p.name} value={p.id} key={p.id}/>))}
            </select>
        </div>
    )
}

function DropdownOption({...props}){
    
    return(
        <option className="font-sans inline-block text-black-900 focus:cursor-pointer" value={props.value}>
            {props.text}
        </option>
    )
}