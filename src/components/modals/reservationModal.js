import React, { useState } from "react";
import {
        Modal,
        ModalContent,
        ModalHeader, 
        ModalBody,
        ModalFooter,
        Button,
        DateRangePicker,
    } from "@nextui-org/react";

    
import useScreenViewport from "@/hooks/useScreenViewport";
import { formatNumberFCFA } from "@/utils/servicesUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReservation } from "@/api/reservations/reservations";
import SuccesDialog from "../dialogs/succesDialog";
import ErrorDialog from "../dialogs/errorDialog";
import { formatDateToYearMonthDay } from "@/utils/formatDate";
import { useAuth } from "@/services/context/AuthContext";


export default function ReservationModal({
  isOpen,
  onOpenChange,
  data,
  differentDays,
  fraisReservation,
  periodeReservations,
  setPeriodeReservations,
  isDateUnavailable,
  getChambreInfosQuery,
}) {

  
  const { userInfo } = useAuth();
  const queryClient = useQueryClient()
  const { largeurViewport } = useScreenViewport();
  const [modalSize, setModalSize] = useState("sm");
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleError, setVisibleError] = useState(false);
  const [errorMesg, setErrorMesg] = useState("");
  const [vsibleDialoMsg, setVisibleDialoMsg] = useState("");

  const mutationAdd = useMutation({
    mutationKey: ["make-reservation"],
    mutationFn: async (newData) => {
      return await addReservation(newData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(getChambreInfosQuery);
      onOpenChange(false);
      setVisibleDialoMsg("Reservation effectuée avec succès.");
      setVisibleAdd(true);
    },
    onError: async (err) => {
      setErrorMesg(err.message);
      setVisibleError(true);
    },
  });

  const makeReservation = () => {
    const start = periodeReservations?.start;
    const end = periodeReservations?.end;
    const startDate = new Date(start?.toString());
    const endDate = new Date(end?.toString());
    const reservationFormData = {
      dateDebut: formatDateToYearMonthDay(startDate),
      dateFin: formatDateToYearMonthDay(endDate),
      nombrePersonne: 1,
      chambreId: data?.id,
      personneId: userInfo?.personne?.id,
    };
    mutationAdd.mutate(reservationFormData);
  };

  React.useEffect(() => {
    const size = largeurViewport < 768 ? "md" : "lg";
    setModalSize(size);
  }, [largeurViewport]);

  return (
    <>
      <Modal
        placement="auto"
        size={modalSize}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h4>Confirmation de la Reservation</h4>
              </ModalHeader>
              <ModalBody>
                <h5 className="h5">Informations Réservations</h5>

                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <DateRangePicker
                    label="Période réservation"
                    visibleMonths={2}
                    pageBehavior="single"
                    isDateUnavailable={isDateUnavailable}
                    value={periodeReservations}
                    onChange={setPeriodeReservations}
                  />
                </div>
                <div className="">
                  <div className="mt-3">
                    <div className="d-flex justify-content-between algin-item-center my-2">
                      <p> Montant ({differentDays} Jrs) </p>
                      <p>
                        {" "}
                        {formatNumberFCFA(data?.prix_nuit * differentDays)} F
                      </p>
                    </div>
                    <div className="d-flex justify-content-between algin-item-center my-2">
                      <p> Frais réservation </p>
                      <p> {formatNumberFCFA(fraisReservation)} F</p>
                    </div>
                    <div className="d-flex justify-content-between algin-item-center mt-4 fw-bold">
                      <p> Total </p>
                      <p>
                        {" "}
                        {formatNumberFCFA(
                          data?.prix_nuit * differentDays + fraisReservation
                        )}{" "}
                        F
                      </p>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  radius="full"
                  size="lg"
                  className="bg-myhot-primary text-white fw-bolder"
                  variant="light"
                  onPress={makeReservation}
                >
                  Envoyer la démande de réservation
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <SuccesDialog
        visible={visibleAdd}
        setVisible={setVisibleAdd}
        msg={vsibleDialoMsg}
      />
      <ErrorDialog
        visible={visibleError}
        setVisible={setVisibleError}
        msg={!!errorMesg ? errorMesg : "Une erreur est survenue. Réessayez!!"}
      />
    </>
  );
}
