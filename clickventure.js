/* The component representing one of the click options.
 * Its properties are:
 * - targetKey: the key of the node it links to
 * - text: the text to display
 * - onChoice: the function to call when this choice is
 *   clicked on, it takes targetKey as a variable.
 */
var ClickOption = React.createClass({
  handleClick: function(event) {
    this.props.onChoice(this.props.targetKey);
  },
  render: function() {
    return (
      <button className="click-option"
           onClick={this.handleClick}>
        {this.props.text}
        &#8594;
      </button>
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
          <button className="warning back-to-start" onClick={backToStart}>back to start</button>
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
    console.log(node);
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

var Title = React.createClass({
  render: function() {
    return (
      <div><h1>{this.props.title}</h1></div>
    );
  }
});

$.get("data.yaml", function(text) {
  console.log(text);
  var data = jsyaml.safeLoad(text);
  console.log(data);
  data.nodes.forEach(function(node){
    nodes[node.key] = node;
  });
  ReactDOM.render(
    (<div>
       <Title title={data.title || ClickVenture} />
       <Node />
     </div>),
    document.getElementById('content')
  );
});
