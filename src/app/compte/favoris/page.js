"use client"

import { getFavoris } from "@/api/favoris/favoris";
import PanelCompteTemplate from "@/components/autres/panelCompteTemplate";
import ChambreCard from "@/components/cards/chambresCard";
import { useQuery } from "@tanstack/react-query";

import "@/assets/styles/listChambres.css";
import { Message } from "primereact/message";

function Page() {


    const {
      isLoading: isLoadingFavoris,
      isFetching: isFetchingFavoris,
      data: dataFavoris,
    } = useQuery({
      queryKey: ["chambres-favoris"],
      queryFn: () => getFavoris(),
    });



    return (
      <section className="w-100">
        <PanelCompteTemplate title="Mes favoris">
          <div className="">
            <h4 className="fw-bolder h4">
              Chambres favorites {dataFavoris?.length}
            </h4>
            <div className="">
              {!!dataFavoris?.length ? (
                <div className="listChambre__grid">
                  {dataFavoris?.map((data, index) => (
                    <ChambreCard
                      key={index}
                      data={data?.chambre}
                      isPending={isLoadingFavoris || isFetchingFavoris}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center mx-auto my-5">
                  <Message severity="info" text="Aucun Favoris" />
                </div>
              )}
            </div>
          </div>
        </PanelCompteTemplate>
      </section>
    );
}

export default Page;