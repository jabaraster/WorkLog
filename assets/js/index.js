(function($) {
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
        return minutes ? React.createElement(TimeLine, {height: minutes * 2 - 2 + "px", description: "hoge"}) : null;
    },
    render: function() {
        var months = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
        var quots = [1,2,3];
        var rows = [];
        var self = this;
        months.map(function(i) {
            var t = i + ":00";
            var tl = self.getTimeLine(t);
            rows.push(React.createElement("tr", {className: "hour", key: "hour_" + i + "_0", onClick: self.onClick.bind(self, i + ":00")}, 
                    React.createElement("td", {className: "hour"}, i, ":00"), 
                    React.createElement("td", {className: "schedule"}, 
                        tl
                    )
                ));
            quots.map(function(j) {
                var t = i + ":" + (15 * j);
                var tl = self.getTimeLine(t);
                rows.push(React.createElement("tr", {className: "hour quot-" + j, key: "hour_" + i + "_" + j, onClick: self.onClick.bind(self, t)}, 
                        React.createElement("td", {className: "hour"}, "　"), 
                        React.createElement("td", {className: "schedule"}, 
                            tl
                        )
                    ));
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
    getInitialState: function() {
        return { value: 15 };
    },
    onChange: function(e) {
        this.setState({ value: $(e.target).val() });
    },
    render: function() {
        return (
            React.createElement("div", {className: "Page container"}, 
                React.createElement("input", {type: "range", min: "15", max: "120", step: "15", value: this.state.value, onChange: this.onChange}), 
                React.createElement("h1", null, this.state.value), 
                React.createElement(TimeTable, null)
            )
        )
    }
});

React.render(
    React.createElement(Page, null),
    document.getElementById('page')
);
})(jQuery);
