"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Chip } from "primereact/chip";
import { useMediaQuery } from "usehooks-ts";
import { useDisclosure } from "@nextui-org/react";

import { Button } from "@nextui-org/react";

import AppLayout from "@/app/AppLayouts";
import AppButton from "@/components/buttons/AppButton";
import Equipement from "@/components/cards/equipement";
import GalleryChambre from "@/components/gallery/GalleryChambre";
import CommentsCardSmall from "@/components/cards/commentsCardSmall";
import CommentsAll from "@/components/dialogs/comments";
import ReservationsInputs from "@/components/reservations/reservationsInput";
import DetailsReservation from "@/components/reservations/detailsReservation";

import EquipementsModal from "@/components/modals/equipementsModal";
import useScreenViewport from "@/hooks/useScreenViewport";
import ReservationModal from "@/components/modals/reservationModal";
import ReservationsCards from "@/components/cards/reservationsCards";
import { getChambre, getEvaluationByChambreIdAndStatusSum } from "@/api/chambres/chambres";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReservationSignUpInModal from "@/components/modals/reservationSignUpInModal";
import ChambreCard from "@/components/cards/chambresCard";

import "@/assets/styles/detailsChambre.css";
import ChambresOthers from "@/components/autres/ChambresOthers";
import { useSession } from "next-auth/react";
import { useAuth } from "@/services/context/AuthContext";
import { addFavoris, deleteFavoris, getFavoris } from "@/api/favoris/favoris";
import MapContainerMain from "@/components/maps/map";
import EquipementListItem from "@/components/autres/equipementListItem";
import CommentaireClientChambreMain from "@/components/autres/commentaireClientChambre";
import { EvaluationStars } from "@/components/autres/Evaluation";

const TabMenuChambre = ({ linkArray }) => {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(linkArray[0].href);

  return (
    <div className="details_chambre_tabmenu_links_container">
      {linkArray?.map((item, index) => {
        return (
          <Link
            onClick={() => setIsActive(item.href)}
            className={`${
              isActive === item.href && "details_chambre_tabmenu_links_active"
            }`}
            key={index}
            href={`${pathname}#${item?.href}`}
          >
            {" "}
            {item?.label}{" "}
          </Link>
        );
      })}
    </div>
  );
};

