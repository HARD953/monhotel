"use client"
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from "react";
import { ScrollTop } from 'primereact/scrolltop';

import {Badge, useDisclosure} from "@nextui-org/react";
import {Button as ButtonNextUI} from "@nextui-org/button";


import AppLayout from "./AppLayouts";
import AppButton from "@/components/buttons/AppButton";
import RechercheInputs from "@/components/recherche/rechercheInputs";
import ListeChambres from "@/components/listeChambre/listeChambres";
import FilterDialog from "@/components/dialogs/filterGialog";
import ChooseButton from "@/components/buttons/chooseButton";
import FiltresModal from "@/components/modals/filtresModal";
import RechercheMobileInputs from "@/components/recherche/rechercheMobileInputs";
import useScreenViewport from '@/hooks/useScreenViewport';
import { getAllChambres } from '@/api/chambres/chambres';
import { useChambreFilter } from '@/services/context/ChambreFilterContext';


const endPointsList = {
  tout : "https://houseapi.up.railway.app/api/chambrelist/",
  hotels:"https://houseapi.up.railway.app/api/chambreshotel/",
  residences:"https://houseapi.up.railway.app/api/chambresresid/"
}

const selectedListIndexList = {
  tout:"Tout",
  hotels:"Hôtels",
  residences:"Résidences meublées"
}

export default function Page(){
  const {largeurViewport} = useScreenViewport()
  const {
    filtersChambre,
    setFiltersChambre,
    isResultsFilters,
    setIsResultsFilters,
  } = useChambreFilter();

  const querykeys = "liste-chambres"

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [visibleFiler,setVisibleFiler] = useState(false)
  const [isSelected,setIsSelected] = useState(selectedListIndexList?.tout)
  const [selectEndPoint,setSelectEndPoint] = useState(endPointsList?.tout)


  const [isHotels, setIsHotels] = useState(false);
  const [isResidences, setIsResidences] = useState(false);


  const {
    isLoading,
    isFetching,
    data: listChambres,
  } = useQuery({
    queryKey: [querykeys, isResultsFilters],
    queryFn: async() => {
      return !!isResultsFilters?
         await getAllChambres(filtersChambre) :
         await getAllChambres()
    },
  });



  const handleTypeLogementChange = (key)=>{
      setIsSelected(selectedListIndexList[key])
      setSelectEndPoint(endPointsList[key])
  }


  return (
    <AppLayout>
      <section className="py-3 px-md-3  px-3">
        <ScrollTop />
        <div className="d-flex">
          <ChooseButton
            onClick={() => handleTypeLogementChange("tout")}
            icon="pi pi-align-justify"
            title={selectedListIndexList.tout}
            subTitle={"Chambres appropriées"}
            isClicked={isSelected === selectedListIndexList.tout}
          />

          <ChooseButton
            onClick={() => handleTypeLogementChange("hotels")}
            icon="pi pi-building"
            title={selectedListIndexList.hotels}
            subTitle={"Chambres appropriées"}
            isClicked={isSelected === selectedListIndexList.hotels}
          />

          <ChooseButton
            onClick={() => handleTypeLogementChange("residences")}
            icon="pi pi-home"
            title={selectedListIndexList.residences}
            subTitle={"Chambres appropriées"}
            isClicked={isSelected === selectedListIndexList.residences}
          />
        </div>
        {/* <div className="">
                <RechercheInputs />
                <RechercheMobileInputs />
            </div> */}
        <div className="text-end mt-4">
          {!!isResultsFilters ? (
            <Badge
              isOneChar
              content={<i className="pi pi-check "></i>}
              color="danger"
              size="md"
            >
              <ButtonNextUI
                radius="full"
                color="danger"
                startContent={<i className="pi pi-sliders-h"></i>}
                variant="ghost"
                onPress={onOpen}
              >
                Filtres
              </ButtonNextUI>
            </Badge>
          ) : (
            <ButtonNextUI
              radius="full"
              startContent={<i className="pi pi-sliders-h"></i>}
              variant="ghost"
              onPress={onOpen}
            >
              Filtres
            </ButtonNextUI>
          )}
        </div>
        <ListeChambres
          isPending={isLoading || isFetching}
          listChambres={listChambres}
          selectedListIndexList={selectedListIndexList}
          listSelected={isSelected}
        />
        <FilterDialog visible={visibleFiler} setVisible={setVisibleFiler} />
        <FiltresModal
          largeurViewport={largeurViewport}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isHotels={isHotels}
          setIsHotels={setIsHotels}
          isResidences={isResidences}
          setIsResidences={setIsResidences}
          filtersChambre={filtersChambre}
          setFiltersChambre={setFiltersChambre}
          isResultsFilters={isResultsFilters}
          setIsResultsFilters={setIsResultsFilters}
        />
      </section>
    </AppLayout>
  );
}