'use client';

import { Booking } from "@prisma/client";
import { HotelWithRooms } from "./AddHotelForm";
import useLocation from "@/hooks/useLocation";
import Image from "next/image";
import AmenityItem from "../AmenityItem";
import { MapPin } from "lucide-react";

const HotelDetailsClient = ({hotel, bookings}:{hotel: HotelWithRooms, bookings?:Booking[]}) => {

    const {getCountryByCode, getStateByCode} = useLocation();
    const country = getCountryByCode(hotel.country);
    const state = getStateByCode(hotel.country, hotel.state);


    return ( 
        <div className="flex flex-col gap-6 pb-2">
            <div className="aspect-square overflow-hidden relative w-full bg-red-200 h-[200px] md:h-[400px] rounded-md">
                <Image fill src={hotel.image} alt={hotel.title} className='object-cover' />
            </div>
            <div>
                <h3 className="text-2xl font-semibold">{hotel.title}</h3>
                <div className="font-semibold mt-4">
                    <AmenityItem> <MapPin className="h-4 w-4"/>{country?.name},{state?.name},{hotel.city}</AmenityItem>
                </div>
                <h3 className="font-semibold text-lg mt-4 mb-2">Location Details:</h3>
                <p className="text-primary/90 mb-2">{hotel.locationDescription}</p>
            </div>
        </div> 
    );
}
 
export default HotelDetailsClient;