"use client"

import "@/assets/styles/detailsReservation.css"
import { Button } from "primereact/button"

const DetailsItems = ({label,value})=>{
    return(
        <div className="chambre_details_reservation_items_container">
            <p> {label} </p>
            <p> {value} </p>
        </div>
    )
}


const DetailsReservation=()=> {
    return ( 
        <section className="chambre_details_reservation">
            <div className="row py-5">
                <div className="col-md-10 col-lg-8 col-12 mx-auto">
                    <h4> Details réservations </h4>
                    <div className="chambre_details_reservation_content px-md-4 px-1">
                        <DetailsItems 
                            label="Frais services Myhot"
                            value="1 000 F CFA"
                        />
                        <DetailsItems 
                            label="Prix utnitaire ( 100 000 F CFA )  x  5 nuits"
                            value="500 000 F CFA"
                        />
                        <DetailsItems 
                            label="Autre services"
                            value="10 000 F CFA"
                        />
                        <DetailsItems 
                            label="Total"
                            value="511 000 F CFA"
                        />
                    </div>
                    <div className="chambre_details_reservation_btn_container">
                        <Button rounded raised className="py-2 px-4 fw-bolder" label="Reserver maintenant" />
                    </div>
                </div>
            </div>

        </section>
     );
}

export default DetailsReservation;