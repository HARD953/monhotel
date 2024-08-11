"use client"

import Image from "next/image";
import { Button } from 'primereact/button';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { MyInputRadio, MyTextInput } from "@/components/formik/myInputText";

import "@/assets/styles/compte/informations.css"


function Securite() {
    return ( 
        <section className="compte_informations_personnelles_container pb-5 px-md-3">
            <div 
            className="compte_informations_personnelles_form_container">
                <Formik
                    initialValues={{
                    current_password: "",
                    new_password: "",
                    confime_new_password: "", 
                    }}
                    validationSchema={
                        Yup.object({
                            current_password: Yup.string()
                                .required('Obligatoire'),
                            new_password: Yup.string()
                                .required('Required'),
                            confime_new_password: Yup.string()
                                .required('Required'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                       // setSubmitting(false);
                    }, 400);
                    }}  >

                    <Form>
                        <div className="mt-md-2 md-3">
                            <div className="row">
                                <div className="col-md-12">
                                    <MyTextInput
                                        label="Mot de passe actuel"
                                        name="current_password"
                                        placeholder=""
                                    />
                                </div>
                            </div>
                            <div className="row mt-md-5 mt-3">
                                <div className="col-md-6">
                                    <MyTextInput
                                        label="Nouveau mot de passe"
                                        name="new_password"
                                        placeholder=""
                                    />
                                </div>
                                <div className="col-md-6">
                                    <MyTextInput
                                        label="Confirmer le mot de passe"
                                        name="confime_new_password"
                                        placeholder=""
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-md-5 mt-2">
                            <div className="d-flex ">
                                <Button 
                                    rounded
                                    className="px-3 py-2"
                                    label="Enregistrer les modifications" />
                                <Button 
                                    rounded
                                    outlined
                                    className="px-3 py-2 ms-md-5 ms-1"
                                    label="Annuler" />
                            </div>
                        </div>

                    </Form>
                </Formik>
            </div>
        </section>
     );
}

export default Securite;