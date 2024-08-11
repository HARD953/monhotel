import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Divider} from "@nextui-org/react";


import "@/assets/styles/rechercheMobileInputs.css"
import RechercheMobileModal from '../modals/rechercheMobileModal';


function RechercheMobileInputs() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
    <section className="recherche_mobile" >
        <div onClick={()=>onOpen()} className="recherche_mobile__container shadow">
            <div className="d-flex justify-content-between align-items-center">
                <div >
                    <p className="recherche_mobile__ville" > Abidjan </p>
                    <div className="flex h-5 items-center space-x-4 text-small">
                        <div>
                            <div className="recherche_mobile__checking__container">
                                <p className="recherche_mobile__checking__items" > 
                                    20/10/2023
                                </p>
                                <p  className="recherche_mobile__checking__items ms-1 me-1" > au </p>
                                <p className="recherche_mobile__checking__items" > 
                                    20/11/2023
                                </p>
                            </div>
                        </div>
                        <Divider orientation="vertical" />
                        <div>
                            <p className="recherche_mobile__checking__items" > 
                                1 adulte - 1 enfants
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="recherche_mobile__icon__container">
                    <i className="pi pi-search"></i>
                </div>
            </div>
        </div>
    </section>


    <RechercheMobileModal
         isOpen={ isOpen}
         onOpenChange={ onOpenChange}
    />
    </>
  )
}

export default RechercheMobileInputs