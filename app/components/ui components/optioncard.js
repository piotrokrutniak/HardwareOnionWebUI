import Link from "next/link"

export default function OptionCard({...props}){
    return(
        <Link href={props.href ?? "/"}>
                            <div className="bg-black-900/60 rounded-md p-4  mb-4 opacity-90 transition-all ease-in text-center h-20 shadow-md shadow-black-900/25
                                            text-xl font-semibold bg-gradient-to-r flex items-center justify-center
                                            hover:cursor-pointer hover:opacity-100 hover:border-opacity-0 hover:border-collapse
                                            hover:from-cornflower_blue-500 hover:to-turquoise-50 hover:border-0 hover:p-6
                                            active:opacity-80 
                                            ">
                                {props.label ?? "Label"}
                            </div>
        </Link>
    )
}

