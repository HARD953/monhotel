"use client"

import "@/assets/styles/commentsCardSmall.css"
import { User } from "@nextui-org/react";


function CommentsCardSmall() {
    // const today = new Date();
    // const customizeToday = today.toLocaleDateString("us")

    return (
    <div className="comments_Card_small_container my-4 ">
        <div className="comments_Card_small__header_container my-0 py-0">
            <User   
                name="Vickytho eros "
                description={(
                    <div className="d-flex justify-content-start align-items-center">
                        <i className="pi pi-star text-primary" ></i> 
                        <span className="fw-bold text-dark h6 ms-1 my-0 py-0" > 4,5 </span>
                        <span className="h6 ms-1 my-0 py-0" > 
                           , 11/11/2023
                        </span>
                    </div>
                )}
                avatarProps={{
                    isBordered: true,
                    showFallback: true,
                    color:"success",
                    name:'JG',
                    src: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                }}
            />
        </div>
        <div className="">
            <p>
                Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès  est prêt ou que la mise en page est achevée. Généralement, on utilise un texte en faux
            </p>
        </div>
    </div>);
}

export default CommentsCardSmall;