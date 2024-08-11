import CompteSideBar from "@/components/compte/compteSideBar";
import AppLayout from "../AppLayouts";
import "@/assets/styles/compte.css"


function CompteLayout({children}) {
    return (
        <AppLayout>
            <section className="compte_container">
                <section className="compte_container__header">
                    <h2> Mon Compte </h2>
                </section>
                <section className="compte_container__content">
                    <section className="compte_container__content__sidebar ">
                       <CompteSideBar />
                    </section>
                    <section className="compte_container__content__main">
                        {children}
                    </section>
                </section>
            </section>
        </AppLayout>
    );
}

export default CompteLayout;