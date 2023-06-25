import { ExitIcon, TrashIcon } from "../../icons";
import Button from "../button";

export function DeleteConfirmation({...props}){
    

    return(
            <div className={`${props.popupActive ? "" : "hidden"} fixed left-0 top-0 bg-black-900/50 backdrop-blur w-full h-full flex justify-center`}>
                <div className="bg-black-900 h-64 top-1/4 absolute p-10 border-2 border-white-900/10 rounded-lg flex flex-col justify-between">
                    <div className="text-lg">Do you really want to delete this{props.entity ? `${props.entity}` : ""}? <br/> This action is irreversible.</div>
                    <div className="flex flex-row place-items-end justify-between gap-4"> 
                        <Button text="DELETE" icon={<TrashIcon className="w-7 h-7 relative my-auto"/>} onClick={() => props.setPopupActive(true)}
                                textClassName="uppercase text-lg font-semibold flex gap-1 my-auto" 
                                className="py-3 px-5 w-full max-xs:px-2 justify-center flex " height="h-14" color="bg-raspberry-500"/>
                        <Button text="Cancel" icon={<ExitIcon className="w-7 h-7 relative my-auto" fill="white"/>} onClick={() => props.setPopupActive(false)}
                                textClassName="uppercase text-lg font-semibold flex gap-1 my-auto" 
                                className="py-3 px-5 w-full max-xs:px-2 justify-center flex" height="h-14" color="bg-cornflower_blue-100/25 hover:bg-cornflower_blue-100/40"/>
                    </div>
                </div>
             </div>
    )
}