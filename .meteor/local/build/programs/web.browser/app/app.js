var require = meteorInstall({"client":{"template.main.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
// client/template.main.js                                                              //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////
                                                                                        //

Template.body.addContent((function() {
  var view = this;
  return HTML.Raw('<h1>Welcome to Taiwo-Do!</h1>\n\n  <div id="render-target"></div>');
}));
Meteor.startup(Template.body.renderToDocument);

//////////////////////////////////////////////////////////////////////////////////////////

},"main.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
// client/main.js                                                                       //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////
                                                                                        //
var React;
module.watch(require("react"), {
  "default": function (v) {
    React = v;
  }
}, 0);
var Meteor;
module.watch(require("meteor/meteor"), {
  Meteor: function (v) {
    Meteor = v;
  }
}, 1);
var render;
module.watch(require("react-dom"), {
  render: function (v) {
    render = v;
  }
}, 2);
var App;
module.watch(require("../imports/ui/App.js"), {
  "default": function (v) {
    App = v;
  }
}, 3);
Meteor.startup(function () {
  render(React.createElement(App, null), document.getElementById('render-target'));
});
//////////////////////////////////////////////////////////////////////////////////////////

}},"imports":{"api":{"tasks.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
// imports/api/tasks.js                                                                 //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////
                                                                                        //
module.export({
  Tasks: function () {
    return Tasks;
  }
});
var Mongo;
module.watch(require("meteor/mongo"), {
  Mongo: function (v) {
    Mongo = v;
  }
}, 0);
var Tasks = new Mongo.Collection('tasks');
//////////////////////////////////////////////////////////////////////////////////////////

}},"ui":{"App.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
// imports/ui/App.js                                                                    //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////
                                                                                        //
var _inheritsLoose = require("@babel/runtime/helpers/inheritsLoose");

var React, Component;
module.watch(require("react"), {
  "default": function (v) {
    React = v;
  },
  Component: function (v) {
    Component = v;
  }
}, 0);
var ReactDOM;
module.watch(require("react-dom"), {
  "default": function (v) {
    ReactDOM = v;
  }
}, 1);
var withTracker;
module.watch(require("meteor/react-meteor-data"), {
  withTracker: function (v) {
    withTracker = v;
  }
}, 2);
var Tasks;
module.watch(require("../api/tasks.js"), {
  Tasks: function (v) {
    Tasks = v;
  }
}, 3);
var Task;
module.watch(require("./Task.js"), {
  "default": function (v) {
    Task = v;
  }
}, 4);

// App component - represents the whole app
var App =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(App, _Component);

  function App() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = App.prototype;

  _proto.handleSubmit = function () {
    function handleSubmit(event) {
      event.preventDefault(); // Find the text field via the React ref

      var text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
      Tasks.insert({
        text: text,
        createdAt: new Date() // current time

      }); // Clear form

      ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    return handleSubmit;
  }();

  _proto.renderTasks = function () {
    function renderTasks() {
      return this.props.tasks.map(function (task) {
        return React.createElement(Task, {
          key: task._id,
          task: task
        });
      });
    }

    return renderTasks;
  }();

  _proto.render = function () {
    function render() {
      return React.createElement("div", {
        className: "container"
      }, React.createElement("header", null, React.createElement("h1", null, "Todo List"), React.createElement("form", {
        className: "new-task",
        onSubmit: this.handleSubmit.bind(this)
      }, React.createElement("input", {
        type: "text",
        ref: "textInput",
        placeholder: "Type to add new tasks"
      }))), React.createElement("ul", null, this.renderTasks()));
    }

    return render;
  }();

  return App;
}(Component);

module.exportDefault(withTracker(function () {
  return {
    tasks: Tasks.find({}).fetch()
  };
})(App));
//////////////////////////////////////////////////////////////////////////////////////////

},"Task.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
// imports/ui/Task.js                                                                   //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////
                                                                                        //
var _inheritsLoose = require("@babel/runtime/helpers/inheritsLoose");

module.export({
  "default": function () {
    return Task;
  }
});
var React, Component;
module.watch(require("react"), {
  "default": function (v) {
    React = v;
  },
  Component: function (v) {
    Component = v;
  }
}, 0);

var Task =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Task, _Component);

  function Task() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Task.prototype;

  _proto.render = function () {
    function render() {
      return React.createElement("li", null, this.props.task.text);
    }

    return render;
  }();

  return Task;
}(Component);
//////////////////////////////////////////////////////////////////////////////////////////

}}}},{
  "extensions": [
    ".js",
    ".json",
    ".html",
    ".css"
  ]
});
require("/client/template.main.js");
require("/client/main.js");