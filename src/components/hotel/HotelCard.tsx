"use client";

import { usePathname, useRouter } from "next/navigation";
import { HotelWithRooms } from "./AddHotelForm";
import { cn } from "@/lib/utils";
import Image from "next/image";
import AmenityItem from "../AmenityItem";
import { Dumbbell, MapPin } from "lucide-react";
import { Button } from "../ui/button";

const HotelCard = ({ hotel }: { hotel: HotelWithRooms }) => {
  const pathname = usePathname();
  const isMyHotels = pathname.includes("my-hotels");
  const router = useRouter();
  
    
  return (
    <div
      className={cn(
        " shadow-xl col-span-1 cursor-pointer transition hover:scale-105 ",
        isMyHotels && "cursor-default"
      )}
      onClick={() => !isMyHotels && router.push(`/hotel-details/${hotel.id}`)}
    >
      <div className="flex gap-2 bg-background/50 border border-primary/10 rounded-lg">
        <div className="flex-1 aspect-square overflow-hidden relative w-full h-[210px] rounded-s-lg">
          <Image
            fill
            src={hotel.image}
            alt={hotel.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between h-[210px] gap-1 p-1 py-2 text-sm">
          <h3 className="font-semibold text-xl">{hotel.title}</h3>
          <div className="text-primary/90">
            {hotel.description.substring(0, 45)}...
          </div>
          <div className="text-gray-500 flex flex-col">
            <AmenityItem>
              <MapPin className="w-3 h-3 " />
              <p className="text-xs">
                {hotel.city + ", " + hotel.state + ", " + hotel.country}
              </p>
            </AmenityItem>

            <p className="mt-5">
              {hotel.gym && (
                <AmenityItem>
                  {" "}
                  <Dumbbell className="w-3 h-3" />
                  <p className="text-xs">
                    Gym
                  </p>
                  
                </AmenityItem>
              )}
            </p>
          </div>
          <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {
                    
                    hotel.rooms[0]?.roomPrice && 
                    <>
                        <div className="text-xs font-semibold">
                            ${hotel.rooms[0].roomPrice}
                        </div>
                        <div className="text-xs"></div>
                    </>
                }
              </div>
              {!isMyHotels && <Button onClick={() => router.push(`/hotel/${hotel.id}`)} variant='outline'>Edit</Button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
