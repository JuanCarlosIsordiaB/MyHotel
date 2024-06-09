"use client";

import { Booking } from "@prisma/client";
import { HotelWithRooms } from "./AddHotelForm";
import useLocation from "@/hooks/useLocation";
import Image from "next/image";
import AmenityItem from "../AmenityItem";
import { BarChart2Icon, Divide, MapPin } from "lucide-react";
import { MdLocalBar, MdOutlineFreeBreakfast } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { CiWifiOn } from "react-icons/ci";
import { MdOutlineLocalLaundryService } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { FaSprayCanSparkles } from "react-icons/fa6";
import RoomCard from "../room/RoomCard";

const HotelDetailsClient = ({
  hotel,
  bookings,
}: {
  hotel: HotelWithRooms,
  bookings?: Booking[];
}) => {
  const { getCountryByCode, getStateByCode } = useLocation();
  const country = getCountryByCode(hotel.country);
  const state = getStateByCode(hotel.country, hotel.state);

  return (
    <div className="flex flex-col gap-6 pb-2">
      <div className="aspect-square overflow-hidden relative w-full bg-red-200 h-[200px] md:h-[400px] rounded-md">
        <Image
          fill
          src={hotel.image}
          alt={hotel.title}
          className="object-cover"
        />
      </div>
      <div>
        <h3 className="text-2xl font-semibold">{hotel.title}</h3>
        <div className="font-semibold mt-4">
          <AmenityItem>
            {" "}
            <MapPin className="h-4 w-4" />
            {country?.name},{state?.name},{hotel.city}
          </AmenityItem>
        </div>
        <h3 className="font-semibold text-lg mt-4 mb-2">Location Details:</h3>
        <p className="text-primary/90 mb-2">{hotel.locationDescription}</p>
        <h3 className="font-semibold text-lg mt-4 mb-2">About this hotel:</h3>
        <p className="text-primary/90 mb-2">{hotel.description}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 content-start text-sm">
          {hotel.bar && (
            <AmenityItem>
              <MdLocalBar size={18} /> Bar
            </AmenityItem>
          )}
          {hotel.breakfast && (
            <AmenityItem>
              <MdOutlineFreeBreakfast size={18} /> Breakfast
            </AmenityItem>
          )}
          {hotel.freeWifi && (
            <AmenityItem>
              <CiWifiOn size={18} /> Free Wifi
            </AmenityItem>
          )}
          {hotel.gym && (
            <AmenityItem>
              <CgGym size={18} /> Gym
            </AmenityItem>
          )}
          {hotel.laundry && (
            <AmenityItem>
              <MdOutlineLocalLaundryService size={18} />
              Laundry
            </AmenityItem>
          )}
          {hotel.pool && (
            <AmenityItem>
              <MdOutlinePool size={18} /> Pool
            </AmenityItem>
          )}
          {hotel.spa && (
            <AmenityItem>
              <FaSprayCanSparkles size={18} /> Spa
            </AmenityItem>
          )}
        </div>
        <div>
          {!!hotel.rooms.length && (
            <div>
              <h3 className="text-lg font-semibold my-4">Hotel Rooms:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {hotel.rooms.map((room) => {
                  return (
                    <RoomCard
                      hotel={hotel}
                      room={room}
                      key={room.id}
                      bookings={bookings}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsClient;
