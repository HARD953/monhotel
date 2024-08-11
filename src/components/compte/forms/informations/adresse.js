"use client"

import Image from "next/image";
import { Button } from 'primereact/button';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { MyInputRadio, MyTextInput } from "@/components/formik/myInputText";

import "@/assets/styles/compte/informations.css"


function InformationsAdresse() {
    return ( 
        <section className="compte_informations_personnelles_container pb-5 px-md-3">
            <div 
            className="compte_informations_personnelles_form_container">
                <Formik
                    initialValues={{
                    pays: "",
                    ville: "",
                    localite: "", 
                    }}
                    validationSchema={
                        Yup.object({
                            pays: Yup.string()
                                .required('Obligatoire'),
                            ville: Yup.string()
                                .required('Required'),
                            localite: Yup.string()
                                .required('Required'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                       // setSubmitting(false);
                    }, 400);
                    }}  >

                    <Form>
                        <div className="mt-md-2 md-2">
                            <div className="row">
                                <div className="col-md-6">
                                    <MyTextInput
                                        label="Pays"
                                        name="pays"
                                        placeholder="Cote d'ivoire"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <MyTextInput
                                        label="Ville"
                                        name="ville"
                                        placeholder="Abidjan"
                                    />
                                </div>
                            </div>
                            <div className="row mt-md-5 mt-3">
                                <div className="col-md-12">
                                    <MyTextInput
                                        label="Localité ou commune"
                                        name="localite"
                                        placeholder="Treichville"
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

export default InformationsAdresse;