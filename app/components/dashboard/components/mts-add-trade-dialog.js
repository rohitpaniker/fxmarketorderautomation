import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"

function CurrencyPairSelectComponent({ selectedOption, isEditMode, defaultCurrency }) {
    const currencyOptions = ["US30", "XAUUSD", "USOIL", "BTCUSD", "ETHUSD", "GBPJPY", "EURUSD", "GBPUSD", "AUDUSD", "NZDUSD", "USDCHF", "USDCAD"]
    const [selectedCurrency, setCurrencyValue] = useState(isEditMode ? currencyOptions[currencyOptions.indexOf(defaultCurrency)] : currencyOptions[0]);

    // const fetchData = async () => {
    //     const response = await fetch("/dashboard/api");
    //     const data = await response.json();
    //     const { trade_signals } = data;
    //     console.log("fetchData_data >>>>>>>>>>>>>>>>>>>>>>>>>>", trade_signals)
    // }

    useEffect(() => {
        selectedOption(selectedCurrency)
    }, [selectedCurrency]);

    // useEffect(() => {
    //     fetchData();
    // }, [])

    return (
        <Select onValueChange={setCurrencyValue} defaultValue={selectedCurrency}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a pair" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Available Currency Pairs</SelectLabel>
                    {currencyOptions.map((currency, index) => <SelectItem key={index} value={currency}>{currency}</SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

function BuySellStopSelectComponent({ selectedBuySellSignal, isEditMode, defaultSignalValue }) {
    const signalOptions = ["BUY_STOP", "SELL_STOP"];
    const [selectedSignal, setSignalValue] = useState(isEditMode ? signalOptions[signalOptions.indexOf(defaultSignalValue)] : signalOptions[0]);

    useEffect(() => {
        selectedBuySellSignal(selectedSignal)
    }, [selectedSignal]);

    return (
        <Select onValueChange={setSignalValue} defaultValue={selectedSignal}>
            <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select call" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Avaialable Order Types</SelectLabel>
                    {signalOptions.map((call, index) => <SelectItem key={index} value={call}>{call.split('_').join(' ')}</SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

function ButtonLoading() {
    return (
        <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
        </Button>
    )
}


export function MTSAddTradeDialog({ buttonTitle, isEditMode, dataForEdit }) {
    const [rowId, setRowId] = useState(0);
    const [shouldBeDisalbled, setShouldBeDisalbled] = useState(false);
    const [selectedSignalCall, setSelectedSignalCall] = useState("");
    const [selectedCurrency, setSelectedCurrency] = useState("");
    const [entryPrice, setEntryPrice] = useState("");
    const [stopLoss, setStopLoss] = useState("");
    const [takeProfit, setTakeProfit] = useState("");
    const [open, setOpen] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    useEffect(() => {
        if (isEditMode && dataForEdit) {
            const { id, pair, signal, entryprice, stoploss, takeprofit, status } = dataForEdit;
            console.log("dataForEdit >>>>>>>>>>>>>>>>>>>>>>>>>>", dataForEdit);
            setShouldBeDisalbled((status === null || status === false) ? false : true);
            setRowId(id);
            setSelectedCurrency(pair);
            setSelectedSignalCall(signal.split(' ').join('_'))
            setEntryPrice(entryprice);
            setStopLoss(stoploss);
            setTakeProfit(takeprofit);
        }
    }, [dataForEdit])

    const saveData = async () => {
        setIsButtonDisabled(true);
        const response = await fetch("/dashboard/api", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                op: "SAVE_NEW_TRADING_SIGNAL",
                data: {
                    signal: selectedSignalCall.split('_').join(' '),
                    pair: selectedCurrency,
                    entryPrice,
                    stopLoss,
                    takeProfit,
                    status: 0
                }
            }),
        });
        const data = await response.json();
        setIsButtonDisabled(false);
        setOpen(false);
    }

    const updateData = async () => {

        if (shouldBeDisalbled) {
            setOpen(false);
            return false;
        }

        setIsButtonDisabled(true);

        const response = await fetch("/dashboard/api", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                op: "UPDATE_TRADING_SIGNAL",
                data: {
                    signal: selectedSignalCall.split('_').join(' '),
                    id: dataForEdit.id,
                    pair: selectedCurrency,
                    entryPrice,
                    stopLoss,
                    takeProfit,
                    status: 0
                }
            }),
        });
        const data = await response.json();
        setIsButtonDisabled(false);
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" disabled={shouldBeDisalbled}>{buttonTitle}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{!isEditMode ? "Add" : "Edit"} Trade</DialogTitle>
                    <DialogDescription>
                        Make changes to your trade signals. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="currencyPair" className="text-right">
                            Pair
                        </Label>
                        <CurrencyPairSelectComponent selectedOption={setSelectedCurrency} isEditMode={isEditMode} defaultCurrency={dataForEdit?.pair} />
                    </div>
                    {/* <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="signalCode" className="text-right">
                            Signal
                        </Label>
                    </div> */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="currencyPair" className="text-right">
                            Order
                        </Label>
                        <BuySellStopSelectComponent selectedBuySellSignal={setSelectedSignalCall} isEditMode={isEditMode} defaultSignalValue={dataForEdit?.signal.split(' ').join('_')} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="currencyPair" className="text-right">
                            Entry Price
                        </Label>
                        <Input
                            onChange={e => setEntryPrice(e.target.value)}
                            defaultValue={entryPrice}
                            id="entryPoint"
                            className="col-span-3"
                        />
                    </div>
                    {/* <div className="grid grid-cols-12 items-center gap-4">
                        <div className="col-span-4">
                            <BuySellStopSelectComponent selectedBuySellSignal={setSelectedSignalCall} isEditMode={isEditMode} defaultSignalValue={dataForEdit?.signal.split(' ').join('_')} />
                        </div>
                        <Input
                            id="selectedCurrencyPair"
                            defaultValue={selectedCurrency}
                            value={selectedCurrency}
                            className="col-span-4"
                            disabled
                        />
                        <Input
                            onChange={e => setEntryPrice(e.target.value)}
                            defaultValue={entryPrice}
                            id="entryPoint"
                            className="col-span-4"
                        />
                    </div> */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stopLoss" className="text-right">
                            Stop Loss
                        </Label>
                        <Input
                            onChange={e => setStopLoss(e.target.value)}
                            id="stopLoss"
                            defaultValue={stopLoss}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="takeProfit" className="text-right">
                            Take Profit
                        </Label>
                        <Input
                            onChange={e => setTakeProfit(e.target.value)}
                            id="takeProfit"
                            defaultValue={takeProfit}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    {isButtonDisabled ? <ButtonLoading /> : <Button onClick={isEditMode ? updateData : saveData}>{isEditMode ? "Update" : "Save"}</Button>}
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}
