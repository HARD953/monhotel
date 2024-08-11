"use client"


import PanelCompteTemplate from "@/components/autres/panelCompteTemplate";
import Securite from "@/components/compte/forms/securite/securite";


function Page() {
    return (
        <section className="w-100" >
            <PanelCompteTemplate  title="Mot de passe"  >
                <Securite />
            </PanelCompteTemplate>
        </section>
    );
}

export default Page;