import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import Equipement from "../cards/equipement";

export default function EquipementsModal({isOpen, onOpenChange}) {

  return (
    <>
      <Modal
        isOpen={isOpen}
        scrollBehavior="inside"
        onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Liste des équipéments
              </ModalHeader>
              <ModalBody>
                <div className="detail_chambre__equipement">
                    <Equipement
                            icon="pi pi-wifi"
                            label="Wifi" />
                        <Equipement 
                            icon="pi pi-qrcode"
                            label="Cuisine" />
                        <Equipement 
                            icon="pi pi-sitemap"
                            label="Bain " />
                        <Equipement 
                            icon="pi pi-moon"
                            label="Télévision " />
                        <Equipement 
                            icon="pi pi-phone"
                            label="téléphone " />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Fermer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
