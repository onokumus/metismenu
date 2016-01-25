# metisMenu [![NPM version](https://badge.fury.io/js/metismenu.svg)](http://badge.fury.io/js/metismenu) [![Bower version](https://badge.fury.io/bo/metisMenu.svg)](http://badge.fury.io/bo/metisMenu) [![PHP version](https://badge.fury.io/ph/onokumus%2Fmetismenu.svg)](http://badge.fury.io/ph/onokumus%2Fmetismenu) [![Build Status](https://secure.travis-ci.org/onokumus/metisMenu.svg?branch=master)](https://travis-ci.org/onokumus/metisMenu)

> A jQuery menu plugin


## Installation

* [npm](http://npmjs.org/)

```bash
npm install metismenu
```

* [Bower](http://bower.io)

```bash
bower install metisMenu
```

* [composer](https://getcomposer.org/)

```bash
composer require onokumus/metismenu:dev-master
```

* [Download](https://github.com/onokumus/metisMenu/archive/master.zip)

## Usage

1. Include metisMenu StyleSheet

    ```html
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/metisMenu/2.4.0/metisMenu.min.css">
    ```
    OR
    ```html
    <link rel="stylesheet" href="//cdn.jsdelivr.net/jquery.metismenu/2.4.0/metisMenu.min.css">
    ```

2. Include jQuery

    ```html
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    ```
    OR
    ```html
    <script src="//cdn.jsdelivr.net/jquery/2.2.0/jquery.min.js"></script>
    ```

3. Include metisMenu plugin's code

    ```html
    <script src="//cdnjs.cloudflare.com/ajax/libs/metisMenu/2.4.0/metisMenu.min.js"></script>
    ```
    OR
    ```html
    <script src="//cdn.jsdelivr.net/jquery.metismenu/2.4.0/metisMenu.min.js"></script>
    ```

4. Add class `metismenu` to unordered list

    ```html
    <ul class="metismenu" id="menu">

    </ul>
    ```
5. Make expand/collapse controls accessible

  > Be sure to add `aria-expanded` to the element `a` and the following `ul`. This attribute explicitly defines the current state of the collapsible element to screen readers and similar assistive technologies. If the collapsible element is closed by default, it should have a value of `aria-expanded="false"`. If you've set the collapsible element's parent `li` element to be open by default using the `active` class, set `aria-expanded="true"` on the control instead. The plugin will automatically toggle this attribute based on whether or not the collapsible element has been opened or closed.

  ```html
  <ul class="metismenu" id="menu">
    <li class="active">
      <a href="#" aria-expanded="true">Menu 1</a>
      <ul aria-expanded="true">
      ...
      </ul>
    </li>
    <li>
      <a href="#" aria-expanded="false">Menu 2</a>
      <ul aria-expanded="false">
      ...
      </ul>
    </li>
    ...
    </ul>
  ```

6. Call the plugin:

    ```javascript
    $("#menu").metisMenu();
   ```


### Options

#### toggle
Type: `Boolean`
Default: `true`

For auto collapse support.

```javascript
  $("#menu").metisMenu({
    toggle: false
  });
```

#### activeClass
Type: `String`
Default: `active`


```javascript
  $("#menu").metisMenu({
    activeClass: 'active'
  });
```

#### collapseClass
Type: `String`
Default: `collapse`


```javascript
  $("#menu").metisMenu({
    collapseClass: 'collapse'
  });
```

#### collapseInClass
Type: `String`
Default: `in`


```javascript
  $("#menu").metisMenu({
    collapseInClass: 'in'
  });
```


#### collapsingClass
Type: `String`
Default: `collapsing`


```javascript
  $("#menu").metisMenu({
    collapsingClass: 'collapsing'
  });
```

#### doubleTapToGo
Type: `Boolean`
Default: `false`

For double tap support.

```javascript
  $("#menu").metisMenu({
    doubleTapToGo: true
  });
```

#### preventDefault
Type: `Boolean`
Default: `true`

Prevents or allows dropdowns' onclick events after expanding/collapsing.

```javascript
  $("#menu").metisMenu({
    preventDefault: false
  });
```

### Events

#### onTransitionStart
#### onTransitionEnd

```javascript
  $('#menu').metisMenu({
    onTransitionStart: function(){
      console.log('onTransitionStart');
    },
    onTransitionEnd: function(){
      console.log('onTransitionEnd');
    }
  });
```

### Stopping list opening on certain elements
Setting aria-disabled="true" in the `<a>` element as shown will stop metisMenu opening the menu for that particular list. This can be changed dynamically and will be obeyed correctly:

```html
<a href="#" aria-expanded="false" aria-disabled="true">List 1</a>
```


### Testing
```bash
npm install
bower install
grunt serve
```

### TypeScript type definitions

Install TSD globally using npm:
```bash
$ npm install tsd -g
```

Install metismenu TypeScript definition file
```bash
$ tsd install metismenu
```


### [DEMO](http://mm.onokumus.com)

Contains a simple HTML file to demonstrate metisMenu plugin.

### Release History
|**DATE**      |**VERSION**  |**CHANGES**|
|-||
|2016-01-25    |v2.4.0        |Support AMD / Node / CommonJS|
|2016-01-08    |v2.3.0        |Adding aria-disabled=true to the link element prevents the dropdown from opening|
|2015-09-27    |v2.2.0        |Events supported & added preventDefault options|
|2015-08-06    |v2.1.0        |RTL & `aria-expanded` attribute & TypeScript type definitions support|
|2015-07-25    |v2.0.3        |When the active item has doubleTapToGo should not collapse|
|2015-05-23    |v2.0.2        |[fixed](https://github.com/onokumus/metisMenu/issues/34#issuecomment-104656754)|
|2015-05-22    |v2.0.1        |changeable classname support|
|2015-04-03    |v2.0.0        |Remove Bootstrap dependency|
|2015-03-24    |v1.1.3        |composer support|
|2014-11-01    |v1.1.3        |Bootstrap 3.3.0|
|2014-07-07    |v1.1.0	      |Add double tap functionality|
|2014-06-24    |v1.0.3	      |cdnjs support & rename plugin|
|2014-06-18    |v1.0.3        |Create grunt task|
|2014-06-10    |v1.0.2        |Fixed for IE8 & IE9|


## Author

metisMenu was made with love by these guys and a bunch of awesome [contributors](https://github.com/onokumus/metisMenu/graphs/contributors).

[![Osman Nuri Okumuş](https://0.gravatar.com/avatar/4fa374411129d6f574c33e4753ec402e?s=70)](http://onokumus.com) |
--- | --- | --- | --- | --- | --- | ---
[Osman Nuri Okumuş](http://onokumus.com) |


## License

[MIT License](https://github.com/onokumus/metisMenu/blob/master/LICENSE)
