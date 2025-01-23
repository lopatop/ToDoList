

export type ButtonPropsType = {
    name:string
    callBack?:()=>void
    disabled?:boolean
    className?: string
}


export const  Button = (props:ButtonPropsType) =>{
    const{name,callBack,disabled,className}=props

    const onClickHandler = ()=>{
        if(callBack){
            callBack()
        }
    }
    return (
            <button className={className} onClick={onClickHandler} disabled={disabled}>{name}</button>
    )

}