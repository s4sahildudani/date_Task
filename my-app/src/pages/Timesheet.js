import React from 'react';

class Timesheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timings: [],
    };
  }

  componentDidMount() {
    const date = new Date();
    const timings = ['9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm'].map((timing) => ({
      time: timing,
      available: true,
    }));
    this.setState({ timings });
  }

  render() {
    const { timings } = this.state;
    return (
      <div>
        <h1>Today's Timings:</h1>
        <ul>
          {timings.map(({ time, available }) => (
            <li key={time}>
              <span>{time}</span>
              <span>{available ? 'Available' : 'Booked'}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Timesheet;
