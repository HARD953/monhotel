"use client"

import { formatDateStringWhithoutHours } from "@/utils/formatDate";
import { customizeImageSrc, formatNumberFCFA } from "@/utils/servicesUtils";
// import Image from "next/image";
import { Galleria } from "primereact/galleria";
import { Image } from "primereact/image";
import { useRef, useState } from "react";

function ReservationsCard({reservation={}}) {
    const chambre = reservation?.chambre || {}
    const images = chambre?.images || []
    const etablissement = reservation?.chambre?.etablissement || {};

    
    const galleria = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0); 


   const itemTemplate = (item) => {
     return (
       <Image
         src={customizeImageSrc(item?.url)}
         alt={"chambre_image"}
         style={{ width: "100%" }}
         // height="20rem"
       />
     );
   };

   const thumbnailTemplate = (item) => {
     return <Image src={customizeImageSrc(item?.url)} alt={"chambre_image"} />;
   };






    return (
      <section className="reservation_card shadow-lg rounded mb-5 p-3">
        <div className="row">
          <div className="col-md-2">
            <div className=" flex justify-content-center">
              <Galleria
                ref={galleria}
                value={images}
                numVisible={7}
                style={{ maxWidth: "850px" }}
                activeIndex={activeIndex}
                onItemChange={(e) => setActiveIndex(e.index)}
                circular
                fullScreen
                showItemNavigators
                showThumbnails={false}
                item={itemTemplate}
                thumbnail={thumbnailTemplate}
              />
              <div className="" >
                {images && (
                  <Image
                    width={120}
                    height={120}
                    src={customizeImageSrc(images?.[0]?.url)}
                    alt={images?.[0]?.url}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setActiveIndex(0);
                      galleria.current.show();
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <h4 className="fw-bolder h4">{chambre?.titre} </h4>
            <p className="text-secondary fw-bolder my-0 py-0">
              {etablissement?.titre} -{etablissement?.commune}
            </p>
            {/* <p className="text-secondary fw-bolder my-0 py-0">
              Abidjan - Treichville
            </p> */}
          </div>
          <div className="col-md-3">
            <p className="my-0 py-0 fw-bolder">
              {formatNumberFCFA(chambre?.prix_nuit)} par nuit
            </p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-6">
            <h4 className="text-secondary fw-bolder">Période</h4>
            <div className="d-flex justify-content-start align-items-center py-2">
              <p className="my-0 py-0 fw-bolder">
                {" "}
                {formatDateStringWhithoutHours(reservation?.date_debut)}{" "}
              </p>
              <p className="my-0 py-0 mx-3">au</p>
              <p className="my-0 py-0 fw-bolder">
                {formatDateStringWhithoutHours(reservation?.date_fin)}{" "}
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <h4 className="text-secondary fw-bolder">Période</h4>
            <div className="d-flex justify-content-start align-items-center py-2">
              <p className="my-0 py-0">1 Adulte - 0 Enfants </p>
            </div>
          </div>
          <div className="col-md-3">
            <h4 className="fw-bolder text-danger h4">
              {formatNumberFCFA(reservation?.montant_total)} F CFA
            </h4>
          </div>
        </div>
      </section>
    );
}

export default ReservationsCard;