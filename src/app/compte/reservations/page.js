"use client"


import { TabPanel, TabView } from "primereact/tabview";

import {Tabs, Tab} from "@nextui-org/react";
import { Button } from "primereact/button";
import PanelCompteTemplate from "@/components/autres/panelCompteTemplate";
import ReservationsCard from "@/components/cards/reservations";
import { useAuth } from "@/services/context/AuthContext";
import { getReservationsAnnulees, getReservationsEnAttentes, getReservationsEnCours, getReservationsTerminees } from "@/api/reservations/reservations";
import { useQuery } from "@tanstack/react-query";
import { Message } from "primereact/message";


function Page() {
    const {userInfo} = useAuth()



    
    const {
      isLoading: isLoadingReservationEnAttente,
      isFetching: isFetchingReservationEnAttente,
      data: dataReservationEnAttente,
      
    } = useQuery({
      queryKey: ["reservations-me-en-attentes"],
      queryFn: () => getReservationsEnAttentes(),
    });

    const {
      isLoading: isLoadingReservationEnCours,
      isFetching: isFetchingReservationEnCours,
      data: dataReservationEnCours,
    } = useQuery({
      queryKey: ["reservations-me-en-cours"],
      queryFn: () => getReservationsEnCours(),
    });

    const {
      isLoading: isLoadingReservationAnnulee,
      isFetching: isFetchingReservationAnnulee,
      data: dataReservationAnnulee,
      fetchNextPage,
    } = useQuery({
      queryKey: ["reservations-me-annulees"],
      queryFn: () => getReservationsAnnulees(),
    });

    const {
      isLoading: isLoadingReservationTerminee,
      isFetching: isFetchingReservationTerminee,
      data: dataReservationTerminee,
    } = useQuery({
      queryKey: ["reservations-me-terminees"],
      queryFn: () => getReservationsTerminees(),
    });


    

    const headerTemplate = (options,title) => {

        return (
            <Button 
                label={title} 
                onClick={options.onClick} 
                className="px-2" 
                severity="help" 
                text />
            )
    };






    return (
      <section className="w-100">
        <PanelCompteTemplate title="Mes réservations">
          <div className="">
            <div className="flex w-full flex-col">
              <Tabs
                color="warning"
                variant="bordered"
                radius="full"
                aria-label="Options"
              >
                <Tab
                  key="reservation_en_attentes"
                  title={`Réservation en attentes (${dataReservationEnAttente?.results?.length})`}
                >
                  <div className="">
                    {!!dataReservationEnAttente?.results?.length ? (
                      dataReservationEnAttente?.results?.map(
                        (reservation, index) => (
                          <ReservationsCard
                            reservation={reservation}
                            key={index}
                          />
                        )
                      )
                    ) : (
                      <div className="text-center my-5">
                        <Message
                          severity="info"
                          text="Aucune Reservation en Attentes"
                        />
                      </div>
                    )}
                  </div>
                </Tab>
                <Tab
                  key="reservation_en_cours"
                  title={`Réservation en cours (${dataReservationEnCours?.results?.length})`}
                >
                  <div className="">
                    {!!dataReservationEnCours?.results?.length ? (
                      dataReservationEnCours?.results?.map(
                        (reservation, index) => (
                          <ReservationsCard
                            reservation={reservation}
                            key={index}
                          />
                        )
                      )
                    ) : (
                      <div className="text-center my-5">
                        <Message
                          severity="info"
                          text="Aucune Reservation en Cours"
                        />
                      </div>
                    )}
                  </div>
                </Tab>
                <Tab
                  key="reservation_en_annulees"
                  title={`Réservation terminées (${dataReservationAnnulee?.results?.length})`}
                >
                  <div className="">
                    {!!dataReservationAnnulee?.results?.length ? (
                      dataReservationAnnulee?.results?.map(
                        (reservation, index) => (
                          <ReservationsCard
                            reservation={reservation}
                            key={index}
                          />
                        )
                      )
                    ) : (
                      <div className="text-center my-5">
                        <Message
                          severity="info"
                          text="Aucune Reservation Annulée"
                        />
                      </div>
                    )}
                  </div>
                </Tab>
                <Tab
                  key="reservation_en_terminees"
                  title={`Réservation terminées (${dataReservationTerminee?.results?.length})`}
                >
                  <div className="">
                    {!!dataReservationTerminee?.results?.length ? (
                      dataReservationTerminee?.results?.map(
                        (reservation, index) => (
                          <ReservationsCard
                            reservation={reservation}
                            key={index}
                          />
                        )
                      )
                    ) : (
                      <div className="text-center my-5">
                        <Message
                          severity="info"
                          text="Aucune Reservation Terminée"
                        />
                      </div>
                    )}
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </PanelCompteTemplate>
      </section>
    );
}

export default Page;