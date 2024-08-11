import React from "react";
import {
        Modal,
        ModalContent,
        ModalHeader, 
        ModalBody,
        ModalFooter,
        Button,
        Select,
        SelectItem,
        Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  DateRangePicker,
    } from "@nextui-org/react";

import { liste_villes } from '@/lib/liste_villes';
import { Calendar } from "primereact/calendar";
import useScreenViewport from "@/hooks/useScreenViewport";
import ReservationSignUpInForm from "../forms/ReservationSignUpInForm";


export default function ReservationSignUpInModal({ isOpen, onOpenChange }) {
  const listCities = liste_villes();
  const { largeurViewport } = useScreenViewport();

  const [modalSize, setModalSize] = React.useState("sm");

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
                Authentification
              </ModalHeader>
              <ModalBody>
                <div className="">
                  <ReservationSignUpInForm />
                  {/*                   
                  <Input type="text" className="mb-3" label="Prénom" />
                  <Input type="text" className="my-3" label="Nom" />
                  <Input type="email" className="my-3" label="Email" />
                  <Input
                    type="text"
                    className="my-2"
                    label="Numéro téléphonique"
                  /> */}
                </div>

               
              </ModalBody>
              
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
