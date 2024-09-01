'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { redirect } from 'next/navigation';
import AuthButton from "../components/auth-button";
import { createClient } from "@/lib/supabase/client";
import LampDemo from "@/components/ui/lamp";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import Link from "next/link";
import { DashboardLayout } from "../components/dashboard/layout/dashboard-layout";
import { Loader2 } from "lucide-react";
// import Navbar from "../components/navbar";
import TableView from "../components/table";

export default function Dashboard() {
    const supabase = createClient();
    const router = useRouter();

    const getSession = async () => {
        const {
            data: {
                session
            }
        } = await supabase.auth.getUser();

        return session;
    }

    useEffect(() => {
        if (!getSession()) {
            router.push('/auth/login')
        }
    }, []);

    return (
        <>
            {/* <Navbar onSignoutClick={async () => {await supabase.auth.signOut(); router.push('/auth/login')}}/> */}
            {/* <TableView/> */}
            {/* <pre>{sheetsData && JSON.stringify(sheetsData.sheets, null, 2)}</pre> */}
            {/* <MacbookScroll
                title={''}
                badge={
                    <Link href="https://peerlist.io/manuarora">
                        <Badge className="h-10 w-10 transform -rotate-12" />
                    </Link>
                }
                src={`/backtesting_1.webp`}
                showGradient={false}
            /> */}
            <DashboardLayout />
        </>
    );
}