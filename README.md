# ClickVenture

A React-based implementation of a ClickHole-style <a href="http://www.clickhole.com/features/clickventure/">ClickVenture</a>.

The details are in `data.yaml` which needs to have a `nodes` attribute with an array of nodes. Each node should have

* `key` : a unique id for the node. The start node should have the key `start`
* `text` : the description of the node
* `image` : the image to display. Right now this should have a `uri` property that gets used as the `<img src`.
* `choices` : a list of the choices available at that node. If a node has no `choices` property, it is a terminal node.

Each choice needs

* `targetKey` : the id of the node that choice takes you to.
* `text` : the text presented for the choice

You can also specify a `title` in the data file.

## Note

This is the first thing I ever built in React, so I'm sure it's suboptimal in a lot of ways.
