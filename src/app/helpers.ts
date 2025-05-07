import * as d3 from 'd3';

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/candlestick-chart
export function CandlestickChart(data, {
    date = d => d.date, // given d in data, returns the (temporal) x-value
    open = d => d.open, // given d in data, returns a (quantitative) y-value
    close = d => d.close, // given d in data, returns a (quantitative) y-value
    high = d => d.high, // given d in data, returns a (quantitative) y-value
    low = d => d.low, // given d in data, returns a (quantitative) y-value
    title, // given d in data, returns the title text
    marginTop = 20, // top margin, in pixels
    marginRight = 30, // right margin, in pixels
    marginBottom = 30, // bottom margin, in pixels
    marginLeft = 40, // left margin, in pixels
    width = 400, // outer width, in pixels
    height = 600, // outer height, in pixels
    xDomain, // array of x-values (defaults to every weekday)
    xRange = [marginLeft, width - marginRight], // [left, right]
    xPadding = 0.2,
    xTicks, // array of x-values to label (defaults to every other Monday)
    yType = d3.scaleLinear, // type of y-scale
    yDomain, // [ymin, ymax]
    yRange = [height - marginBottom, marginTop], // [bottom, top]
    xFormat = "%b %-d", // a format specifier for the date on the x-axis
    yFormat = "~f", // a format specifier for the value on the y-axis
    yLabel, // a label for the y-axis
    stroke = "currentColor", // stroke color for the daily rule
    strokeLinecap = "round", // stroke line cap for the rules
    colors = ["#4daf4a", "#999999", "#e41a1c"] // [up, no change, down]
}: any = {}) {
    // Compute values.
    const X = d3.map(data, date);
    const Yo = d3.map(data, open);
    const Yc = d3.map(data, close);
    const Yh = d3.map(data, high);
    const Yl = d3.map(data, low);
    const I = d3.range(X.length);

    const weeks = (start, stop, stride) => d3.utcMonday.every(stride).range(start, +stop + 1);
    const days = (start, stop) => d3.utcDays(start, +stop + 1);
    // debugger;
    // Compute default domains and ticks.
    if (xDomain === undefined) xDomain = [d3.min(X), d3.max(X)];
    if (yDomain === undefined) yDomain = [d3.min(Yl), d3.max(Yh)];
    // if (xTicks === undefined) xTicks = weeks(d3.min(xDomain), d3.max(xDomain), 2);
    // debugger;
    // Construct scales and axes.
    // If you were to plot a stock using d3.scaleUtc, you’d see distracting gaps
    // every weekend. This chart therefore uses a d3.scaleBand whose domain is every
    // weekday in the dataset. A few gaps remain for holiday weekdays, such as
    // Christmas, but these are infrequent and allow the labeling of Mondays. As a
    // band scale, we specify explicit tick values.
    const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
    const yScale = yType(yDomain, yRange);
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);
    // debugger;
    // Compute titles.
    if (title === undefined) {
        const formatDate = d3.utcFormat("%B %-d, %Y");
        const formatValue = d3.format(".2f");
        const formatChange = (f => (y0, y1) => f((y1 - y0) / y0))(d3.format("+.2%"));
        title = i => `${formatDate(X[i])}
Open: ${formatValue(Yo[i])}
Close: ${formatValue(Yc[i])} (${formatChange(Yo[i], Yc[i])})
Low: ${formatValue(Yl[i])}
High: ${formatValue(Yh[i])}`;
    } else if (title !== null) {
        const T = d3.map(data, title);
        title = i => T[i];
    }

    const svg = d3.select('#ticker-graph svg')

    svg.selectAll("g.bottom-axis")
        .remove()
    svg.append("g")
        .attr('class', 'bottom-axis')
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(xAxis)
    // .call(g => g.select(".domain").remove());

    svg.selectAll("g.left-axis")
        .remove()
    svg.append("g")
        .attr("class", 'left-axis')
        .attr("transform", `translate(${marginLeft},0)`)
        .call(yAxis)
    // .call(g => g.select(".domain").remove())
    // .call(g => g.selectAll(".tick line").clone()
    //     .attr("stroke-opacity", 0.2)
    //     .attr("x2", width - marginLeft - marginRight))
    // .call(g => g.append("text")
    //     .attr("x", -marginLeft)
    //     .attr("y", 10)
    //     .attr("fill", "currentColor")
    //     .attr("text-anchor", "start")
    //     .text(yLabel));

    debugger;
    const graph = svg.selectAll("g.graph")
        .data([1])
        .join("g")
        .attr('class', 'graph')
        .attr("stroke", stroke)
        .attr("stroke-linecap", strokeLinecap)

    debugger;
    const sticks = graph.selectAll("g")
        .data(I)
        .join("g")
        .attr("transform", i => {
            console.log("i, X[i], xScale(X[i]): ", i, X[i], xScale(X[i]));
            return `translate(${xScale(X[i])},0)`
        });

    sticks.append("line")
        .attr("y1", i => yScale(Yl[i]))
        .attr("y2", i => yScale(Yh[i]))
        .attr("stroke", i => colors[1 + Math.sign(Yo[i] - Yc[i])]);


    sticks.append("line")
        .attr("y1", i => yScale(Yo[i]))
        .attr("y2", i => yScale(Yc[i]))
        .attr("stroke-width", xScale.bandwidth())
        .attr("stroke", i => colors[1 + Math.sign(Yo[i] - Yc[i])]);

    if (title) graph.append("title")
        .text(title);

    return svg.node();
}

export function formatDate(timestamp: number) {
    const date = new Date(Math.floor(timestamp / 1000))
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return `${date.getFullYear()}-${month}-${day}`
}

export const TickerTimeSpans = [
    { text: '15 min', period: '15m' },
    { text: '1 h', period: '1h' },
    { text: '1 d', period: '1D' },
    { text: '1 w', period: '1W' },
    { text: '1 m', period: '1M' },
    // { text: '1 y', period: '1y' },
];