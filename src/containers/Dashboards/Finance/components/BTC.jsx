import React, { useState, useEffect } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { Card, CardBody, Col } from "reactstrap";
import {
  AreaChart,
  Tooltip,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import TrendingUpIcon from "mdi-react/TrendingUpIcon";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

const CustomTooltip = ({ active, label, payload }) => {
  const newLabel = moment(label, "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY");
  if (active) {
    return (
      <div className="dashboard__total-tooltip">
        {/* <p className="label">{`${label}`}</p> */}
        {payload ? (
          <p className="label">{`Orders: ${payload[0]?.value}`}</p>
        ) : null}
      </div>
    );
  }

  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
    })
  ),
};

CustomTooltip.defaultProps = {
  active: false,
  payload: null,
};

const BTC = ({ data, clickEvent, cardName, style }) => {
  const [dates, setDates] = useState();
  const [finalDate, setFinalDate] = useState();
  const [finalMonthlyData, setFinalMonthlyData] = useState();
  const [finalLastTen, setFinalLastTen] = useState();
  const [val, setVal] = useState();
  const [weekly, setWeekly] = useState();
  const [weeklyGraph, setWeeklyGraph] = useState(true);
  const [monthlyData, setMonthlyData] = useState(false);
  const [yearlyGraph, setYearlyGraph] = useState(false);
  const [showLastTen, setShowLastTen] = useState(false);
  const [showBargraph, setShowBarGraph] = useState(false);

  const [weeklyArray, setWeeklyArray] = useState([
    {
      id: 0,
      day: "Sunday",
      orders: 0,
    },
    {
      id: 1,
      day: "Monday",
      orders: 0,
      date: "",
    },
    {
      id: 2,
      day: "Tuesday",
      orders: 0,
      date: "",
    },
    {
      id: 3,
      day: "Wednesday",
      orders: 0,
      date: "",
    },
    {
      id: 4,
      day: "Thursday",
      orders: 0,
      date: "",
    },
    {
      id: 5,
      day: "Friday",
      orders: 0,
      date: "",
    },
    {
      id: 6,
      day: "Saturday",
      orders: 0,
      date: "",
    },
  ]);
  const [monthlyArray, setMonthlyArray] = useState([
    {
      id: 1,
      week: "Week 1",
      orders: 0,
    },
    {
      id: 2,
      week: "week 2",
      orders: 0,
      date: "",
    },
    {
      id: 3,
      week: "week 3",
      orders: 0,
      date: "",
    },
    {
      id: 4,
      week: "week 4",
      orders: 0,
      date: "",
    },
    {
      id: 5,
      week: "week 5",
      orders: 0,
      date: "",
    },
  ]);

  const [yearlyArray, setYearlyArray] = useState([
    {
      id: "01",
      month: "Jan",
      noOfOrders: 0,
    },
    {
      id: "02",
      month: "Feb",
      noOfOrders: 0,
    },
    {
      id: "03",
      month: "Mar",
      noOfOrders: 0,
    },
    {
      id: "04",
      month: "Apr",
      noOfOrders: 0,
    },
    {
      id: "05",
      month: "May",
      noOfOrders: 0,
    },
    {
      id: "06",
      month: "Jun",
      noOfOrders: 0,
    },
    {
      id: "07",
      month: "Jul",
      noOfOrders: 0,
    },
    {
      id: "08",
      month: "Aug",
      noOfOrders: 0,
    },
    {
      id: "09",
      month: "Sep",
      noOfOrders: 0,
    },
    {
      id: "10",
      month: "Oct",
      noOfOrders: 0,
    },
    {
      id: "11",
      month: "Nov",
      noOfOrders: 0,
    },
    {
      id: "12",
      month: "Dec",
      noOfOrders: 0,
    },
  ]);

  const [lastTenYears, setLastTenYears] = useState([
    {
      id: 2012,
      year: "2012",
      noOfOrders: 0,
    },
    {
      id: 2013,
      year: "2013",
      noOfOrders: 0,
    },
    {
      id: 2014,
      year: "2014",
      noOfOrders: 0,
    },
    {
      id: 2015,
      year: "2015",
      noOfOrders: 0,
    },
    {
      id: 2016,
      year: "2016",
      noOfOrders: 0,
    },
    {
      id: 2017,
      year: "2017",
      noOfOrders: 0,
    },
    {
      id: 2018,
      year: "2018",
      noOfOrders: 0,
    },
    {
      id: 2019,
      year: "2019",
      noOfOrders: 0,
    },
    {
      id: 2020,
      year: "2020",
      noOfOrders: 0,
    },
    {
      id: 2021,
      year: "2021",
      noOfOrders: 0,
    },
    {
      id: 2022,
      year: "2022",
      noOfOrders: 0,
    },
  ]);

  const resultDates = [];
  const current = moment();
  let n = 8;
  while (n > 0) {
    resultDates.push(current.format("YYYY-MM-DD"));
    current.subtract(1, "day");
    n--;
  }

  const resultMonths = [];
  let months = 12;
  while (months > 0) {
    resultMonths.push(current.format("MM"));
    current.subtract(1, "month");
    months--;
  }

  const tenYears = [];
  let years = 11;
  const yearNow = 2023;
  const nextYr = current.add(1, "year");
  while (years > 0) {
    tenYears.push(current.format("YYYY"));
    nextYr.subtract(1, "year");
    years--;
  }

  const checked = (isChecked) => {
    if (isChecked) {
      setShowBarGraph(true);
    } else {
      setShowBarGraph(false);
    }
  };

  useEffect(() => {
    const finalArray = [];
    const finalMothlyArray = [];
    const finalLastTenArray = [];
    data?.forEach((e1) =>
      resultDates?.forEach((e2) => {
        if (e1?.orderDate?.toString()?.substring(0, 10) === e2) {
          finalArray.push(e1);
        }
      })
    );
    data?.forEach((e1) =>
      resultMonths?.forEach((e2) => {
        if (e1?.orderDate?.toString()?.substring(5, 7) === e2) {
          finalMothlyArray.push(e1);
        }
      })
    );

    data?.forEach((e1) =>
      tenYears?.forEach((e2) => {
        const orderYear = e1?.orderDate?.toString()?.substring(0, 4);
        if (orderYear === e2) {
          finalLastTenArray.push(e1);
        }
      })
    );
    setFinalDate(finalArray);
    setFinalMonthlyData(finalMothlyArray);
    setFinalLastTen(finalLastTenArray);
  }, [dates]);

  useEffect(() => {
    const modifiedArray = finalDate?.reduce((acc, curr) => {
      if (!acc.length) {
        acc.push([curr, 1]);
      } else {
        const lastPushedArray = acc[acc.length - 1];
        if (
          lastPushedArray[0]?.orderDate?.toString()?.substring(0, 10) ===
          curr?.orderDate?.toString()?.substring(0, 10)
        ) {
          acc[acc.length - 1][1]++;
        } else {
          acc.push([curr, 1]);
        }
      }
      return acc;
    }, []);

    const modifiedMonthlyArray = finalMonthlyData?.reduce((acc, curr) => {
      if (!acc.length) {
        acc.push([curr, 1]);
      } else {
        const lastPushedArray = acc[acc.length - 1];
        if (
          lastPushedArray[0]?.orderDate?.toString()?.substring(0, 7) ===
          curr?.orderDate?.toString()?.substring(0, 7)
        ) {
          acc[acc.length - 1][1]++;
        } else {
          acc.push([curr, 1]);
        }
      }
      return acc;
    }, []);

    const modifiedYearlyArray = finalLastTen?.reduce((acc, curr) => {
      if (!acc.length) {
        acc.push([curr, 1]);
      } else {
        const lastPushedArray = acc[acc.length - 1];
        const lastPushedArrayOrderDate = lastPushedArray[0]?.orderDate
          ?.toString()
          ?.substring(0, 4);
        const currOrderDate = curr?.orderDate?.toString()?.substring(0, 4);
        if (lastPushedArrayOrderDate === currOrderDate) {
          acc[acc.length - 1][1]++;
        } else {
          acc.push([curr, 1]);
        }
      }
      return acc;
    }, []);

    const chartWeekly = [];

    modifiedArray?.forEach((e, i) => {
      const d = new Date(e[0]?.orderDate?.toString()?.substring(0, 10));
      const quantity = [{ noOfOrders: e[1] }];
      chartWeekly?.push({
        id: i,
        date: e[0]?.orderDate?.toString()?.substring(0, 10),
        noOfOrders: e[1],
        day: d.toLocaleDateString("en-US", { weekday: "long" }),
      });
    });
    setWeekly(chartWeekly);

    weeklyArray.forEach((e, i) =>
      modifiedArray?.forEach((e2, i2) => {
        const day = new Date(e2[0]?.orderDate?.toString()?.substring(0, 10));
        if (e?.id === day.getDay()) {
          weeklyArray[i].orders = e2[1];
          weeklyArray[3].orders = 0;
          weeklyArray[5].orders = 0;
          weeklyArray[2].orders = 0;
          weeklyArray[6].orders = 0;
        }
      })
    );

    const getISOWeekInMonth = (date) => {
      const d = new Date(date);
      if (Number.isNaN(d)) {
        return null;
      } else {
        d.setDate(d.getDate() - d.getDay() + 1);
        return { month: +d.getMonth() + 1, week: Math.ceil(d.getDate() / 7) };
      }
    };
    //*
    modifiedArray?.forEach((e1, i1) =>
      monthlyArray?.forEach((e2, i2) => {
        const date = e1[0]?.orderDate?.toString()?.substring(0, 10);
        const week = getISOWeekInMonth(date).week;
        if (week === e2.id) {
          monthlyArray[i2].orders += e1[1];
          // monthlyArray[5].orders = 0;
        }
      })
    );

    modifiedMonthlyArray?.forEach((e1, i1) =>
      yearlyArray?.forEach((e2, i2) => {
        const month = e1[0]?.orderDate?.toString()?.substring(5, 7);
        if (month === e2.id) {
          yearlyArray[i2].noOfOrders += e1[1];
        }
      })
    );

    modifiedYearlyArray?.forEach((e1, i1) =>
      lastTenYears?.forEach((e2, i2) => {
        const year = e1[0]?.orderDate?.toString()?.substring(0, 4);
        if (year === e2.year) {
          lastTenYears[i2].noOfOrders += e1[1];
        }
      })
    );
  }, [finalDate]);

  return (
    <Col md={12} xl={3} lg={6} xs={12} style={{ cursor: "pointer" }}>
      <Card onClick={clickEvent} name={cardName}>
        <CardBody className="dashboard__card-widget" style={style}>
          <div className="card__title">
            <h5 className="bold-text">Total Orders</h5>
            <h5 className="subhead">Orders</h5>
          </div>
          <div className="dashboard__total dashboard__total--area">
            <TrendingUpIcon className="dashboard__trend-icon" />
            <p className="dashboard__total-stat">{data?.length}</p>
            <div
              className="dashboard__chart-container"
              style={{ marginLeft: "20px" }}
            >
              <ResponsiveContainer height={70}>
                <AreaChart
                  width={730}
                  height={250}
                  data={yearlyArray}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis hide dataKey="noOfOrders" />
                  <Tooltip content={<CustomTooltip />} />
                  {/* <YAxis /> */}
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="noOfOrders"
                    stroke="#4ce1b6"
                    fillOpacity={0.2}
                    fill="#4ce1b6"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

// BTC.propTypes = {
//   dir: PropTypes.string.isRequired,
// };

export default BTC;
