import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import './inputCalendar.css'

export default function InputCalendar() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker className='calendar'/>
    </LocalizationProvider>
  );
}