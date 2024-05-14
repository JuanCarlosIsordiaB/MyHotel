'use client';

import { Hotel, Room } from "@prisma/client";

interface AddHotelFormProps {
    hotel: HotelWithRooms | null
}

export type HotelWithRooms = Hotel & {
    rooms: Room[]
}



export const AddHotelForm = ({hotel}:AddHotelFormProps) => {
  return (
    <div>AddHotelForm</div>
  )
}

export default AddHotelForm