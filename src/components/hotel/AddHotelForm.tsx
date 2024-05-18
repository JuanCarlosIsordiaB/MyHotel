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
  FormMessage,
} from "../ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { UploadButton } from "../uploadthing";
import { useToast } from "../ui/use-toast";
import Image from "next/image";
import { Button } from "../ui/button";
import { Loader2, XCircle } from "lucide-react";
import axios from "axios";
import useLocation from "@/hooks/useLocation";
import { ICity, IState } from "country-state-city";

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
  const [image, setImage] = useState<string | undefined>(hotel?.image);
  const [imageIsDeleting, setImageIsDeleting] = useState(false);
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    getAllCountries,
    getCountryByCode,
    getStateByCode,
    getCountryStates,
    getStateCities,
  } = useLocation();
  const countries = getAllCountries();

  const { toast } = useToast();

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

  useEffect(() => {
    const selectedCountry = form.watch("country");
    const countryStates = getCountryStates(selectedCountry);
    if (countryStates) {
      setStates(countryStates);
    }
  }, [form.watch("country")]);

  useEffect(() => {
    const selectedCountry = form.watch("country");
    const selectedState = form.watch("state");
    const stateCities = getStateCities(selectedCountry, selectedState);
    if (stateCities) {
      setCities(stateCities);
    }
  }, [form.watch("country"), form.watch("state")]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  const handleImageDelete = (image: string) => {
    setImageIsDeleting(true);
    const imageKey = image.substring(image.lastIndexOf("/") + 1);
    axios
      .post("/api/uploadthing/delete", { imageKey })
      .then((res) => {
        if (res.data.success) {
          setImage("");
          setImageIsDeleting(false);
          toast({
            variant: "success",
            description: "🎉 Image Deleted",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: " ERROR - Image Delete Failed",
        });
      })
      .finally(() => {
        setImageIsDeleting(false);
      });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
        <h3 className="mt-8 font-bold text-indigo-500 text-3xl md:text-5xl">
          {hotel ? "Update your hotel" : "Describe your hotel"}
        </h3>
        <div className="flex flex-col md:flex-row gap-6 bg-indigo-500 p-5  rounded-md shadow-md">
          <div className="flex-1 flex flex-col gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel className="text-white font-bold text-lg">
                    Hotel Title *
                  </FormLabel>
                  <FormDescription className="text-gray-300  text-md">
                    Provide your hotel name
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="Beach Hotel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel className="text-white font-bold text-lg ">
                    Hotel Description *
                  </FormLabel>
                  <FormDescription className="text-gray-300  text-md">
                    Provide your hotel description
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="Beach Hotel with the best view in the city..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-8">
              <FormLabel className="text-white font-bold text-lg ">
                Choose Amenities
              </FormLabel>
              <FormDescription className="text-gray-300  text-md">
                Select the amenities your hotel offers..
              </FormDescription>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <FormField
                  control={form.control}
                  name="gym"
                  render={({ field }) => (
                    <FormItem className="mt-3 flex flex-row items-end space-x-3 ">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="bg-white border-white  "
                        />
                      </FormControl>
                      <FormLabel className=" text-white">Gym</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="spa"
                  render={({ field }) => (
                    <FormItem className="mt-3 flex flex-row items-end space-x-3 ">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="bg-white border-white  "
                        />
                      </FormControl>
                      <FormLabel className=" text-white">Spa</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bar"
                  render={({ field }) => (
                    <FormItem className="mt-3 flex flex-row items-end space-x-3 ">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="bg-white border-white  "
                        />
                      </FormControl>
                      <FormLabel className=" text-white">Bar</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="laundry"
                  render={({ field }) => (
                    <FormItem className="mt-3 flex flex-row items-end space-x-3 ">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="bg-white border-white  "
                        />
                      </FormControl>
                      <FormLabel className=" text-white">Laundry</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pool"
                  render={({ field }) => (
                    <FormItem className="mt-3 flex flex-row items-end space-x-3 ">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="bg-white border-white  "
                        />
                      </FormControl>
                      <FormLabel className=" text-white">Pool</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="breakfast"
                  render={({ field }) => (
                    <FormItem className="mt-3 flex flex-row items-end space-x-3 ">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="bg-white border-white  "
                        />
                      </FormControl>
                      <FormLabel className=" text-white">Breakfast</FormLabel>
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
                          className="bg-white border-white  "
                        />
                      </FormControl>
                      <FormLabel className=" text-white">Free Wifi</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className=" flex flex-col space-y-3 mt-9 ">
                  <FormLabel className="text-white font-bold text-lg">
                    Upload an Image *
                  </FormLabel>
                  <FormDescription className="text-gray-300  text-md">
                    Provide an hotel image
                  </FormDescription>
                  <FormControl>
                    {image ? (
                      <div className="relative max-w-[400px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4">
                        <Image
                          fill
                          src={image}
                          alt="Hotel Image"
                          className="object-contain"
                        />
                        <Button
                          onClick={() => handleImageDelete(image)}
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="absolute right-[-12px] top-0"
                        >
                          {imageIsDeleting ? (
                            <Loader2 />
                          ) : (
                            <XCircle className="text-indigo-800" />
                          )}
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center max-w[400px] p-12 border-dashed border-indigo-800 rounded mt-4 ">
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            setImage(res[0].url);
                            toast({
                              variant: "success",
                              description: "🎉 Upload Completed",
                            });
                          }}
                          onUploadError={(error: Error) => {
                            toast({
                              variant: "destructive",
                              description: "ERROR - Upload Failed",
                            });
                          }}
                        />
                      </div>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="mt-3">
                    <FormLabel className="text-white font-bold text-lg">
                      Select Country *
                    </FormLabel>
                    <FormDescription className="text-gray-300  text-md">
                      Provide the Country of your Hotel
                    </FormDescription>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a Country"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem
                            key={country.isoCode}
                            value={country.isoCode}
                          >
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="mt-3">
                    <FormLabel className="text-white font-bold text-lg">
                      Select State *
                    </FormLabel>
                    <FormDescription className="text-gray-300  text-md">
                      Provide the State of your Hotel
                    </FormDescription>
                    <Select
                      disabled={isLoading || !states.length}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a State"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state.isoCode} value={state.isoCode}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel className="text-white font-bold text-lg">
                    Select City *
                  </FormLabel>
                  <FormDescription className="text-gray-300  text-md">
                  Provide the City of your Hotel
                  </FormDescription>
                  <Select
                    disabled={isLoading || !cities.length}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select a City"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city.name} value={city.name}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="locationDescription"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel className="text-white font-bold text-lg ">
                    Location Description *
                  </FormLabel>
                  <FormDescription className="text-gray-300  text-md">
                    Provide the Location Description
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="Located in the heart of the city..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AddHotelForm;
