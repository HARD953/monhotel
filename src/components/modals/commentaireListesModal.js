import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import CommentsCardSmall from "../cards/commentsCardSmall";

export default function CommentaireListesModal({isOpen, onOpenChange,comments}) {

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
                <div>
                    <h2 className="fw-bold h5 pb-2 ">
                        Quadruple private 4 bed room  Quadruple private 4 bed room
                    </h2>
                    <div 
                      className="d-flex align-items-center ">
                        <i className="pi pi-star text-primary" ></i>
                        <p 
                            className="my-0 fw-bold" >
                            4,5 -  100 avis
                        </p>
                    </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="">
                  {
                    comments?.map((comment,index)=>(
                        <CommentsCardSmall key={index} />
                    ))
                  }
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