export default function Page({ params }) {
  const frais_reservation = 500;
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const { largeurViewport } = useScreenViewport();
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const idChambre = params?.id;

  const getChambreInfosQuery = ["chambre", idChambre];

  const {
    isOpen: isOpenEquipementModal,
    onOpen: onOpenEquipementModal,
    onOpenChange: onOpenChangeEquipementModal,
  } = useDisclosure();

  const {
    isOpen: isOpenReservationsModal,
    onOpen: onOpenReservationsModal,
    onOpenChange: onOpenChangeReservationsModal,
  } = useDisclosure();

  const {
    isOpen: isOpenReservationsSignUpInModal,
    onOpen: onOpenReservationsSignUpInModal,
    onOpenChange: onOpenChangeReservationsSignUpInModal,
  } = useDisclosure();

  const [activeIndex, setActiveIndex] = useState(1);
  const [visibleCommentsModal, setVisibleCommentsModal] = useState(false);
  const [isFavoris, setIsFavoris] = useState(false);
  const [periodeReservations, setPeriodeReservations] = useState({});
  const [differentDays, setDifferentDays] = useState(1);
  const [disabledDates, setDisabledDates] = useState([]);

  const {
    isLoading,
    isFetching,
    data: chambreData,
    fetchNextPage,
  } = useQuery({
    queryKey: getChambreInfosQuery,
    queryFn: () => getChambre(idChambre),
  });



  const { data: noteGlobaleChambre } = useQuery({
    queryKey: ["chambre-details-evaluations-sum", idChambre],
    queryFn: async () =>
      await getEvaluationByChambreIdAndStatusSum(idChambre, true),
  });


  const {
    isLoading: isLoadingFavoris,
    isFetching: isFetchingFavoris,
    data: dataFavoris,
  } = useQuery({
    queryKey: ["chambres-favoris-list"],
    queryFn: () => getFavoris(),
  });

  const mutationAddFavoris = useMutation({
    mutationKey: ["add-favoris", chambreData?.id],
    mutationFn: async () => {
      return await addFavoris({
        chambreId: chambreData?.id,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["chambre-favoris"]);
      setIsFavoris(true);
    },
    onError: async (err) => {
      console.log(err.message);
      // setVisibleError(true);
    },
  });

  const mutationDeleteFavoris = useMutation({
    mutationKey: ["delete-favoris", chambreData?.id],
    mutationFn: async () => {
      return await deleteFavoris({
        chambreId: chambreData?.id,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["chambre-favoris"]);
      setIsFavoris(false);
    },
    onError: async (err) => {
      console.log(err.message);
      // setVisibleError(true);
    },
  });

  const handleFavoris = () => {
    isFavoris ? mutationDeleteFavoris.mutate() : mutationAddFavoris.mutate();
  };

  // Fonction pour calculer le nombre de jours entre deux dates
  const getNumberOfDays = (start, end) => {
    try {
      const startDate = new Date(start?.toString());
      const endDate = new Date(end?.toString());

      const differenceInTime = endDate - startDate;
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);

      return differenceInDays + 1;
    } catch (error) {
      return 1;
    }
  };

  useEffect(() => {
    const _isFavoris = dataFavoris?.find(
      (fav) => fav?.chambre_id === chambreData?.id
    );
    if (_isFavoris) {
      setIsFavoris(true);
    } else {
      setIsFavoris(false);
    }
  }, [chambreData, dataFavoris]);

  useEffect(() => {
    const diffDays = getNumberOfDays(
      periodeReservations?.start,
      periodeReservations?.end
    );
    setDifferentDays(diffDays);
  }, [periodeReservations]);

  return (
    <AppLayout>
      <section className="py-3 px-md-3  px-3 container">
        <section className="">
          {/* <div className="mb-3">
            <h1 className="h1 fw-bolder">{chambreData?.titre}</h1>
            <Chip label={chambreData?.type_chambre?.type} icon="pi pi-home" />
          </div> */}
          <div className="row">
            <div className="col-md-9">
              <GalleryChambre images={chambreData?.images} />
            </div>
            <div className="col-md-3">
              <div className="">
                <div className="">
                  <Button
                    className="me-3"
                    radius="full"
                    variant="ghost"
                    //   color="success"
                    startContent={<i className="pi pi-share-alt"></i>}
                  >
                    Partager
                  </Button>
                  <Button
                    className="ms-3"
                    radius="full"
                    variant={`${isFavoris ? "solid" : "ghost"}`}
                    color="warning"
                    onPress={handleFavoris}
                    startContent={<i className="pi pi-heart"></i>}
                  >
                    Favoris
                  </Button>
                </div>
                <div className="shadow mt-5">
                  <ReservationsCards
                    data={chambreData}
                    differentDays={differentDays}
                    periodeReservations={periodeReservations}
                    setPeriodeReservations={setPeriodeReservations}
                    frais_reservation={frais_reservation}
                    disabledDates={disabledDates}
                    setDisabledDates={setDisabledDates}
                    onOpen={
                      isAuthenticated
                        ? onOpenReservationsModal
                        : onOpenReservationsSignUpInModal
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-1">
          <div className="row">
            <div className="col-md-9">
              <div className="">
                <div className="mt-2">
                  <h2 className="h2">{chambreData?.titre}</h2>
                  <p className="" style={{ marginTop: "-3rem !important" }}>
                    {chambreData?.type_chambre?.type}
                  </p>
                  <EvaluationStars data={noteGlobaleChambre} />
                </div>
                <p className="mt-2">
                  <i className="pi pi-map-marker me-2"></i>
                  {chambreData?.etablissement?.ville?.titre} -{" "}
                  {chambreData?.etablissement?.pays?.titre}
                </p>
              </div>
              <div className="mt-4">
                <h4>Description</h4>
                <p>{chambreData?.description}</p>
              </div>
              <div className="my-5">
                <h4>Emplacement</h4>
                <div className=" container shadow py-2">
                  <MapContainerMain
                    data={chambreData}
                    largeurViewport={largeurViewport}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="border p-2 rounded">
                <h4>Equipements</h4>
                <div className="mt-4 d-flex flex-wrap  justify-content-start">
                  <EquipementListItem
                    title="Mobilier"
                    data={chambreData?.equipements_mobilier}
                  />
                  <EquipementListItem
                    title="Electroniques"
                    data={chambreData?.equipements_electronique}
                  />
                  <EquipementListItem
                    title="Salle de bains"
                    data={chambreData?.equipements_salle_bains}
                  />
                  <EquipementListItem
                    title="Supplementaires"
                    data={chambreData?.equipements_suplementaires}
                  />
                  <EquipementListItem
                    title="Sécurité"
                    data={chambreData?.equipements_securite}
                  />
                  <EquipementListItem
                    title="Autres"
                    data={chambreData?.equipements_autres}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="">
          <CommentaireClientChambreMain chambreId={idChambre} approuve={true} />
        </section>
        <section>
          <div className="mt-5">
            <div className="mt-5">
              <h4> Vous pouvez être interessé par ces chambres </h4>
              <ChambresOthers />
            </div>
          </div>
        </section>
        <CommentsAll
          visible={visibleCommentsModal}
          setVisible={setVisibleCommentsModal}
        />
        <EquipementsModal
          isOpen={isOpenEquipementModal}
          onOpenChange={onOpenChangeEquipementModal}
        />
        <ReservationModal
          isOpen={isOpenReservationsModal}
          onOpenChange={onOpenChangeReservationsModal}
          data={chambreData}
          differentDays={differentDays}
          fraisReservation={frais_reservation}
          disabledDates={disabledDates}
          periodeReservations={periodeReservations}
          setPeriodeReservations={setPeriodeReservations}
          getChambreInfosQuery={getChambreInfosQuery}
        />
        <ReservationSignUpInModal
          isOpen={isOpenReservationsSignUpInModal}
          onOpenChange={onOpenChangeReservationsSignUpInModal}
        />
      </section>
    </AppLayout>
  );
}
