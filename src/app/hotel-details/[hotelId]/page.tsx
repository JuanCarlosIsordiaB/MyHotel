
import HotelDetailsClient from "@/components/hotel/HotelDetailsClient";
import { getHotelById } from "../../../../actions/getHotelById";

interface HotelDetailsProps {
    params: {
        hotelId: string;
    }

}


const HotelDetails = async ({params}: HotelDetailsProps) => {
    const hotel = await getHotelById(params.hotelId);
    return (
        <div>
            <HotelDetailsClient hotel={hotel}  />
        </div>
    );
}
 
export default HotelDetails;