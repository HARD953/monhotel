import NavbarWeb from "@/components/navbar/navbarWeb"
import React from "react"

export default function AppLayout({children}){

    return(
        <>
            <NavbarWeb/>
            <main className="accueil-container" >
                {children}
            </main>
        </>
    )
}