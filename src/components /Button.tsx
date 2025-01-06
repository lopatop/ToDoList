

export type ButtonPropsType = {
    name: string
}

export const  Button = (props:ButtonPropsType) =>{
    const{name}=props
    return (
        <>
            <button>{name}</button>
        </>

    )

}