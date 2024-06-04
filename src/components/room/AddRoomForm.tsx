"use client";

import * as z from "zod";
import { Hotel, Room } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";

interface AddRoomFormProps {
  // AddRoomForm properties
  hotel?: Hotel & {
    rooms: Room[];
  };
  room?: Room;
  handleDialogueOpen: () => void;
}

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters long",
  }),
  description: z.string().min(10, {
    message: "Title must be at least 10 characters long",
  }),
  bedCount: z.coerce.number().min(1, { message: "Bed count is required" }),
  guestCount: z.coerce.number().min(1, { message: "Guest count is required" }),
  bathRoomCount: z.coerce
    .number()
    .min(1, { message: "Bathroom count is required" }),
  kingBed: z.coerce.number().min(0),
  queenBed: z.coerce.number().min(0),
  image: z.string().min(1, {
    message: "Image is required",
  }),
  roomPrice: z.coerce.number().min(1, { message: "Room price is required" }),
  roomService: z.boolean().optional(),
  TV: z.boolean().optional(),
  balcony: z.boolean().optional(),
  freeWifi: z.boolean().optional(),
  cityView: z.boolean().optional(),
  oceanView: z.boolean().optional(),
  forestView: z.boolean().optional(),
  mountainView: z.boolean().optional(),
  airCondition: z.boolean().optional(),
  soundProof: z.boolean().optional(),
});

const AddRoomForm = ({ hotel, room, handleDialogueOpen }: AddRoomFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: room || {
      title: "",
      description: "",
      bedCount: 0,
      guestCount: 0,
      bathRoomCount: 0,
      kingBed: 0,
      queenBed: 0,
      image: "",
      roomPrice: 0,
      roomService: false,
      TV: false,
      balcony: false,
      freeWifi: false,
      cityView: false,
      oceanView: false,
      forestView: false,
      mountainView: false,
      airCondition: false,
      soundProof: false,
    },
  });
  return (
    <div className="max-h-[75vh] overflow-y-auto px-2">
      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-indigo-500 font-bold text-sm">
                  Room Title *
                </FormLabel>
                <FormDescription>
                  Enter the title of the room, e.g., "Deluxe Room"
                </FormDescription>
                <FormControl>
                  <Input placeholder="Double Room" {...field} className="bg-indigo-200" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-indigo-500 font-bold text-sm">
                  Room Description *
                </FormLabel>
                <FormDescription>
                  Enter the description of the room, e.g., "Deluxe Room with the
                  best view of the city"
                </FormDescription>
                <FormControl>
                  <Input placeholder="Best view of the hotel..." {...field} className="bg-indigo-200"/>
                </FormControl>
              </FormItem>
            )}
          />
          <div>
            <FormLabel className="text-indigo-500 font-bold text-sm">
              {" "}
              Room Amenities{" "}
            </FormLabel>
            <FormDescription>
              What makes this room a good choice?
            </FormDescription>
            <div className="grid grid-cols-2 gap-2 mt-5 bg-indigo-200 rounded-md p-2">
              <FormField
                control={form.control}
                name="roomService"
                render={({ field }) => (
                  <FormItem className="mt-3 flex flex-row items-end space-x-3 ">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="bg-indigo-500 border-gray-300"
                      />
                    </FormControl>
                    <FormLabel className="text-indigo-500">
                      24 hrs Room Service
                    </FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="TV"
                render={({ field }) => (
                  <FormItem className="mt-3 flex flex-row items-end space-x-3 ">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="bg-indigo-500 border-gray-300"
                      />
                    </FormControl>
                    <FormLabel className="text-indigo-500">TV</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="balcony"
                render={({ field }) => (
                  <FormItem className="mt-3 flex flex-row items-end space-x-3 ">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="bg-indigo-500 border-gray-300"
                      />
                    </FormControl>
                    <FormLabel className="text-indigo-500">Balcony</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="freeWifi"
                render={({ field }) => (
                  <FormItem className="mt-3 flex flex-row items-end space-x-3 ">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="bg-indigo-500 border-gray-300"
                      />
                    </FormControl>
                    <FormLabel className="text-indigo-500">Free Wifi</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cityView"
                render={({ field }) => (
                  <FormItem className="mt-3 flex flex-row items-end space-x-3 ">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="bg-indigo-500 border-gray-300"
                      />
                    </FormControl>
                    <FormLabel className="text-indigo-500">City View</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="oceanView"
                render={({ field }) => (
                  <FormItem className="mt-3 flex flex-row items-end space-x-3 ">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="bg-indigo-500 border-gray-300"
                      />
                    </FormControl>
                    <FormLabel className="text-indigo-500">oceanView</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="forestView"
                render={({ field }) => (
                  <FormItem className="mt-3 flex flex-row items-end space-x-3 ">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="bg-indigo-500 border-gray-300"
                      />
                    </FormControl>
                    <FormLabel className="text-indigo-500">Forest View</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mountainView"
                render={({ field }) => (
                  <FormItem className="mt-3 flex flex-row items-end space-x-3 ">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="bg-indigo-500 border-gray-300"
                      />
                    </FormControl>
                    <FormLabel className="text-indigo-500">Mountain View</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="airCondition"
                render={({ field }) => (
                  <FormItem className="mt-3 flex flex-row items-end space-x-3 ">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="bg-indigo-500 border-gray-300"
                      />
                    </FormControl>
                    <FormLabel className="text-indigo-500">Air Condition</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="soundProof"
                render={({ field }) => (
                  <FormItem className="mt-3 flex flex-row items-end space-x-3 ">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="bg-indigo-500 border-gray-300"
                      />
                    </FormControl>
                    <FormLabel className="text-indigo-500">Sound Proof</FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddRoomForm;
