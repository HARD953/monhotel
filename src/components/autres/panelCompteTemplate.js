"use client"

import { Panel } from "primereact/panel";


function PanelCompteTemplate({title,children}) {
    return (  
        <Panel
        className="rounded shadow mt-1 mt-md-1 mb-md-5"
        header={ 
            <div className="">
                <h4 className="fw-bolder h4 ps-2" > {title} </h4>
            </div>
        }
        toggleable
        pt={{
            header: { className: 'bg-white' },
            title: { className: 'text-dark' },
            toggler: { className: 'text-dark hover:bg-dark-reverse' }
        }}>
        
        {children}
      
    </Panel>
    );
}

export default PanelCompteTemplate;