"use client"
import { Button } from "primereact/button";


export default function AppButton({className,label,icon,...rest}){

    return(
        <Button {...rest} className={`${className}`} aria-label={label}>
            <i className={icon}></i>
            <span className="px-3 fw-bolder"> {label} </span>
        </Button>
    )
}