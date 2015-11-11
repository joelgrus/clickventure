/* The component representing one of the click options.
 * Its properties are:
 * - targetKey: the key of the node it links to
 * - text: the text to display
 * - onChoice: the function to call when this choice is
 *   clicked on, it takes targetKey as a variable.
 */
var ClickOption = React.createClass({
  handleClick: function(event) {
    console.log(this);
    this.props.onChoice(this.props.targetKey);
  },
  render: function() {
    return (
      <div className="click-option"
           onClick={this.handleClick}>
        {this.props.text}
      </div>
    );
  }
});

/* The component representing all the click options for a node.
 * If the node has click options, it renders them. If the node
 * has no click options, it renders a "the end" message instead.
 *
 * Its properties are:
 * - onChoice: the function to call (with targetKey as a parameter)
 *   when one of the choices is clicked.
 * - choices: the array of choices at this node.
 *
 */
var ClickOptions = React.createClass({
  render: function() {
    var onChoice = this.props.onChoice;
    var options;
    if (this.props.choices) {
      options = this.props.choices.map(function(choice){
        return (
          <ClickOption text={choice.text}
                       onChoice={onChoice}
                       targetKey={choice.targetKey} />
        );
      });
    } else {
      var backToStart = function() {
        onChoice("start");
      };
      return (
        <div>
          <div className="the-end">THE END</div>
          <div className="back-to-start" onClick={backToStart}>back to start</div>
        </div>
      );
    }

    return (
      <div className="clickOptions">
      {options}
      </div>
    );
  }
});

// A map from nodeKey -> node.
var nodes = {};

var Node = React.createClass({
  getInitialState: function() {
    return {key : "start"};
  },
  goToNextNode: function(key) {
    this.setState({key : key});
  },
  render: function() {
    var node = nodes[this.state.key];
    return (
      <div className="node">
        <img src={node.image.uri} />
        <div className="node-text">{node.text}</div>
        <ClickOptions choices={node.choices}
                      onChoice={this.goToNextNode} />
      </div>
    );
  }
});

$.get("data.yaml", function(text) {
  var data = jsyaml.safeLoad(text);
  data.nodes.forEach(function(node){
    nodes[node.key] = node;
  });
  ReactDOM.render(
    <Node />,
    document.getElementById('content')
  );
});
