import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "./inputCalendar.css";
import dayjs, { Dayjs } from "dayjs";
import 'dayjs/locale/pt-br';

interface InputCalendarProps {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  checkDate: (day: Dayjs | null) => void;
}

export default function InputCalendar({date, setDate, checkDate}: InputCalendarProps) {

  const handleDateChange = (value: Dayjs | null) => {
    setDate(value ? value.format("YYYY-MM-DD") : "");
    checkDate(value)
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <DatePicker
        value={date ? dayjs(date) : null}
        onChange={handleDateChange}
        className="calendar"
        shouldDisableDate={(date) => {
          const todayDisabled = date.isBefore(dayjs(), "day")

          return todayDisabled
        }} // Desabilita datas anteriores à hoje
        slotProps={{
          textField: {
            InputProps: { style: { color: "#fff", border: "1px solid #fff" } },
          },
        }}
      />
    </LocalizationProvider>
  );
}
