import ChambreCard from "../cards/chambresCard";
import "@/assets/styles/listChambres.css"

export default function ListeChambres({
  isPending,
  listSelected,
  selectedListIndexList,
  listChambres=[],
}) {
  return (
    <section className="mt-4">
      <div className="d-flex">
        <i className="pi pi-list px-2 list_chambre_title"></i>
        <h3 className="fw-bold list_chambre_title">
          Liste des chambres
          {listSelected === selectedListIndexList?.residences
            ? ` de résidences meublées`
            : listSelected === selectedListIndexList?.hotels
            ? ` d'hôtels`
            : ""}
        </h3>
      </div>
      <div className="">
        <div className="listChambre__grid">
          {
          listChambres?.map((chambre, index) => (
            <ChambreCard key={index} data={chambre} isPending={isPending} />
            )
          )}
          {/* <ChambreCard isPending={isPending} listSelected={listSelected} />
          <ChambreCard isPending={isPending} listSelected={listSelected} />
          <ChambreCard isPending={isPending} listSelected={listSelected} />

          <ChambreCard isPending={isPending} listSelected={listSelected} />
          <ChambreCard isPending={isPending} listSelected={listSelected} />
          <ChambreCard isPending={isPending} listSelected={listSelected} /> */}
        </div>
      </div>
    </section>
  );
}