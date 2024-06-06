"use client";

import { Booking, Hotel, Room } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";
import Image from "next/image";
import AmenityItem from "../AmenityItem";
import {
  AirVent,
  Bath,
  Bed,
  DoorOpen,
  Loader2,
  MountainIcon,
  Pencil,
  Plus,
  Router,
  Ship,
  SunIcon,
  Trash,
  Trees,
  Tv,
  Users,
  UtensilsCrossed,
  VolumeX,
  Wifi,
} from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import AddRoomForm from "./AddRoomForm";
import axios from "axios";
import { toast, useToast } from "../ui/use-toast";

interface RoomCardProps {
  hotel?: Hotel & {
    rooms: Room[];
  };
  room: Room;
  bookings?: Booking[];

  
}
export const RoomCard = ({ hotel, room, bookings = [] }: RoomCardProps) => {
  const [isLoading, setIslLoading] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const {toast} = useToast();
  const isHotelDetailsPage = pathname.includes("hotel-details");
 
  const [open, setOpen] = useState(false);


  const handleDialogueOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleRoomDelete = (room:Room) => {
    setIslLoading(true);
    const imageKey = room.image.substring(room.image.lastIndexOf('/')+1);
    axios.post(`/api/uploadthing/delete`, {imageKey}).then(() => {
        axios.delete(`/api/room/${room.id}`).then(() => {
            router.refresh();
            toast({
                variant: 'success',
                description: 'Room Deleted Successfully 🎉'
            })
            setIslLoading(false);
        }).catch(() => {
            setIslLoading(false);
            toast({
                variant: 'destructive',
                description: 'Failed to delete room 😢'
            })
        })
    }).catch(() => {
        setIslLoading(false);
        toast({
            variant: 'destructive',
            description: 'Failed to delete room 😢'
        })
    })


  }
  return (
    <Card>
      <CardHeader>{room.title}</CardHeader>

      <CardContent className="flex flex-col  gap-4 ">
        <CardDescription>{room.description}</CardDescription>
        <div className="aspect-square overflow-hidden relative h-[200px] rounded-lg">
          <Image
            fill
            src={room.image}
            alt={room.title}
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 content-start text-sm">
          <AmenityItem>
            {" "}
            <Bed className="h-4 w-4 " />
            {room.bedCount} Bed{"(s)"}
          </AmenityItem>
          <AmenityItem>
            {" "}
            <Users className="h-4 w-4 " />
            {room.guestCount} Guest{"(s)"}
          </AmenityItem>
          <AmenityItem>
            {" "}
            <Bath className="h-4 w-4 " />
            {room.bathRoomCount} Bath{"(s)"}
          </AmenityItem>
          {!!room.kingBed && (
            <AmenityItem>
              {" "}
              <Bed className="h-4 w-4 " />
              {room.kingBed} KingBed{"(s)"}
            </AmenityItem>
          )}
          {!!room.queenBed && (
            <AmenityItem>
              {" "}
              <Bed className="h-4 w-4 " />
              {room.queenBed} QueenBed{"(s)"}
            </AmenityItem>
          )}
          {room.roomService && (
            <AmenityItem>
              {" "}
              <UtensilsCrossed className="h-4 w-4 " />
              Room Services
            </AmenityItem>
          )}
          {room.TV && (
            <AmenityItem>
              {" "}
              <Tv className="h-4 w-4 " />
              TV
            </AmenityItem>
          )}
          {room.freeWifi && (
            <AmenityItem>
              {" "}
              <Wifi className="h-4 w-4 " />
              Free Wifi
            </AmenityItem>
          )}
          {room.airCondition && (
            <AmenityItem>
              {" "}
              <AirVent className="h-4 w-4 " />
              Air Condition
            </AmenityItem>
          )}
          {room.mountainView && (
            <AmenityItem>
              {" "}
              <MountainIcon className="h-4 w-4 " />
              Mountain View
            </AmenityItem>
          )}
          {room.forestView && (
            <AmenityItem>
              {" "}
              <Trees className="h-4 w-4 " />
              Forest View
            </AmenityItem>
          )}
          {room.oceanView && (
            <AmenityItem>
              {" "}
              <Ship className="h-4 w-4 " />
              Ocean View
            </AmenityItem>
          )}
          {room.balcony && (
            <AmenityItem>
              {" "}
              <DoorOpen className="h-4 w-4 " />
              Balcony
            </AmenityItem>
          )}
          {room.soundProof && (
            <AmenityItem>
              {" "}
              <VolumeX className="h-4 w-4 " />
              Sound Proof
            </AmenityItem>
          )}
        </div>
        <Separator />
        <div className="flex gap-4 justify-between">
          <div>
            Room Price: <span className="font-bold">${room.roomPrice}</span>
            <span className="text-xs">/24hrs</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {isHotelDetailsPage ? (
          <div>Hotel Detail Page</div>
        ) : (
          <div className="flex w-full justify-between">
            <Button disabled={isLoading} type="button" variant="ghost" onClick={() => handleRoomDelete(room)}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </>
              )}
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger>
                    <Button
                      type="button"
                      variant="outline"
                      className="max-w-[150px] text-white bg-indigo-500 hover:bg-indigo-600 hover:text-white"
                    >
                      {" "}
                      <Pencil className="mr-2 h-4 w-4 text-white hover:text-white" /> Update Room
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[900px] w-[90%] rounded-md">
                    <DialogHeader className="px-2">
                      <DialogTitle className="text-white">Update Rooms</DialogTitle>
                      <DialogDescription>
                        Update details about a room in your hotel.
                      </DialogDescription>
                    </DialogHeader>
                    <AddRoomForm
                      hotel={hotel}
                      room={room}
                      handleDialogueOpen={handleDialogueOpen}
                    />
                  </DialogContent>
                </Dialog>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
