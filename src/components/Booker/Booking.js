import classes from './Booking.module.css';
import Calender from './Calender';
import Rooms from './Rooms/Rooms';

const Booking = () => {
  return (
    <div className={classes.booking}>
      <input
        type="text"
        placeholder="Enter Locality, landmark, city or hotel"
        className={classes.hotelSearch}
      ></input>

      <Calender />

      <Rooms />

      <button className={classes.bookingBtn}>Search Hotels</button>
    </div>
  );
};

export default Booking;
