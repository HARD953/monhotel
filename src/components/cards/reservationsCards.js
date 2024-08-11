"use client"
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  DateRangePicker,
} from "@nextui-org/react";
import { useLocale } from "@react-aria/i18n";
import {
  today,
  getLocalTimeZone,
  parseAbsoluteToLocal,
} from "@internationalized/date";

import Image from "next/image";

import logo from "@/assets/images/Myhot/noBG/4_nobg.png";
import { formatNumberFCFA } from "@/utils/servicesUtils";
import { useQuery } from "@tanstack/react-query";
import { getDateFreeForReservationByChambre } from "@/api/chambres/chambres";
import { Message } from "primereact/message";

export default function ReservationsCards({
  onOpen,
  data,
  differentDays,
  periodeReservations,
  setPeriodeReservations,
  frais_reservation,
  disabledDates,
  setDisabledDates,
}) {
  let now = today(getLocalTimeZone());

  let { locale } = useLocale();

  let isDateUnavailable = (date) =>
    disabledDates?.some(
      (interval) =>
        date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0
    );

  const { data: listPeriodeFree } = useQuery({
    queryKey: ["chambre-periode-reservations", data?.id],
    queryFn: () => getDateFreeForReservationByChambre(data?.id),
  });

  const customizeDatePeriodes = (dates) => {
    try {
      return dates?.map((date) => [
        parseAbsoluteToLocal(date?.date_debut),
        parseAbsoluteToLocal(date?.date_fin),
      ]);
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    const dates = customizeDatePeriodes(listPeriodeFree);
    setDisabledDates(dates);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listPeriodeFree]);

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="d-flex gap-3 align-items-center ">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src={logo}
          width={40}
        />
        <div className="d-flex flex-col align-item-center">
          <p className="text-md py-0 my-0">Détails Reservation</p>
        </div>
      </CardHeader>
      <CardBody>
        <div className="d-flex justify-content-between align-items-center fw-bolder mb-4">
          <p className="py-0 my-0"> Tarif par Nuit :</p>
          <p className="py-0 my-0">
            {" "}
            {formatNumberFCFA(data?.prix_nuit)} F CFA{" "}
          </p>
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mb-3">
          <DateRangePicker
            label="Période réservation"
            visibleMonths={2}
            pageBehavior="single"
            // minValue={today(getLocalTimeZone())}
            isDateUnavailable={isDateUnavailable}
            value={periodeReservations}
            onChange={setPeriodeReservations}
          />
          {!periodeReservations?.start && !periodeReservations?.end && (
            <Message text="Spécifier votre péeriode de reseration" />
          )}
        </div>
        <div className="mt-3">
          <div className="d-flex justify-content-between algin-item-center my-2">
            <p> Montant ({differentDays} Jrs) </p>
            <p> {formatNumberFCFA(data?.prix_nuit * differentDays)} F</p>
          </div>
          <div className="d-flex justify-content-between algin-item-center my-2">
            <p> Frais réservation </p>
            <p> {formatNumberFCFA(frais_reservation)} F</p>
          </div>
          <div className="d-flex justify-content-between algin-item-center mt-4 fw-bold">
            <p> Total </p>
            <p>
              {" "}
              {formatNumberFCFA(
                data?.prix_nuit * differentDays + frais_reservation
              )}{" "}
              F
            </p>
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button
          className="me-3 w-100"
          radius="full"
          variant="ghost"
          color="danger"
          size="lg"
          onPress={onOpen}
          isDisabled={
            !!!periodeReservations?.start && !!!periodeReservations?.end
          }
        >
          Reserver
        </Button>
      </CardFooter>
    </Card>
  );
}
