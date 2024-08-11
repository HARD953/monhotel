"use client"

function InputTextTemplate({label,children}) {
    return ( 
        <div className="p-md-3 p-1">
            <h5 className="fw-bolder h5">{label} </h5>
            {children}
        </div>
     );
}

export default InputTextTemplate;