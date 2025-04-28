import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "./inputCalendar.css";
import dayjs, { Dayjs } from "dayjs";

interface InputCalendarProps {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
}

export default function InputCalendar({date, setDate}: InputCalendarProps) {

  const handleDateChange = (value: Dayjs | null) => {
    setDate(value ? value.format("YYYY-MM-DD") : "");
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={date ? dayjs(date) : null}
        onChange={handleDateChange}
        className="calendar"
        shouldDisableDate={(date) => date.isBefore(dayjs(), "day")} // Desabilita datas anteriores à hoje
        slotProps={{
          textField: {
            InputProps: { style: { color: "#fff", border: "1px solid #fff" } },
          },
        }}
      />
    </LocalizationProvider>
  );
}
