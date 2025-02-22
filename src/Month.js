import React from "react";
import HeaderMonth from "./HeaderMonth";
import HeaderWeekDays from "./HeaderWeekDays";
import Day from "./Day";
import moment from "moment";
import { connect } from "react-redux";
import * as actions from "./store/actions";
import axios from "axios";

export default class Month extends React.Component {
  constructor(){
    super();
    this.state = {
      curMonth: {},
      nextMonth: {},
      prevMonth: {}
    };

    this.createState = this.createState.bind(this);
    this.handleSetEditDay = this.handleSetEditDay.bind(this);
    this.buildDays = this.buildDays.bind(this);
  }

  componentDidMount() {
    const reminders = axios.get('api/months/12')
    console.log('reminder: ', reminders)
    this.createState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createState(nextProps, true);
  }

  createState(props) {
    const curMonth =
      props.match.params.year && props.match.params.month
        ? `${props.match.params.year}-${props.match.params.month}`
        : moment().format("YYYY-MM");

    const nextMonth = moment(curMonth)
      .add(1, "M")
      .format("YYYY-MM");

    const prevMonth = moment(curMonth)
      .subtract(1, "M")
      .format("YYYY-MM");

    this.setState(
      {
        curMonth: {
          date: curMonth,
          name: moment(curMonth).format("MMMM YYYY"),
          days: moment(curMonth).daysInMonth(),
          editDay: null
        },
        nextMonth: {
          date: nextMonth,
          slug: nextMonth.replace("-", "/")
        },
        prevMonth: {
          date: prevMonth,
          slug: prevMonth.replace("-", "/")
        }
      },
      () => {
        // console.log(this.state);
      }
    );
  }

  handleSetEditDay = day => {
    this.setState({
      curMonth: {
        ...this.state.curMonth,
        editDay: day
      }
    });
  };

  buildDays() {
    const days = [];
    const props = {
      editDay: this.state.curMonth.editDay,
      handleSetEditDay: this.handleSetEditDay
    };

    for (let i = 1; i <= this.state.curMonth.days; i++) {
      let date = `${this.state.curMonth.date}-${("0" + i).slice(-2)}`; // Add leading zeros
      props["date"] = date;
      props["day"] = i;

      if (i === 1) {
        props["firstDayIndex"] = moment(date)
          .startOf("month")
          .format("d");
      } else {
        delete props["firstDayIndex"];
      }

      days.push(<Day key={i} {...props} />);
    }

    return days;
  }

  render() {
    console.log('inside Month render!!!')
    const weekdays = moment.weekdays();
    const days = this.buildDays();

    return (
      <div className="month">
        <HeaderMonth
          curMonth={this.state.curMonth}
          nextMonth={this.state.nextMonth}
          prevMonth={this.state.prevMonth}
        />
        <HeaderWeekDays days={weekdays} />
        <section className="days">{days}</section>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     reminders: state
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchAllReminders: payload => {
//       console.log('came to fetchAllReminders!!!!!!!!', payload)
//       axios.get('api/months/12', payload)
//       .then(function (reminders) {
//         dispatch(actions.createReminder(reminders));
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//       },
//     updateReminder: payload => dispatch(actions.updateReminder(payload)),
//     deleteReminder: (date, id) => dispatch(actions.deleteReminder(date, id))
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Month);