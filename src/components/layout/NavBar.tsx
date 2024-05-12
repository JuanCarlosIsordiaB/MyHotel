'use client';

import { UserButton} from "@clerk/nextjs";
import Container from "../Container";
import Link from "next/link";


export const NavBar = () => {
    return(
        <div className="sticky top-0 border border-b-primary/10 bg-secondary ">
            <Container>
                <Link href='/' className="font-bold cursor-pointer ">My<span>Hotel</span></Link>
                
                
                <UserButton afterSignOutUrl="/" />
            </Container>
            
        </div>
    );
}


export default NavBar;