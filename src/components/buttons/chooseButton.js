"use client"

import "@/assets/styles/chooseButton.css"

export default function ChooseButton({title,subTitle,icon,isClicked,...rest}){

    return(
        <div {...rest} className={`choose_button__container shadow-sm ${isClicked && "active choose_button_text_title_active"} `}>
            <div className="choose_button_icon_container">
                <i className={icon}></i>
            </div>
            <h5 className="choose_button_text_title" >{title}</h5>
        </div>
    )
}   