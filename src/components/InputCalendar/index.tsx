import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "./inputCalendar.css";
import dayjs, { Dayjs } from "dayjs";
import 'dayjs/locale/pt-br';
import AlertDialog from "../AlertDialog";

interface InputCalendarProps {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  checkDate: (day: Dayjs | null) => void;
}

export default function InputCalendar({date, setDate, checkDate}: InputCalendarProps) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogText, setDialogText] = React.useState("");

  const handleDateChange = (value: Dayjs | null) => {

    // Verifica se o dia selecionado é domingo (0 representa domingo)
    if (value?.day() === 0) {
      setOpenDialog(true);
      setDialogText("Domingos não são permitidos. Por favor, selecione outro dia.");
      setDate("");
      return;
    }

    setDate(value ? value.format("YYYY-MM-DD") : "");
    checkDate(value)
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <DatePicker
        value={date ? dayjs(date) : null}
        onChange={handleDateChange}
        className="calendar"
        disablePast // Desabilita datas anteriores à hoje
        shouldDisableDate={(date) => {
          const isSunday = date.day() === 0; // Desabilita domingos

          return isSunday
        }}
        slotProps={{
          textField: {
            InputProps: { style: { color: "#fff", border: "1px solid #fff" } },
          },
        }}
      />

      <AlertDialog text={dialogText} open={openDialog} onClose={() => setOpenDialog(false)}/>

    </LocalizationProvider>
  );
}
