(function() {
"use strict";

var TransitionGroup = React.addons.CSSTransitionGroup;

var TimeLine = React.createClass({displayName: "TimeLine",
    render: function() {
        var style = {
            "height": this.props.height,
        };
        return (
            React.createElement("div", {className: "TimeLine", style: style}, 
                this.props.description
            )
        )
    }
});

var TimeTable = React.createClass({displayName: "TimeTable",
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
        return minutes ? React.createElement(TimeLine, {height: (minutes/unit)*unitHeight-3 + "px", description: "hoge"}) : null;
    },
    getRowTag: function(time) {
        var tl = this.getTimeLine(time);
        return (
            React.createElement("tr", {className: "hour " + time, key: "time_" + time, onClick: this.onClick.bind(this, time)}, 
                React.createElement("td", {className: "hour"}, time), 
                React.createElement("td", {className: "schedule"}, 
                    tl
                )
            )
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
            React.createElement("div", null, 
                React.createElement("table", {className: "TimeTable"}, 
                    rows
                )
            )
        );
    }
});

var Page = React.createClass({displayName: "Page",
    render: function() {
        return (
            React.createElement("div", {className: "Page container"}, 
                React.createElement(TimeTable, null)
            )
        )
    }
});

React.render(
    React.createElement(Page, null),
    document.getElementById('page')
);
})();
