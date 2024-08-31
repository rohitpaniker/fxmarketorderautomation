"use client"

import React, { useEffect, useState } from "react";
import { MTSAddTradeDialog } from "./mts-add-trade-dialog";
import { Button } from "@/components/ui/button"

const dummyData = [
    {
        pair: "EURUSD",
        signal: "BUY STOP EURUSD 1455.90",
        takeprofit: "1234.56",
        stoploss: "6543.21",
        scheduledAt: "Monday @ 4:15 AM IST",
        status: "PLACED"
    },
    {
        pair: "USDJPY",
        signal: "BUY STOP USDJPY 1455.90",
        takeprofit: "1234.56",
        stoploss: "6543.21",
        scheduledAt: "Monday @ 4:15 AM IST",
        status: "PLACED"
    },
    {
        pair: "US30",
        signal: "BUY STOP US30 1455.90",
        takeprofit: "1234.56",
        stoploss: "6543.21",
        scheduledAt: "Monday @ 4:15 AM IST",
        status: "PENDING"
    },
    {
        pair: "GER40",
        signal: "BUY STOP GER40 1455.90",
        takeprofit: "1234.56",
        stoploss: "6543.21",
        scheduledAt: "Monday @ 4:15 AM IST",
        status: "PENDING"
    }
]

export default function TableView() {
    const [tableData, setTableData] = useState([]);

    const fetchData = async () => {
        const response = await fetch("/dashboard/api");
        const data = await response.json();
        const { trade_signals } = data;
        // console.log("fetchData_data >>>>>>>>>>>>>>>>>>>>>>>>>>", trade_signals)
        setTableData(trade_signals)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const deleteData = async (row_id) => {
        const response = await fetch("/dashboard/api", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                op: "DELETE_TRADING_SIGNAL",
                data: {
                    row_id
                }
            }),
        });
        const data = await response.json();
    }

    useEffect(() => {
        console.log("tableData >>>>>>>>>>>>>>>>>>", tableData);
    }, [tableData])

    return (
        <>
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Pair</th>
                            {/* <th scope="col" className="px-6 py-4 font-medium text-gray-900">Type</th> */}
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Signal</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">SL</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">TP</th>
                            {/* <th scope="col" className="px-6 py-4 font-medium text-gray-900">Scheduled At</th> */}
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Status</th>
                            {/* <th scope="col" className="px-6 py-4 font-medium text-gray-900">Macronutrients</th> */}
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {tableData.map((data, index) => {
                            return (
                                <tr key={index} className="hover:bg-gray-50">
                                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                        <div className="relative h-10 w-10">
                                            <img
                                                className="h-full w-full rounded-full object-cover object-center"
                                                src="https://plus.unsplash.com/premium_photo-1681487767138-ddf2d67b35c1?q=80&w=3055&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                alt=""
                                            />
                                            <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                                        </div>
                                        <div className="text-sm flex flex-col justify-center">
                                            <div className="font-medium text-gray-700">{data.pair}</div>
                                            {/* <div className="text-gray-400">jobs@sailboatui.com</div> */}
                                        </div>
                                    </th>
                                    {/* <td className="px-6 py-4">
                                <span
                                    className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                    Calorie Deficit
                                </span>
                            </td> */}
                                    <td className="px-6 py-4">{data.signal}</td>
                                    <td className="px-6 py-4">{data.stoploss}</td>
                                    <td className="px-6 py-4">{data.takeprofit}</td>
                                    {/* <td className="px-6 py-4">{data.scheduledAt}</td> */}
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center gap-1 rounded-full ${data.status === 'PLACED' ? 'bg-green-50 text-green-600' : 'bg-gray-200 text-gray-600'}  px-2 py-1 text-xs font-semibold`}
                                        >
                                            <span className={`h-1.5 w-1.5 rounded-full ${data.status === 'PLACED' ? 'bg-green-600' : 'bg-gray-600'}`}></span>
                                            {(data.status === null || data.status === false) ? "PENDING" : data.status}
                                        </span>
                                    </td>
                                    {/* <td className="px-6 py-4">
                                <div className="flex gap-2">
                                    <span
                                        className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
                                    >
                                        C: 400 gms
                                    </span>
                                    <span
                                        className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600"
                                    >
                                        P: 150 gms
                                    </span>
                                    <span
                                        className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600"
                                    >
                                        F: 18 gms
                                    </span>
                                </div>
                            </td> */}
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-4">
                                            <MTSAddTradeDialog buttonTitle="Edit" isEditMode={true} dataForEdit={data}/>
                                            <Button variant="outline" onClick={() => deleteData(data.id)}>Delete</Button>
                                            {/* <a x-data="{ tooltip: 'Delete' }" href="#">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-6 w-6"
                                                    x-tooltip="tooltip"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                    />
                                                </svg>
                                            </a> */}
                                            {/* <a x-data="{ tooltip: 'Edite' }" href="#">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-6 w-6"
                                                    x-tooltip="tooltip"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                                    />
                                                </svg>
                                            </a> */}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}