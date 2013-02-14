Cross-browser element selection.

## Usage
```javascript
var select = require('dom.select');

var elId = select('#byId');
var elClass = select('.byClass');
var elClassContext = select('.byClassContext', elId);
var elTag = select('p');
var elTagContext = select('p', elId);
var elTagClass = select('p.byClass');
```