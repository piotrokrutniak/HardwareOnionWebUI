export function Dropdown({...props}){

    return(
        <div className="sticky max-md:col-span-2">
            <label className={`${props.showLabel ? "" : "hidden"} block mb-3`} htmlFor="sort">{props.label}</label>
            <select className="p-2 transition-all w-full text-white-900 bg-transparent border-2 rounded-md border-white-900/20 hover:cursor-pointer hover:border-white-900/40 focus:border-white-900/60" id="sort" name="Sort by" 
                    value={props.dropdownValue} 
                    onChange={(e)=>{props.setDropdownValue(props.detailId, e.target.value)}}>

            {props.dropdownValues.map((p) => (<DropdownOption text={p.name} value={p.id}/>))}
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