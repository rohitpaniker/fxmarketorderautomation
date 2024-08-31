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

  return Response.json({ sheets, trade_signals })
}

export async function POST(request) {
  const requestBody = await request.json();
  const res = NextResponse.next();
  const supabase = createClient();

  const { op: operation, data } = requestBody;

  const {
    signal,
    pair,
    entryPrice,
    stopLoss,
    takeProfit,
    status
  } = data;

  const SINGLE_DATA = {
    pair: pair,
    signal: signal,
    entryprice: entryPrice,
    stoploss: stopLoss,
    takeprofit: takeProfit,
    status
  }

  switch (operation) {
    case "SAVE_NEW_TRADING_SIGNAL":
      console.log("response.body >>>>>>>>>>>", requestBody);
      const { error: SAVE_NEW_TRADING_SIGNAL_ERROR } = await supabase.from('trade_signals').insert(SINGLE_DATA)
      console.log("SB_DB_ERROR >>>>>>>>>>>>>>>>", SAVE_NEW_TRADING_SIGNAL_ERROR);
      break;
    case "UPDATE_TRADING_SIGNAL":
      console.log("response.body >>>>>>>>>>>", requestBody);
      const { error: UPDATE_TRADING_SIGNAL_ERROR } = await supabase.from('trade_signals').update(SINGLE_DATA).eq('id', data.id)
      console.log("SB_DB_ERROR >>>>>>>>>>>>>>>>", UPDATE_TRADING_SIGNAL_ERROR);
      break;
    case "DELETE_TRADING_SIGNAL":
      console.log("response.body >>>>>>>>>>>", requestBody);
      const { error: DELETE_TRADING_SIGNAL_ERROR } = await supabase.from('trade_signals').delete().eq('id', data.row_id)
      console.log("SB_DB_ERROR >>>>>>>>>>>>>>>>", DELETE_TRADING_SIGNAL_ERROR);
      break;
    default:
      break;
  }
  return Response.json({ message: 'POST submitted successfully!' })
  // const { error } = await supabase.from('trade_signals').insert()
}