import React, { useState } from "react";
// import "./App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  date: {
    minWidth: 800,
    padding: 0,
  },
});

function DatePick() {
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <div>
      <DatePicker
        locale={ko}
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy년 MM월 dd일"
        placeholderText="생년월일"
        // minDate={new Date()}
        // maxDate={new Date()}
        // filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
        showYearDropdown
        scrollableYearDropdown
        isClearable
      />
    </div>
  );
}

export default withStyles(styles)(DatePick);
