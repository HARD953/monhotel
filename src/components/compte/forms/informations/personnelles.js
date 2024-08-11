"use client"

import Image from "next/image";
import { useSession } from "next-auth/react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { MyInputRadio, MyTextInput } from "@/components/formik/myInputText";

import "@/assets/styles/compte/informations.css"
import { Button } from "@nextui-org/react";


function InformationsPersonnelles({data}) {
    const personne = data?.personne || {}
    console.log("personne ::",personne)
    return (
      <section className="compte_informations_personnelles_container pb-5 px-md-3">
        {/* <div className="compte_informations_personnelles_img_container">
                <Image
                    alt="image compte"
                    src={session?.user?.image}
                    width={500}
                    height={500}
                />

                <Button 
                    className="mt-3"
                    rounded 
                    label="Modifier ma photo" 
                    icon="pi pi-pencil" iconPos="right" />
            </div> */}
        <div className="compte_informations_personnelles_form_container">
          <Formik
            initialValues={{
              nom: `${personne?.prenom} ${personne?.nom}`,
              email: personne?.email,
              contact: personne?.telephone,
              civilite: "",
            }}
            validationSchema={Yup.object({
              nom: Yup.string()
                .required("Obligatoire"),
              email: Yup.string().email("email invalide").required("Required"),
              contact: Yup.string().required("Required"),
              civilite: Yup.string().required("Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                // setSubmitting(false);
              }, 400);
            }}
          >
            <Form>
              <div className="mt-md-5 md-3">
                <div className="row">
                  <div className="col-md-6">
                    <MyTextInput
                      label="Nom & prénom"
                      name="nom"
                      placeholder="Jane"
                    />
                  </div>
                  <div className="col-md-6">
                    <MyTextInput
                      label="Email"
                      name="email"
                      placeholder="alma.lawson@example.com"
                    />
                  </div>
                </div>
                <div className="row mt-md-5 mt-3">
                  <div className="col-md-12">
                    <MyTextInput
                      label="Numéro de téléphone"
                      name="contact"
                      placeholder="+225 07 0103 0204"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-md-5 mt-2">
                <h5 className="fw-bolder d-inline h5">Genre :</h5>
                <div className="d-flex  justify-content-around align-terms-center">
                  <MyInputRadio
                    label="Monsieur"
                    name="civilite"
                    value="monsieur"
                  />
                  <MyInputRadio label="Madame" name="civilite" value="madame" />
                  <MyInputRadio
                    label="Mademoiselle"
                    name="civilite"
                    value="mademoiselle"
                  />
                </div>
              </div>

              <div className="mt-md-5 mt-2">
                <div className="d-flex ">
                  <Button rounded color="primary" className="px-3 py-2">
                    Enregistrer les modifications
                  </Button>
                  <Button
                    rounded
                    outlined
                    color="danger"
                    className="px-3 py-2 ms-md-5 ms-1"
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </section>
    );
}

export default InformationsPersonnelles;