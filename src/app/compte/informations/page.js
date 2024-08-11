"use client"


import PanelCompteTemplate from "@/components/autres/panelCompteTemplate";
import InformationsAdresse from "@/components/compte/forms/informations/adresse";
import InformationsPersonnelles from "@/components/compte/forms/informations/personnelles";
import InformationsSuppression from "@/components/compte/forms/informations/suppression";
import { useAuth } from "@/services/context/AuthContext";



function Page() {
    const { userInfo } = useAuth();



    return (
      <section className="w-100">
        <PanelCompteTemplate title="Informations personnelles">
          <InformationsPersonnelles data={userInfo} />
        </PanelCompteTemplate>

        <PanelCompteTemplate title="Adresse">
          <InformationsAdresse data={userInfo} />
        </PanelCompteTemplate>

        <PanelCompteTemplate title="Supprimer mon compte">
          <InformationsSuppression data={userInfo} />
        </PanelCompteTemplate>
      </section>
    );
}

export default Page;