(function() {
"use strict";

var TransitionGroup = React.addons.CSSTransitionGroup;

var TimeLine = React.createClass({
    render: function() {
        var style = {
            "height": this.props.height,
        };
        return (
            <div className="TimeLine" style={style}>
                {this.props.description}
            </div>
        )
    }
});

var TimeTable = React.createClass({
    getInitialState: function() {
        return { lines: {
             "9:00": 15,
             "9:15": 30,
            "10:00": 60,
        } }
    },
    onClick: function(i) {
        alert(i);
    },
    getTimeLine: function(time) {
        var minutes = this.state.lines[time];
        var unit       = 15
        var unitHeight = 44; // 15分辺りの高さ
        return minutes ? <TimeLine height={(minutes/unit)*unitHeight-3 + "px"} description="hoge" /> : null;
    },
    getRowTag: function(time) {
        var tl = this.getTimeLine(time);
        return (
            <tr className={"hour " + time} key={"time_" + time} onClick={this.onClick.bind(this, time)}>
                <td className="hour">{time}</td>
                <td className="schedule">
                    {tl}
                </td>
            </tr>
        );
    },
    render: function() {
        var months = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
        var quots = [15,30,45];
        var rows = [];
        var self = this;
        months.map(function(hour) {
            rows.push(self.getRowTag(hour + ":00"));
            quots.map(function(minitues) {
                rows.push(self.getRowTag(hour + ":" + minitues));
            });
        });
        return (
            <div>
                <table className="TimeTable">
                    {rows}
                </table>
            </div>
        );
    }
});

var Page = React.createClass({
    render: function() {
        return (
            <div className="Page container">
                <TimeTable />
            </div>
        )
    }
});

React.render(
    <Page />,
    document.getElementById('page')
);
})();
