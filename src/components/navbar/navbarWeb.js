"use client"
import { useRef } from "react"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

import { Avatar } from "primereact/avatar"
import { Menu } from "primereact/menu"


import {useDisclosure,User} from "@nextui-org/react";

import {Button as ButtonNextUI} from "@nextui-org/button";


import ConnexionModal from "../modals/connexionModal";
import logo from "@/assets/images/Myhot/noBG/4_nobg.png";
import styles from "@/assets/styles/navbarWeb.module.css"


export default function NavbarWeb(){
    const { data: session, status } = useSession()
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const menuLeft = useRef(null);
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
    signOut({ redirect: false }).then(() => {
      router.push('/');
    });
  };
    let items = [
      {
        command: () => {
          console.log("hello");
        },
        template: (item, options) => {
          return (
            <User
              className="px-3 py-2"
              name={session && session?.user?.name}
              description={session && session?.user?.email}
              avatarProps={{
                src: `${session?.user?.image}`,
              }}
            />
          );
        },
      },
      { separator: true },
      {
        label: "Mon compte",
        command: (e) => {
          router.push("/compte/informations");
        },
      },
      { separator: true },
      {
        label: "Dévenir Hote",
        command: (e) => {
          router.push("/compte/hote_signup");
        },
      },
      { separator: true },
      {
        label: "Deconnexion",
        command: (e) => handleLogout()
      },
    ];

    const isCurrentRoute = (route) => pathname === route;



    return (
      <nav className={styles.app_navbar_web}>
        <div className={styles.app_navbar_web_container}>
          <div className={styles.app_navbar_web_container_logo}>
            <Link
              className={styles.app_navbar_web_container_logo_link}
              href="/"
            >
              <Image
                src={logo}
                className="img-fluid"
                alt="Logo MYHOT"
                width={50}
                height={50}
              />
              MyHot
            </Link>
          </div>

          {status === "authenticated" ? (
            <div className="d-flex gap-5">
              <div className="d-flex justify-content-end algin-items-center gap-3">
                <ButtonNextUI
                  variant="ghost"
                  className={styles.app_navbar_web_container_sign_in}
                  onPress={() => router.push("/compte/reservations")}
                  color={
                    isCurrentRoute("/compte/reservations")
                      ? "danger"
                      : "default"
                  }
                >
                  Mes Rerservations
                </ButtonNextUI>
                <ButtonNextUI
                  variant="ghost"
                  className={styles.app_navbar_web_container_sign_in}
                  onPress={() => router.push("/compte/favoris")}
                  color={
                    isCurrentRoute("/compte/favoris") ? "danger" : "default"
                  }
                >
                  Mes Favoris
                </ButtonNextUI>
              </div>
              <Menu
                className="w-auto rounded-4"
                model={items}
                popup
                ref={menuLeft}
              />
              <ButtonNextUI
                onClick={(event) => menuLeft.current.toggle(event)}
                className="text-white"
                style={{ backgroundColor: "var( --myhot-primary-color)" }}
                radius="full"
                isIconOnly
                aria-label="Take a photo"
              >
                <i className="pi pi-align-left"></i>
              </ButtonNextUI>
            </div>
          ) : (
            <div
              className={styles.app_navbar_web_container_sign_in_up_container}
            >
              <ButtonNextUI
                variant="light"
                className={styles.app_navbar_web_container_sign_in}
                onPress={onOpen}
              >
                Inscription
              </ButtonNextUI>
              <ButtonNextUI
                variant="ghost"
                className={styles.app_navbar_web_container_sign_in}
                onPress={onOpen}
              >
                Connexion
              </ButtonNextUI>
            </div>
          )}
        </div>
        <ConnexionModal isOpen={isOpen} onOpenChange={onOpenChange} />
      </nav>
    );
}