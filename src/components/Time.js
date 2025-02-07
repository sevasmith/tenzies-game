import React from "react";

export default function Time(props) {
  const [time, setTime] = React.useState(milliseconds());
  const [startTime, setStartTime] = React.useState(0);
  const [timeRecords, setTimeRecords] = React.useState([]);

  function milliseconds() {
    const now = new Date();
    return now.getTime();
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(milliseconds());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    if (props.on) {
      setStartTime(milliseconds());
    } else {
      const newFinishTime = time - startTime;
      setTimeRecords((prevRecords) => [...prevRecords, newFinishTime]);
    }
  }, [props.on]);

  React.useEffect(() => {
    if (timeRecords.length > 0) {
      props.updateBestTime(Math.min(...timeRecords));
    } else props.updateBestTime("");
  }, [timeRecords]);

  const gameTime = React.useMemo(() => {
    if (!startTime) return 0;
    const calculatedTime = props.on
      ? Math.round(time - startTime)
      : Math.round(timeRecords[timeRecords.length - 1]);
    return Math.max(calculatedTime, 0)
  }, [props.on, time, startTime, timeRecords]);

  return <p>{props.renderGameTime(gameTime)}</p>;
}
