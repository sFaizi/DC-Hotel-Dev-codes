import classes from './Calender.module.css';

const Calender = () => {
  return (
    <div className={classes.calender}>
      <input type="date" className={classes.dateBegin}></input>
      <input type="date" className={classes.dateEnd}></input>
    </div>
  );
};

export default Calender;
