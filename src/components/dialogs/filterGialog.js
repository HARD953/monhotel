"use clien"
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { Slider } from 'primereact/slider';
import { useState } from 'react';
import RadiosInputs from './radiosInputs';
import Equipement from '../cards/equipement';

const FilterInputs=({title,children})=>{

    return(
        <div className="my-5">
            <h4 className="fw-bolder"> {title} </h4>
            <div className="pt-2 mx-5">
                {children}
            </div>
        </div>
    )
}


export default function FilterDialog({visible,setVisible}){
    const [value, setValue] = useState([20,80])

    const onChangeBudgetValue=(valueInsert,key)=>{
        let valueNumber = parseInt(valueInsert)
        let budget = [...value]
        budget[key] = valueNumber
        setValue(budget)
    }

    return(
        <Dialog 
            header="Filtres" 
            position='top'
            visible={visible} 
            style={{ width: '50vw' }} 
            onHide={() => setVisible(false)}>
                <FilterInputs title="Votre budget par nuit">
                    <div className="mt-3">
                        <Slider value={value} onChange={(e) => setValue(e.value)} range />
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-5 mt-2">
                            <InputNumber
                                locale="fr-FR"
                                currency="XOF"
                                mode="currency"
                                inputClassName="w-100 rounded-pill px-3"
                                className="w-100"
                                value={value[0]} 
                                onValueChange={(e) => onChangeBudgetValue(e.value,0)}
                                min={0}
                                max={100} />
                        </div>
                        <div className="col-md-1 text-center"> 
                            <span className="fw-bolder"> - </span>
                         </div>
                        <div className="col-md-5  mt-2">
                            <InputNumber
                                locale="fr-FR"
                                currency="XOF"
                                mode="currency"
                                inputClassName="w-100 rounded-pill px-3"
                                className="w-100"
                                value={value[1]} 
                                onValueChange={(e) => onChangeBudgetValue(e.value,1)}
                                min={0}
                                max={100} />
                        </div>
                    </div>
                </FilterInputs>
                <FilterInputs title="Commune">
                    <RadiosInputs />
                </FilterInputs>
                <FilterInputs title="Moyen de réglement réservation">
                    <div className="">
                        <Equipement label="En ligne" icon="" />
                        <Equipement label="En spèce" icon="" />
                    </div>
                </FilterInputs>
            <p className="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </Dialog>
    )
}