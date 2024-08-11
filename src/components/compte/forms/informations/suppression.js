"use client"

import Image from "next/image";
import { Button } from 'primereact/button';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { MyCheckbox, MyInputRadio, MyTextInput } from "@/components/formik/myInputText";

import "@/assets/styles/compte/informations.css"


function InformationsSuppression() {
    return ( 
        <section className="compte_informations_personnelles_container pb-5 px-md-3">
            <div 
            className="compte_informations_personnelles_form_container">
                <Formik
                    initialValues={{
                    suppression: false,
                    }}
                    validationSchema={
                        Yup.object({
                            suppression: Yup.boolean()
                              .required('Obligatoire')
                              .oneOf([true], 'vous devez cocher cette case.'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                       // setSubmitting(false);
                    }, 400);
                    }}  >

                    <Form>
                        <div className="mt-md-2 md-2">
                            <div className="px-2 py-3">
                                <p>
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id esExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es 
                                </p>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <MyCheckbox
                                        label="Confirmer la suppression de votre compte"
                                        name="suppression"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-md-5 mt-2">
                            <div className="d-flex ">
                                <Button 
                                    rounded
                                    className="px-3 py-2 p-button-danger"
                                    label="Supprimer" />
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </section>
     );
}

export default InformationsSuppression;