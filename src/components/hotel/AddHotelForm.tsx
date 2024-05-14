"use client";

import * as z from "zod";
import { Hotel, Room } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface AddHotelFormProps {
  hotel: HotelWithRooms | null;
}

export type HotelWithRooms = Hotel & {
  rooms: Room[];
};

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title Must be atleast 3 characters long" }),
  description: z
    .string()
    .min(10, { message: "Description Must be atleast 10 characters long" }),
  image: z.string().min(1, { message: "Image is required" }),
  country: z.string().min(10, { message: "Country is required" }),
  state: z.string().min(10, { message: "State is required" }),
  city: z.string().min(10, { message: "City is required" }),
  address: z.string().min(10, { message: "Address is required" }),
  locationDescription: z
    .string()
    .min(10, { message: "Location Description is required" }),
  gym: z.boolean().optional(),
  spa: z.boolean().optional(),
  bar: z.boolean().optional(),
  laundry: z.boolean().optional(),
  pool: z.boolean().optional(),
  breakfast: z.boolean().optional(),
  freeWifi: z.boolean().optional(),
});

export const AddHotelForm = ({ hotel }: AddHotelFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      country: "",
      state: "",
      city: "",
      address: "",
      locationDescription: "",
      gym: false,
      spa: false,
      bar: false,
      laundry: false,
      pool: false,
      breakfast: false,
      freeWifi: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return <div>AddHotelForm</div>;
};

export default AddHotelForm;
