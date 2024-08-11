
import React from "react";
import { Dialog } from 'primereact/dialog';
import { Button } from "primereact/button";

export default function SuccesDialog({visible, setVisible,returnUrl,msg}) {
 


   const onClose = ()=>{
    setVisible(false)
   }

    const footer =  ()=>{
        return(
            <div className="">
                 <Button
                    onClick={()=>onClose() }
                    label="Fermer"
                    className="rounded-pill p-button-success p-button-text"
                    icon="pi pi-times" />

            </div>
        )
    }

    return (
      <Dialog
        footer={footer}
        header={"Information"}
        visible={visible}
        style={{ width: "25vw" }}
        onHide={() => onClose()}
      >
        <section className="text-center px-4">
          <p className=" text-dark ">{msg}</p>
        </section>
      </Dialog>
    );
}
