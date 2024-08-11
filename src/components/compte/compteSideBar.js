"use client"
import Image from "next/image";


import "@/assets/styles/compteSideBar.css"
import Link from "next/link";
import { Divider } from "primereact/divider";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAuth } from "@/services/context/AuthContext";
import { Avatar } from "primereact/avatar";



const links = [
    {
        title:"Informations",
        href:"informations",
        icon:"pi pi-user"
    },
    {
        title:"Sécurité",
        href:"securite",
        icon:"pi pi-lock"
    },
    {
        title:"Notifications",
        href:"notifications",
        icon:"pi pi-bell"
    },
]

const linksTwo = [
    {
        title:"Mes réservations",
        href:"reservations",
        icon:"pi pi-credit-card"
    },
    {
        title:"Mes favoris",
        href:"favoris",
        icon:"pi pi-heart"
    },
]


const LinkCompte =({icon,title,href})=>{
    const pathname = usePathname()

    return(
        <Link href={href} className={`${pathname===href ? "active" :""} link_compte`}>
            <i className={icon}></i>
            <p>{title} </p>
        </Link>
    )
}



function CompteSideBar() {
        
    const { userInfo } = useAuth();
    const userPersonnalInfos = userInfo?.personne
    return (
      <section className="compte_sideBar shadow">
        <div className="compte_sideBar_img_container">
          <Avatar
            icon="pi pi-user"
            size="large"
            style={{
              backgroundColor: "var(--myhot-primary-color)",
              color: "#ffffff",
              height: 150,
              width: 150,
            }}
            shape="circle"
          />
        </div>
        <div className="compte_sideBar_info_container">
          <h4>
            {userPersonnalInfos?.prenom} {userPersonnalInfos?.nom}
          </h4>
          <p> {userPersonnalInfos?.email}</p>
        </div>
        <div className="compte_sidebar_items_container">
          {links?.map((link, index) => (
            <LinkCompte
              href={`/compte/${link.href}`}
              title={link.title}
              icon={link.icon}
              key={index}
            />
          ))}
          <hr />

          {linksTwo?.map((link, index) => (
            <LinkCompte
              href={`/compte/${link.href}`}
              title={link.title}
              icon={link.icon}
              key={index}
            />
          ))}
        </div>
      </section>
    );
}

export default CompteSideBar;