

export default function Equipement({label,icon}) {

    return(
        <div style={{
            padding:""
        }} className="d-flex justify-content-start align-items-center text-center m-2">
            <i className={icon}></i>
            <p className="px-3 my-0 fw-bolder"> {label} </p>
        </div>
    )
}