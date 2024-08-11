import React from "react";
import {
        Modal,
        ModalContent,
        ModalHeader, 
        ModalBody,
        ModalFooter,
        Button,
        Select,
        SelectItem
    } from "@nextui-org/react";

    import { liste_villes } from '@/lib/liste_villes';
import { Calendar } from "primereact/calendar";


export default function RechercheMobileModal({isOpen, onOpenChange}) {
  const listCities = liste_villes() 

  return (
    <>
      <Modal 
        placement="bottom"
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Recherche</ModalHeader>
              <ModalBody>
                <div className="">
                    <Select
                        labelPlacement="outside"
                        variant="bordered"
                        radius="full"
                        size="lg"
                        label="Dans quelle ville ?"
                        placeholder="Selectionner une ville"
                        className="full"
                    >
                        {listCities.map((city) => (
                        <SelectItem key={city.code} value={city.code}>
                            {city.name}
                        </SelectItem>
                        ))}
                    </Select>
                </div>  
                <div className="">
                    
                <Calendar
                   
                    minDate={new Date()}
                    selectionMode="range"
                    value={null} 
                    className=" "
                    
                    numberOfMonths={2}
                    onChange={(e) => ""} />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Fermer
                </Button>
                {/* <Button color="primary" onPress={onClose}>
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
