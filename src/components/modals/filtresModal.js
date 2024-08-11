"use client"

import React, { useEffect, useState } from "react";

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Tabs, Checkbox,Slider, CheckboxGroup,Input,Select,SelectItem,Avatar, cn, Autocomplete, AutocompleteItem} from "@nextui-org/react";


import { liste_villes } from '@/lib/liste_villes';
import { getChambresFilted } from "@/api/chambres/chambres";
import { useQuery } from "@tanstack/react-query";
import { initialStateFilters } from "@/services/context/ChambreFilterContext";

const FilterInputs=({title,children})=>{

  return(
      <div className="mb-5">
          <h4 style={{fontSize:"14px"}} className="fw-bolder h4"> {title} </h4>
          <div className="pt-2">
              {children}
          </div>
      </div>
  )
}


export default function FiltresModal({
  isOpen,
  onOpenChange,
  largeurViewport,
  filtersChambre,
  setFiltersChambre,
  setIsResultsFilters,
}) {
  const listCities = liste_villes();
  const residenceTpes = [
    { name: "Résidences meublées", code: "residence" },
    { name: "Hôtels", code: "hotel" },
  ];
  const communes = [
    { label: "Abobo", value: "Abobo" },
    { label: "Treichville", value: "treichville" },
    { label: "Cocody", value: "cocody" },
    { label: "Marcory", value: "marcory" },
  ];

  const [modalSize, setModalSize] = React.useState("md");
  const [isHotels, setIsHotels] = useState(false);
  const [isResidences, setIsResidences] = useState(false);



  const {
    isLoading: isLoadingFilter,
    isFetching: isFetchingFilter,
    data: dataFilter,
  } = useQuery({
    queryKey: ["chambre-filtered-count", filtersChambre],
    queryFn: () => getChambresFilted(filtersChambre),
  });



  const setBudgetMin = (min) => {
    const maxBudget = Number(filtersChambre?.prix_max);
    const minValueNumber = Number(min);
    const valueValide =
      minValueNumber <= maxBudget ? minValueNumber : maxBudget;
    setFiltersChambre((prev) => ({
      ...prev,
      prix_min: valueValide,
    }));
  };

  const setBudgetMax = (max) => {
    const minBudget = Number(filtersChambre?.prix_min);
    const maxValueNumber = Number(max);
    const valueValide =
      maxValueNumber >= minBudget ? maxValueNumber : minBudget;
    setFiltersChambre((prev) => ({
      ...prev,
      prix_max: valueValide,
    }));
  };

  const handleBudget = (value) => {
    console.log("value slider ::", value);
    setFiltersChambre((prev) => ({
      ...prev,
      prix_max: value[1],
      prix_min: value[0],
    }));
  };

  const handleShowResults = ()=>{
    setIsResultsFilters(prev=>prev+1)
    onOpenChange(false)
  }

  const handleShowResultsReset = () => {
    setIsResultsFilters(0);
    onOpenChange(false);
    setFiltersChambre(initialStateFilters);
  };

  const handleChangeCheckBoxResidences = (value) => {
    console.log("value chackbox:::",value)
    // setFiltersChambre(initialStateFilters);
  };




  useEffect(() => {
    const size = largeurViewport < 768 ? "md" : "4xl";
    setModalSize(size);
  }, [largeurViewport]);



  return (
    <>
      <Modal
        placement="bottom-center"
        size={modalSize}
        isOpen={isOpen}
        isDismissable={false}
        scrollBehavior="inside"
        classNames={{
          closeButton: "bg-myhot-primary text-white",
        }}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-myhot-primary fw-bolder h2">
                Filtres
              </ModalHeader>
              <ModalBody>
                <section>
                  <FilterInputs title="Spécifier votre budget">
                    <Slider
                      aria-label="budget tranche"
                      aria-labelledby="budget"
                      formatOptions={{ style: "currency", currency: "XOF" }}
                      maxValue={1000000}
                      step={500}
                      minValue={500}
                      value={[
                        filtersChambre?.prix_min,
                        filtersChambre?.prix_max,
                      ]}
                      size="lg"
                      onChange={handleBudget}
                      classNames={{
                        base: "w-100 gap-3",
                        filler: "bg-myhot-primary",
                      }}
                    />

                    <div className="d-flex gap-4 mt-3">
                      <Input
                        type="number"
                        aria-label="Minimum"
                        label="Minimum"
                        max={filtersChambre?.prix_max}
                        value={filtersChambre?.prix_min}
                        onValueChange={setBudgetMin}
                        endContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              FCFA
                            </span>
                          </div>
                        }
                      />
                      <Input
                        type="number"
                        aria-label="Maximum"
                        label="Maximum"
                        min={filtersChambre?.prix_min}
                        value={filtersChambre?.prix_max}
                        onValueChange={setBudgetMax}
                        endContent={
                          <div className="pointer-events-none items-center">
                            <span className="text-default-400 text-small">
                              FCFA
                            </span>
                          </div>
                        }
                      />
                    </div>
                  </FilterInputs>

                  <FilterInputs title="Type de residence">
                    <div className="flex gap-5 px-3">
                      <Checkbox
                        isSelected={isHotels}
                        onChange={handleChangeCheckBoxResidences}
                        icon={<i className="pi pi-heart"></i>}
                        color="primary"
                      >
                        Hôtels
                      </Checkbox>
                      <Checkbox
                        isSelected={isResidences}
                        onValueChange={setIsResidences}
                        icon={<i className="pi pi-heart"></i>}
                        color="primary"
                      >
                        Résidences meublées
                      </Checkbox>
                    </div>
                  </FilterInputs>

                  <FilterInputs title="Spécifier un ville">
                    <Autocomplete
                      label="Selectionner une ville"
                      className="w-100"
                    >
                      {listCities.map((city) => (
                        <AutocompleteItem key={city.code} value={city.code}>
                          {city.name}
                        </AutocompleteItem>
                      ))}
                    </Autocomplete>
                  </FilterInputs>

                  <FilterInputs title="Selectionner des localités ou communes">
                    <Autocomplete
                      label="Selectionner une commune"
                      className="w-100"
                    >
                      {communes.map((commune) => (
                        <AutocompleteItem
                          key={commune.value}
                          value={commune.value}
                        >
                          {commune.label}
                        </AutocompleteItem>
                      ))}
                    </Autocomplete>
                  </FilterInputs>
                </section>
              </ModalBody>
              <ModalFooter className="flex justify-between">
                <Button
                  radius="full"
                  color="danger"
                  variant="ghost"
                  onPress={handleShowResultsReset}
                >
                  Annuler les filtres
                </Button>

                <Button
                  radius="full"
                  className="bg-myhot-primary text-white"
                  variant="ghost"
                  onPress={handleShowResults}
                >
                  Afficher resultats ( {dataFilter?.count || 0} )
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
