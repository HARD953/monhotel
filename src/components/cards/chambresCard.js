"use client";
import React, { useEffect, useRef, useState } from "react";
import Gallery from "../gallery/Gallery";
import { Skeleton } from "primereact/skeleton";
import { useRouter } from "next/navigation";
import { formatNumberFCFA } from "@/utils/servicesUtils";
import { Button } from "@nextui-org/react";
import { EvaluationStars } from "../autres/Evaluation";
import { getEvaluationByChambreIdAndStatusSum } from "@/api/chambres/chambres";
import "@/assets/styles/chambresCard.css";
import { useQuery } from "@tanstack/react-query";


export default function ChambreCard({ isPending, data }) {
  const etablissement = data?.etablissement;

  const router = useRouter();

  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(true);

  const onClickCard = () => {
    router.push(`/chambre/${data?.id}`);
  };

  const { data: noteGlobaleChambre } = useQuery({
    queryKey: ["chambre-details-evaluations-sum", data?.id],
    queryFn: async () =>
      await getEvaluationByChambreIdAndStatusSum(data?.id, true),
  });


  useEffect(() => {
    setIsLoadingSkeleton(isPending);
  }, [isPending]);

  return (
    <div className="cardChambre border mx-auto">
      <div className="cardChambre__slider__container">
        <Gallery
          images={data?.images}
          chambre={data}
          isLoadingSkeleton={isLoadingSkeleton}
        />
      </div>
      {isLoadingSkeleton ? (
        <>
          <Skeleton className="mb-2"></Skeleton>
          <Skeleton width="7rem" className="mb-2"></Skeleton>
          <Skeleton width="7rem" className="mb-2"></Skeleton>
          <Skeleton width="4.6rem" className="mb-2"></Skeleton>
          <Skeleton height="1.5rem" width="8rem" className="mb-2"></Skeleton>
          <Skeleton width="10rem" className="mb-2"></Skeleton>
        </>
      ) : (
        <div className="cardChambre__content ">
          <div className="cardChambre__content__sup_style">
            <div className="cardChambre__header ps-2">
              <div className="mt-2">
                <h3 className="cardChambre__header__title h3">{data?.titre}</h3>
                <p className="cardChambre__header__type">
                  {data?.type_chambre?.type}
                </p>
                <EvaluationStars data={noteGlobaleChambre} />
              </div>
              <p className="cardChambre__header__position mt-2">
                <i className="pi pi-map-marker me-2"></i>
                {etablissement?.ville?.titre} - {etablissement?.pays?.titre}
              </p>
            </div>
            <div className="cardChambre__price px-2">
              <p className="fw-bolder">
                {formatNumberFCFA(data?.prix_nuit || 0)} F par nuit
              </p>
            </div>
          </div>
          <div className="cardChambre__button__container">
            <Button
              variant="none"
              className="w-100 py-3 button__style "
              radius="none"
              onPress={onClickCard}
            >
              Détails
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
