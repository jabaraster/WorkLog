(function($) {
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
        var unitHeight = 44; // 15分辺りの高さ
        return minutes ? <TimeLine height={(minutes/15)*44-3 + "px"} description="hoge" /> : null;
    },
    render: function() {
        var months = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
        var quots = [1,2,3];
        var rows = [];
        var self = this;
        months.map(function(i) {
            var t = i + ":00";
            var tl = self.getTimeLine(t);
            rows.push(<tr className="hour" key={"hour_" + i + "_0"} onClick={self.onClick.bind(self, i + ":00")}>
                    <td className="hour">{i}:00</td>
                    <td className="schedule">
                        {tl}
                    </td>
                </tr>);
            quots.map(function(j) {
                var t = i + ":" + (15 * j);
                var tl = self.getTimeLine(t);
                rows.push(<tr className={"hour quot-" + j} key={"hour_" + i + "_" + j} onClick={self.onClick.bind(self, t)}>
                        <td className="hour">　</td>
                        <td className="schedule">
                            {tl}
                        </td>
                    </tr>);
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
    getInitialState: function() {
        return { value: 15 };
    },
    onChange: function(e) {
        this.setState({ value: React.findDOMNode(this.refs.timeLength).value });
    },
    render: function() {
        return (
            <div className="Page container">
                <input type="range" ref="timeLength" min="15" max="120" step="15" value={this.state.value} onChange={this.onChange}/>
                <h1>{this.state.value}</h1>
                <TimeTable />
            </div>
        )
    }
});

React.render(
    <Page />,
    document.getElementById('page')
);
})(jQuery);
