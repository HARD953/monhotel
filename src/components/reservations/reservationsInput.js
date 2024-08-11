"use client"
import React, { useCallback, useRef, useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import { ListBox } from 'primereact/listbox';
import { addLocale, locale } from 'primereact/api';
import { InputNumber } from 'primereact/inputnumber';
import { Divider } from 'primereact/divider';
import { liste_villes } from '@/lib/liste_villes';

import "@/assets/styles/rechercheInputs.css"



const InputSearcBar = ({label,value,onClickFn})=>{
  return(
    <div className="w-100 p-0 mx-0">
      <Button 
        onClick={onClickFn}
        className="p-0 w-100 p-button-rounded p-button-text p-button-secondary" >
        <div className="mx-auto py-2">
          <p className="my-0 py-0 fw-bolder text-dark">{label} </p>
          <p className="my-0 py-0"> {value} </p>
        </div>
      </Button>
    </div>
  )
}


export default  function ReservationsInputs() {

  const listCities = liste_villes() 
  const refArrivee = useRef(null);
  const refDepart = useRef(null);
  const refPerssonnes = useRef(null);
  const refVille= useRef(null);

  const [location, setLocation] = useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [checkDateRange, setCheckDateRange] = useState(null);
  const [guestsAdultes, setGuestsAdultes] = useState(1);
  const [guestsEnfants, setGuestsEnfants] = useState(0);



  addLocale('fr', {
    firstDayOfWeek: 1,
    dayNames: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samédi'],
    dayNamesShort: ['Dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
    dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    monthNames: ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'],
    monthNamesShort:['jan','fév','mar','avr','mai','jui','juil','aoû','sep','oct','nov','déc'],
    today: "Aujourd'hui",
    clear: 'Effacer'
  });

  locale('fr');



  const onChangeDateRange = (value) => {
    setCheckDateRange(value)
    if(!!value?.length)
      setCheckIn(value[0]??"")
      setCheckOut(value[1]??"")
  }


  const onChooseCity = (event) => {
    setLocation(event?.value)
    refVille?.current?.toggle(event)
  }

  const customzeSelectedDate= (date) => (date?.toLocaleDateString("us"))
  

  const personnesValue = useCallback(()=>{
    const value= `
        ${!!guestsAdultes ? `${guestsAdultes} Adultes` : ""}
        ${(!!guestsEnfants && !!guestsAdultes )  ?` - ` : ""}
        ${!!guestsEnfants ? `${guestsEnfants} Enfants`:""}
    `
    return !!value ? value : "Nombre de personnes"
  },[guestsAdultes,guestsEnfants])


  return (
      <section className="mt-5 accueil-search">
        <div className="container" >
          <div  
            style={{borderRadius:"2rem"}}
            className="d-flex justify-content-between align-items-center shadow bg-white">
           
            <InputSearcBar 
              onClickFn={(e)=>refArrivee?.current?.toggle(e)}
              label="Arrivée" 
              value={!!checkIn?`${customzeSelectedDate(checkIn)}`:"Selectionner une date"} />
            <InputSearcBar
              onClickFn={(e)=>refDepart?.current?.toggle(e)}
              label="Depart"
              value={!!checkOut?`${customzeSelectedDate(checkOut)}`:"Selectionner une date"}/>
            <InputSearcBar 
              onClickFn={(e)=>refPerssonnes?.current?.toggle(e)}
              label="Personnes" 
              value={personnesValue()} />
{/*               
            <InputSearcBar 
              onClickFn={(e)=>refPerssonnes?.current?.toggle(e)}
              label="Reserver" 
              value={""} />
               */}
            {/* <div className='px-4'>
              <Button 
                label="Reserver"
                className="p-button-primary p-button  w-100 h-100"
                onClick={(e)=>refVille?.current?.toggle(e)} rounded text  />
            </div> */}
          </div>
        </div>

      {/* Overlay champ recherche ville */}
      <OverlayPanel 
        className="p-0 search-panel-overlay" ref={refVille}>
            <ListBox
              style={{
                margin:"0",
                border:"0",
                width:"100%",
              }}
              listStyle={{ height: '250px' }}
              filter 
              value={location} 
              onChange={(e) => onChooseCity(e)} 
              options={listCities} 
              optionLabel="name"
              className="w-full md:w-14rem border-none seacrh-listbox" />

      </OverlayPanel>

      {/* Overlay champ recherche ville arrivee */}
      <OverlayPanel 
        className="p-0 search-panel-overlay" ref={refArrivee}>

            <Calendar 
              style={{
                margin:"0",
                border:"0",
                width:"100%",
              }}
              minDate={new Date()}
              selectionMode="range"
              value={checkDateRange} 
              className="border-none search-calendar"
              inline
              numberOfMonths={2}
              onChange={(e) => onChangeDateRange(e.value)} />
      </OverlayPanel> 

      {/* Overlay champ recherche ville depart */}
      <OverlayPanel 
        className="p-0 search-panel-overlay" ref={refDepart}>
            <Calendar 
              style={{
                margin:"0",
                border:"0",
                width:"100%",
              }}
              minDate={new Date()}
              selectionMode="range"
              value={checkDateRange} 
              className="border-none search-calendar"
              inline
              numberOfMonths={2}
              onChange={(e) => onChangeDateRange(e.value)} />
      </OverlayPanel>

      {/* Overlay champ recherche nombre de paersonnes */}
      <OverlayPanel 
        className="p-0 search-panel-overlay" ref={refPerssonnes}>
           <div className="p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className=" d-flex justify-content-start align-items-center me-5 ">
                <p className="my-0 fw-bolder"> Adultes </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                        <InputNumber 
                          className="search-personnes"
                          value={guestsAdultes} 
                          onValueChange={(e) => setGuestsAdultes(e.value)} 
                          showButtons 
                          buttonLayout="horizontal" 
                          decrementButtonClassName="p-button-secondary p-button-outlined p-button-rounded me-4" 
                          incrementButtonClassName="p-button-secondary p-button-outlined p-button-rounded ms-4" 
                          incrementButtonIcon="pi pi-plus" 
                          decrementButtonIcon="pi pi-minus" />
                    </div>
            </div>
            <Divider type="solid" />
            <div className="d-flex justify-content-between align-items-center mt-4">
              <div className=" d-flex justify-content-start align-items-center me-5 ">
                <p className="my-0 fw-bolder"> Enfants </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                        <InputNumber 
                          className="search-personnes"
                          value={guestsEnfants} 
                          onValueChange={(e) => setGuestsEnfants(e.value)} 
                          showButtons 
                          buttonLayout="horizontal" 
                          decrementButtonClassName="p-button-secondary p-button-outlined p-button-rounded me-4" 
                          incrementButtonClassName="p-button-secondary p-button-outlined p-button-rounded ms-4" 
                          incrementButtonIcon="pi pi-plus" 
                          decrementButtonIcon="pi pi-minus" />
                    </div>
            </div>
           </div>
      </OverlayPanel>
      </section>
  );
}
