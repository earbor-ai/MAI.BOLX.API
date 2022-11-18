import React, { useState, useEffect } from "react";
import { Button, Switch } from "antd";
import moment from "moment";
import PropTypes from "prop-types";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Panel from "../../../../shared/components/Panel";
// import getTooltipStyles from "../../../../shared/helpers"

const CustomTooltip = ({ active, label, payload }) => {
  if (active) {
    return (
      <div className="dashboard__total-tooltip">
        <p className="label">{`${label}`}</p>
        {payload ? (
          <p className="label">{`Orders: ${payload[0]?.value}`}</p>
        ) : null}
      </div>
    );
  }

  return null;
};

const brush = (theme) => {
  if (theme === "theme-light") {
    return "#f2f4f7";
  }
  return "#38373f";
};

const BtcEth = ({ theme, dir, name, data }) => {
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

  const showWeekly = () => {
    setWeeklyGraph(true);
    setMonthlyData(false);
    setYearlyGraph(false);
    setShowLastTen(false);
  };
  const showMonthly = () => {
    setWeeklyGraph(false);
    setMonthlyData(true);
    setYearlyGraph(false);
    setShowLastTen(false);
  };
  const showYearly = () => {
    setYearlyGraph(true);
    setWeeklyGraph(false);
    setMonthlyData(false);
    setShowLastTen(false);
  };
  const showTenYears = () => {
    setShowLastTen(true);
    setYearlyGraph(false);
    setWeeklyGraph(false);
    setMonthlyData(false);
  };

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
    // <div>
    <Panel
      xl={8}
      lg={7}
      md={12}
      xs={12}
      title={name}
      subhead={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Button
              size="small"
              classname="my-button"
              style={{
                marginRight: "7px",
                cursor: "pointer",
              }}
              onClick={showWeekly}
            >
              day
            </Button>

            <Button
              size="small"
              style={{
                marginRight: "7px",
                cursor: "pointer",
              }}
              onClick={showMonthly}
            >
              week
            </Button>

            <Button
              size="small"
              style={{
                marginRight: "7px",
                cursor: "pointer",
              }}
              onClick={showYearly}
            >
              month
            </Button>

            <Button
              size="small"
              style={{
                marginRight: "7px",
                cursor: "pointer",
              }}
              onClick={showTenYears}
            >
              year
            </Button>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <p>Show in Barchart</p>
            <Switch
              size="small"
              onChange={checked}
              style={{ width: "30px", marginLeft: "7px" }}
            />
          </div>
        </div>
      }
    >
      {showBargraph ? (
        <div dir="ltr">
          {weeklyGraph ? (
            <ResponsiveContainer height={300} className="dashboard__area">
              {weekly?.length > 0 ? (
                <BarChart
                  data={weeklyArray}
                  margin={{ top: 20, left: -15, bottom: 20 }}
                >
                  <XAxis dataKey="day" />
                  <YAxis
                    tickLine={false}
                    orientation={dir === "rtl" ? "right" : "left"}
                  />
                  <Legend />
                  <CartesianGrid opacity={0.5} />
                  <Bar
                    name="Orders"
                    type="monotone"
                    // barSize={35}
                    dataKey="orders"
                    fill="#4ce1b6"
                    stroke="#4ce1b6"
                    fillOpacity={0.2}
                  />
                  <Tooltip content={<CustomTooltip />} />
                </BarChart>
              ) : (
                <p>Please wait....</p>
              )}
            </ResponsiveContainer>
          ) : null}

          {monthlyData ? (
            <ResponsiveContainer height={300} className="dashboard__area">
              {weekly?.length > 0 ? (
                <BarChart
                  data={monthlyArray}
                  margin={{ top: 20, left: -15, bottom: 20 }}
                >
                  <XAxis dataKey="week" />
                  <YAxis
                    tickLine={false}
                    orientation={dir === "rtl" ? "right" : "left"}
                  />
                  <Legend />
                  <CartesianGrid opacity={0.5} />
                  <Bar
                    name="Orders"
                    type="monotone"
                    dataKey="orders"
                    fill="#4ce1b6"
                    stroke="#4ce1b6"
                    fillOpacity={0.2}
                  />
                  <Tooltip content={<CustomTooltip />} />
                </BarChart>
              ) : (
                <p>Please wait....</p>
              )}
            </ResponsiveContainer>
          ) : null}

          {yearlyGraph ? (
            <ResponsiveContainer height={300} className="dashboard__area">
              {weekly?.length > 0 ? (
                <BarChart
                  data={yearlyArray}
                  margin={{ top: 20, left: -15, bottom: 20 }}
                >
                  <XAxis dataKey="month" />
                  <YAxis
                    tickLine={false}
                    orientation={dir === "rtl" ? "right" : "left"}
                  />
                  <Legend />
                  <CartesianGrid opacity={0.5} />
                  <Bar
                    name="Orders"
                    type="monotone"
                    dataKey="noOfOrders"
                    fill="#4ce1b6"
                    stroke="#4ce1b6"
                    fillOpacity={0.2}
                  />
                  <Tooltip content={<CustomTooltip />} />
                </BarChart>
              ) : (
                <p>Please wait....</p>
              )}
            </ResponsiveContainer>
          ) : null}
          {showLastTen ? (
            <ResponsiveContainer height={300} className="dashboard__area">
              {weekly?.length > 0 ? (
                <BarChart
                  data={lastTenYears}
                  margin={{ top: 20, left: -15, bottom: 20 }}
                >
                  <XAxis dataKey="year" />
                  <YAxis
                    tickLine={false}
                    orientation={dir === "rtl" ? "right" : "left"}
                  />
                  <Legend />
                  <CartesianGrid opacity={0.5} />
                  <Bar
                    name="Orders"
                    type="monotone"
                    dataKey="noOfOrders"
                    fill="#4ce1b6"
                    stroke="#4ce1b6"
                    fillOpacity={0.2}
                  />
                  <Tooltip content={<CustomTooltip />} />
                </BarChart>
              ) : (
                <p>Please wait....</p>
              )}
            </ResponsiveContainer>
          ) : null}
        </div>
      ) : (
        <div dir="ltr">
          {weeklyGraph ? (
            <ResponsiveContainer height={300} className="dashboard__area">
              {weekly?.length > 0 ? (
                <AreaChart
                  data={weeklyArray}
                  margin={{ top: 20, left: -15, bottom: 20 }}
                >
                  <XAxis dataKey="day" />
                  <YAxis
                    tickLine={false}
                    orientation={dir === "rtl" ? "right" : "left"}
                  />
                  <Legend />
                  <CartesianGrid opacity={0.5} />
                  <Area
                    name="Orders"
                    type="monotone"
                    dataKey="orders"
                    fill="#4ce1b6"
                    stroke="#4ce1b6"
                    fillOpacity={0.2}
                  />
                  <Tooltip content={<CustomTooltip />} />
                </AreaChart>
              ) : (
                <p>Please wait....</p>
              )}
            </ResponsiveContainer>
          ) : null}

          {monthlyData ? (
            <ResponsiveContainer height={300} className="dashboard__area">
              {weekly?.length > 0 ? (
                <AreaChart
                  data={monthlyArray}
                  margin={{ top: 20, left: -15, bottom: 20 }}
                >
                  <XAxis dataKey="week" />
                  <YAxis
                    tickLine={false}
                    orientation={dir === "rtl" ? "right" : "left"}
                  />
                  <Legend />
                  <CartesianGrid opacity={0.5} />
                  <Area
                    name="Orders"
                    type="monotone"
                    dataKey="orders"
                    fill="#4ce1b6"
                    stroke="#4ce1b6"
                    fillOpacity={0.2}
                  />
                  <Tooltip content={<CustomTooltip />} />
                </AreaChart>
              ) : (
                <p>Please wait....</p>
              )}
            </ResponsiveContainer>
          ) : null}

          {yearlyGraph ? (
            <ResponsiveContainer height={300} className="dashboard__area">
              {weekly?.length > 0 ? (
                <AreaChart
                  data={yearlyArray}
                  margin={{ top: 20, left: -15, bottom: 20 }}
                >
                  <XAxis dataKey="month" />
                  <YAxis
                    tickLine={false}
                    orientation={dir === "rtl" ? "right" : "left"}
                  />
                  <Legend />
                  <CartesianGrid opacity={0.5} />
                  <Area
                    name="Orders"
                    type="monotone"
                    dataKey="noOfOrders"
                    fill="#4ce1b6"
                    stroke="#4ce1b6"
                    fillOpacity={0.2}
                  />
                  <Tooltip content={<CustomTooltip />} />
                </AreaChart>
              ) : (
                <p>Please wait....</p>
              )}
            </ResponsiveContainer>
          ) : null}
          {showLastTen ? (
            <ResponsiveContainer height={300} className="dashboard__area">
              {weekly?.length > 0 ? (
                <AreaChart
                  data={lastTenYears}
                  margin={{ top: 20, left: -15, bottom: 20 }}
                >
                  <XAxis dataKey="year" />
                  <YAxis
                    tickLine={false}
                    orientation={dir === "rtl" ? "right" : "left"}
                  />
                  <Legend />
                  <CartesianGrid opacity={0.5} />
                  <Area
                    name="Orders"
                    type="monotone"
                    dataKey="noOfOrders"
                    fill="#4ce1b6"
                    stroke="#4ce1b6"
                    fillOpacity={0.2}
                  />
                  <Tooltip content={<CustomTooltip />} />
                </AreaChart>
              ) : (
                <p>Please wait....</p>
              )}
            </ResponsiveContainer>
          ) : null}
        </div>
      )}
    </Panel>
    // </div>
  );
};

BtcEth.propTypes = {
  theme: PropTypes.string.isRequired,
  dir: PropTypes.string.isRequired,
};

export default BtcEth;
