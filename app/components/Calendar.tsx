'use client';

import { FC } from 'react';
import { Calendar as DRCalendar } from 'react-date-range';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface CalendarProps {
  onChange: (newDate: Date) => void;
  selectedDate: Date;
}

const Calendar: FC<CalendarProps> = ({ onChange, selectedDate }) => {
  console.log(selectedDate);
  return (
    <div className="flex justify-center w-full my-6">
      <DRCalendar
        onChange={(newDate) => onChange(newDate)}
        date={selectedDate}
        minDate={new Date()}
        color="#393E46"
      />
    </div>
  );
};

export default Calendar;
