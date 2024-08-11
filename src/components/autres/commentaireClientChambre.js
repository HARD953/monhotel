"use client"

import { useQuery } from "@tanstack/react-query";
import { RatingComponentStarAndValue } from "./RatingComponent";

import "@/assets/styles/commentaireClientChambre.css";
import { formatDateString } from "@/utils/servicesUtils";
import { getEvaluationByChambreIdAndStatus } from "@/api/chambres/chambres";
import { Avatar } from "@nextui-org/react";

export function CommentaireClientChambre({ evaluation }) {
  return (
    <section className="commentaire_client_chambre">
      <div className="d-flex justify-content-start algin-items-center gap-2">
        <Avatar
          size="lg"
          showFallback
          src="https://images.unsplash.com/broken"
          style={{
            backgroundColor: "var(--myhot-primary-color)",
            color: "#ffffff",
          }}
          fallback={<i className="pi pi-user"></i>}
        />
        <div className="">
          <h6 className="fw-bold my-0 text-capitalize">
            {evaluation?.client?.nom} {evaluation?.client?.prenom}
          </h6>
          <RatingComponentStarAndValue rateData={evaluation} />
          <p className="m-0 mt-1" style={{ fontSize: "13px" }}>
            {formatDateString(evaluation?.createdAt)}
          </p>
        </div>
      </div>
      <div className="mt-2">
        <p className="fs-6">{evaluation?.commentaire}</p>
      </div>
    </section>
  );
}

export default function CommentaireClientChambreMain({
  chambreId,
  approuve = true,
}) {
  const {
    data: dataChambreEvaluations,
    isLoading: isLoadingChambreEvaluations,
  } = useQuery({
    queryKey: ["chambre-details-evaluations", chambreId],
    queryFn: async () =>
      await getEvaluationByChambreIdAndStatus(chambreId, approuve),
  });

  if (!dataChambreEvaluations?.results?.length) return <></>;
  return (
    <div className="">
      <h4 className="h4"> Commentaires </h4>
      <div className="my-5 d-flex flex-wrap">
        {dataChambreEvaluations?.results?.map((evaluation, index) => {
          return (
            <CommentaireClientChambre key={index} evaluation={evaluation} />
          );
        })}
      </div>
    </div>
  );
}
