"use client"

import React,{useEffect, useState} from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Tabs, Tab, Card, CardBody,Input,Select,SelectItem,Avatar} from "@nextui-org/react";

import { Divider } from "primereact/divider";



export default function ConnexionModal({isOpen, onOpenChange}) {
    const { data: session, status } = useSession()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    console.log("result :::",result)
    if (result.ok) {
        
    } else {
      console.log(result.error);
    }
  };
    // useEffect(() => {
    //     if (!(status === "loading") && !session) void signIn("github");
    //     if (session) window.close();
    // }, [session, status]);

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Connexion ou Inscription
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit} className="">
                  {/* <Tabs aria-label="Options"> */}
                  {/* <Tab key="numero" title="Numéro téléphone">
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <small style={{fontSize:"11px"}}>
                                Nous vous enverons un message de verification sur votre numéro de téléphone
                            </small>


                            <Select
                            className="w-full"
                            label="Selectionner votre pays"
                            >
                            <SelectItem
                                key="argentina"
                                startContent={<Avatar alt="Argentina" className="w-6 h-6" src="https://flagcdn.com/ar.svg" />}
                            >
                                Argentina
                            </SelectItem>
                            <SelectItem
                                key="venezuela"
                                startContent={<Avatar alt="Venezuela" className="w-6 h-6" src="https://flagcdn.com/ve.svg" />}
                            >
                                Venezuela
                            </SelectItem>
                            <SelectItem
                                key="brazil"
                                startContent={<Avatar alt="Brazil" className="w-6 h-6" src="https://flagcdn.com/br.svg" />}
                            >
                                Brazil
                            </SelectItem>
                            <SelectItem
                                key="switzerland"
                                startContent={
                                <Avatar alt="Switzerland" className="w-6 h-6" src="https://flagcdn.com/ch.svg" />
                                }
                            >
                                Switzerland
                            </SelectItem>
                            <SelectItem
                                key="germany"
                                startContent={<Avatar alt="Germany" className="w-6 h-6" src="https://flagcdn.com/de.svg" />}
                            >
                                Germany
                            </SelectItem>
                            <SelectItem
                                key="spain"
                                startContent={<Avatar alt="Spain" className="w-6 h-6" src="https://flagcdn.com/es.svg" />}
                            >
                                Spain
                            </SelectItem>
                            <SelectItem
                                key="france"
                                startContent={<Avatar alt="France" className="w-6 h-6" src="https://flagcdn.com/fr.svg" />}
                            >
                                France
                            </SelectItem>
                            <SelectItem
                                key="italy"
                                startContent={<Avatar alt="Italy" className="w-6 h-6" src="https://flagcdn.com/it.svg" />}
                            >
                                Italy
                            </SelectItem>
                            <SelectItem
                                key="mexico"
                                startContent={<Avatar alt="Mexico" className="w-6 h-6" src="https://flagcdn.com/mx.svg" />}
                            >
                                Mexico
                            </SelectItem>
                            </Select>

                            <Input type="email" label="Numéro téléphone" />
                        </div>
                    </Tab> */}
                  {/* <Tab key="email" title="Email"> */}
                  {/* <small style={{fontSize:"11px"}} >
                                Nous vous enverons un email de verification
                            </small> */}

                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4 my-3">
                    <Input
                      value={email}
                      onValueChange={setEmail}
                      type="email"
                      label="Email"
                      variant="bordered"
                    />
                  </div>
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4 my-3">
                    {" "}
                    <Input
                      label="Password"
                      variant="bordered"
                      value={password}
                      onValueChange={setPassword}
                      placeholder="Entrez votre mot de passe"
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                        >
                          {isVisible ? (
                            <i className="text-2xl text-default-400 pointer-events-none pi pi-eye"></i>
                          ) : (
                            <i className="text-2xl text-default-400 pointer-events-none pi pi-eye"></i>
                          )}
                        </button>
                      }
                      type={isVisible ? "text" : "password"}
                      className=""
                    />
                  </div>
                  {/* </Tab>
                  </Tabs> */}

                  <div className="mt-5">
                    <Button
                      style={{ backgroundColor: "var( --myhot-primary-color)" }}
                      radius="full"
                      className="w-full text-white"
                      variant="solid"
                      type="submit"
                    >
                      Continuer
                    </Button>
                  </div>
                </form>

                <Divider align="center" type="solid">
                  {" "}
                  ou{" "}
                </Divider>
                <div className="mb-5">
                  <div className="">
                    <Button
                      isLoading={status === "loading" ? true : false}
                      onClick={() => signIn("google")}
                      radius="full"
                      className="w-full"
                      color="secondary"
                      variant="bordered"
                      startContent={<i className="pi pi-google"></i>}
                    >
                      Google
                    </Button>
                  </div>
                </div>
              </ModalBody>

              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
