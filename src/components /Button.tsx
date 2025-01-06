

export type ButtonPropsType = {
    name:string
    callBack?:()=>void
}


export const  Button = (props:ButtonPropsType) =>{
    const{name,callBack}=props

    const onClickHandler = ()=>{
        if(callBack){
            callBack()
        }
    }
    return (
            <button onClick={onClickHandler}>{name}</button>
    )

}