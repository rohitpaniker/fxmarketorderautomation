'use server'
import { NextRequest, NextResponse } from "next/server";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "./../../../lib/supabase/server";
import { cookies } from "next/headers";

export async function GET() {
  // const supabase = createServerComponentClient({ cookies })
  const res = NextResponse.next();
  const supabase = createClient();
  const { data: sheets } = await supabase.from("sheets").select();
  const { data: trade_signals } = await supabase.from("trade_signals").select();

  const callApiInLoop = async (dataObject) => {
    
    const SIGNAL = `
    Pair : ${dataObject.pair}
    Order : ${dataObject.signal} 
    Entry : ${dataObject.entryprice}
    SL : ${dataObject.stoploss}
    TP1 : ${dataObject.takeprofit}
    `;
    
    const response = await fetch("https://eorwbs4f4gnskwe.m.pipedream.net", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: SIGNAL,
    });

    // const data = await response.json();
    // console.log("RESPONSE_PIPEDREAM >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", response)
  }

  for (let i = 0; i < trade_signals.length; i++) {
    callApiInLoop(trade_signals[i]);
  }
  return Response.json({ message: 'Submitted trade signals to API!', totalTradeSignalsExecuted: trade_signals.length })
  return Response.json({ sheets, trade_signals })
}