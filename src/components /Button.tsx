

export type ButtonPropsType = {
    name:string
    callBack?:()=>void
    disabled?:boolean
}


export const  Button = (props:ButtonPropsType) =>{
    const{name,callBack,disabled}=props

    const onClickHandler = ()=>{
        if(callBack){
            callBack()
        }
    }
    return (
            <button onClick={onClickHandler} disabled={disabled}>{name}</button>
    )

}