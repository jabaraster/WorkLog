(function($) {
"use strict";

var TransitionGroup = React.addons.CSSTransitionGroup;

var Page = React.createClass({
    getInitialState: function() {
        return { value: 15 };
    },
    onChange: function(e) {
        this.setState({ value: $(e.target).val() });
    },
    render: function() {
        return (
            <div className="Page container">
                <input type="range" min="0" max="100" skip="1" value={this.state.value} onChange={this.onChange}/>
                <h1>{this.state.value}</h1>
            </div>
        )
    }
});

React.render(
    <Page />,
    document.getElementById('page')
);
})(jQuery);
