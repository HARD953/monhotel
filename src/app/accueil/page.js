"use client"
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from "react";
import { ScrollTop } from 'primereact/scrolltop';

import {useDisclosure} from "@nextui-org/react";
import {Button as ButtonNextUI} from "@nextui-org/button";


import AppLayout from "../AppLayouts";
import AppButton from "@/components/buttons/AppButton";
import RechercheInputs from "@/components/recherche/rechercheInputs";
import ListeChambres from "@/components/listeChambre/listeChambres";
import FilterDialog from "@/components/dialogs/filterGialog";
import ChooseButton from "@/components/buttons/chooseButton";
import FiltresModal from "@/components/modals/filtresModal";
import RechercheMobileInputs from "@/components/recherche/rechercheMobileInputs";





export default function Page(){
    const selectedListIndexList = {
        tout:"Tout",
        hotels:"Hôtels",
        residences:"Résidences meublée"
    }

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['listeChambreHotelsResidences'],
        queryFn: async () =>{
            const response = await fetch(`https://myhot.up.railway.app/api/chambreshotelresid/`)
            if (!response.ok) {
            throw new Error('Network response was not ok')
            }
            
            return response.json()
        },
      })
    

    // const listeChambres = getListeChambre()
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [visibleFiler,setVisibleFiler] = useState(false)
    const [isSelected,setIsSelected] = useState(selectedListIndexList.tout)
    const [isLoading,setIsLoading] = useState(false)



    useEffect(( )=> {
        setIsLoading(isPending)
    },[isPending])

    return(
        <AppLayout>
            <section className="py-3 px-md-3  px-3">
            <ScrollTop />
            <div className="d-flex">
                    <ChooseButton 
                        onClick={()=>setIsSelected(selectedListIndexList.tout)}
                        icon="pi pi-align-justify"
                        title={selectedListIndexList.tout}
                        subTitle={"Chambres appropriées"}
                        isClicked={ isSelected===selectedListIndexList.tout}
                    />

                    <ChooseButton 
                        onClick={()=>setIsSelected(selectedListIndexList.hotels)}
                        icon="pi pi-building"
                        title={selectedListIndexList.hotels}
                        subTitle={"Chambres appropriées"}
                        isClicked={ isSelected===selectedListIndexList.hotels}
                    />

                    <ChooseButton 
                        onClick={()=>setIsSelected(selectedListIndexList.residences)}
                        icon="pi pi-home"
                        title={selectedListIndexList.residences}
                        subTitle={"Chambres appropriées"}
                        isClicked={ isSelected===selectedListIndexList.residences}
                    />
            </div>
            {/* <div className="">
                <RechercheInputs />
                <RechercheMobileInputs />
            </div> */}
            <div className="text-end mt-4">
                    <ButtonNextUI 
                        radius="full"
                        startContent={<i className="pi pi-sliders-h" ></i>}
                        variant="ghost"
                        onPress={onOpen} >
                        Filtres
                    </ButtonNextUI>
            </div>
            <ListeChambres 
                isPending={isLoading}
                selectedListIndexList={selectedListIndexList} 
                listSelected={isSelected} />
            <FilterDialog visible={visibleFiler} setVisible={setVisibleFiler}/>
            <FiltresModal isOpen={isOpen} onOpenChange={onOpenChange} />
            </section>

        </AppLayout>
    )
}