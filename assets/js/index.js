(function($) {
"use strict";

var TransitionGroup = React.addons.CSSTransitionGroup;

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
                React.createElement("input", {type: "range", min: "0", max: "100", skip: "1", value: this.state.value, onChange: this.onChange}), 
                React.createElement("h1", null, this.state.value)
            )
        )
    }
});

React.render(
    React.createElement(Page, null),
    document.getElementById('page')
);
})(jQuery);
