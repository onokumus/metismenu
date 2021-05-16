# metismenu [![NPM version](https://img.shields.io/npm/v/metismenu.svg?style=flat)](https://www.npmjs.com/package/metismenu) [![NPM monthly downloads](https://img.shields.io/npm/dm/metismenu.svg?style=flat)](https://npmjs.org/package/metismenu) [![NPM total downloads](https://img.shields.io/npm/dt/metismenu.svg?style=flat)](https://npmjs.org/package/metismenu)


> A collapsible jQuery menu plugin

- [Getting started](#getting-started)
  * [Install](#install)
  * [Download](#download)
- [Usage](#usage)
  * [Stopping list opening on certain elements](#stopping-list-opening-on-certain-elements)
    + [toggle](#toggle)
    + [dispose](#dispose)
    + [preventDefault](#preventdefault)
    + [triggerElement](#triggerelement)
    + [parentTrigger](#parenttrigger)
    + [subMenu](#submenu)
- [Events](#events)
- [Migrating to v3 from v2](#migrating-to-v3-from-v2)
- [Demo](#demo)
- [About](#about)
  * [Related projects](#related-projects)
  * [Contributors](#contributors)
  * [Contributing](#contributing)
  * [Release History](#release-history)
  * [Author](#author)
  * [License](#license)


## Getting started

### Install

Install with [npm](https://www.npmjs.com/):

```sh
npm install --save metismenu
```

Install with [yarn](https://yarnpkg.com):

```sh
yarn add metismenu
```

Install with [composer](https://getcomposer.org/)

```sh
composer require onokumus/metismenu:dev-master
```

### Download

[download](https://github.com/onokumus/metisMenu/archive/master.zip)

## Usage

1. Include metismenu StyleSheet

  ```html
  <link rel="stylesheet" href="https://unpkg.com/metismenu/dist/metisMenu.min.css">
  <!-- OR -->  
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/metismenu/dist/metisMenu.min.css">
  ```

1. Include jQuery

  ```html
  <script src="https://unpkg.com/jquery"></script>
  <!-- OR -->
  <script src="https://cdn.jsdelivr.net/npm/jquery"></script>
  ```

1. Include metisMenu plugin's code

  ```html
  <script src="https://unpkg.com/metismenu"></script>
  <!-- OR -->
  <script src="https://cdn.jsdelivr.net/npm/metismenu"></script>
  ```

1. Add id attribute to unordered list

  ```html
  <ul id="metismenu">

  </ul>
  ```

1. Make expand/collapse controls accessible

> Be sure to add `aria-expanded` to the element `a`. This attribute explicitly defines the current state of the collapsible element to screen readers and similar assistive technologies. If the collapsible element is closed by default, it should have a value of `aria-expanded="false"`. If you've set the collapsible element's parent `li` element to be open by default using the `mm-active` class, set `aria-expanded="true"` on the control instead. The plugin will automatically toggle this attribute based on whether or not the collapsible element has been opened or closed.

  ```html
  <ul id="metismenu">
    <li class="mm-active">
      <a href="#" aria-expanded="true">Menu 1</a>
      <ul>
      ...
      </ul>
    </li>
    <li>
      <a href="#" aria-expanded="false">Menu 2</a>
      <ul>
      ...
      </ul>
    </li>
    ...
    </ul>
  ```

1. Arrow Options

> add `has-arrow` class to `a` element

  ```html
  <ul id="metismenu">
  <li class="mm-active">
    <a class="has-arrow" href="#" aria-expanded="true">Menu 1</a>
    <ul>
    ...
    </ul>
  </li>
  <li>
    <a class="has-arrow" href="#" aria-expanded="false">Menu 2</a>
    <ul>
    ...
    </ul>
  </li>
  ...
  </ul>
  ```

1. Call the plugin:

  ```javascript
    $("#metismenu").metisMenu();
  ```

### Stopping list opening on certain elements

Setting aria-disabled="true" in the `<a>` element as shown will stop metisMenu opening the menu for that particular list. This can be changed dynamically and will be obeyed correctly:

```html
<a href="#" aria-expanded="false" aria-disabled="true">List 1</a>
```

#### toggle

Type: `Boolean`
Default: `true`

For auto collapse support.

```javascript
 $("#metismenu").metisMenu({
   toggle: false
 });
```

#### dispose

Type: `String`
Default: `null`

For stop and destroy metisMenu.

```javascript
 $("#metismenu").metisMenu('dispose');
```

#### preventDefault

Type: `Boolean`
Default: `true`

> Prevents or allows dropdowns' onclick events after expanding/collapsing.

  ```javascript
   $("#menu").metisMenu({
     preventDefault: false
   });
  ```

_since from version 2.7.0_

#### triggerElement

Type: `jQuery selector`
Default: `a`

```javascript
 $("#metismenu").metisMenu({
   triggerElement: '.nav-link' // bootstrap 5
 });
```

#### parentTrigger

Type: `jQuery selector`
Default: `li`

```javascript
 $("#metismenu").metisMenu({
   parentTrigger: '.nav-item' // bootstrap 5
 });
```

#### subMenu

Type: `jQuery selector`
Default: `ul`

```javascript
 $("#metismenu").metisMenu({
   subMenu: '.nav.flex-column' // bootstrap 5
 });
```

## Events

|**Event Type**      |**Description**|
|--------------|--------------|
|show.metisMenu    |This event fires immediately when the `_show` instance method is called.|
|shown.metisMenu   |This event is fired when a collapse `ul` element has been made visible to the user (will wait for CSS transitions to complete).|
|hide.metisMenu    |This event is fired immediately when the `_hide` method has been called. |
|hidden.metisMenu  |This event is fired when a collapse `ul` element has been hidden from the user (will wait for CSS transitions to complete).|

## Migrating to v3 from v2

* Update `metisMenu.js` & `metisMenu.css` files
* Change `active` class to `mm-active`

## Demo

[http://mm.onokumus.com](http://mm.onokumus.com)

Contains a simple HTML file to demonstrate metisMenu plugin.

## About

### Related projects

* [@metismenu/react](https://www.npmjs.com/package/@metismenu/react): react component for MetisMenu | [homepage](https://github.com/onokumus/metismenu-react#readme "react component for MetisMenu")
* [metismenujs](https://www.npmjs.com/package/metismenujs): MetisMenu with Vanilla-JS | [homepage](https://github.com/onokumus/metismenujs#readme "MetisMenu with Vanilla-JS")

### Contributors

| **Contributor** |  
| --- |  
|[onokumus](https://github.com/onokumus) |  
| [diegozhu](https://github.com/diegozhu) |  
| [sinabs](https://github.com/sinabs) |  
|[DrugoLebowski](https://github.com/DrugoLebowski) |  
| [BurkovBA](https://github.com/BurkovBA) |  
| [arthurtalkgoal](https://github.com/arthurtalkgoal) |  
| [mrdziuban](https://github.com/mrdziuban) |  
| [nicolasigot](https://github.com/nicolasigot) |  
| [PeterDaveHello](https://github.com/PeterDaveHello) |  
|  [kalidema](https://github.com/kalidema) |  
|  [AndrewEastwood](https://github.com/AndrewEastwood) |  
|  [rgnevashev](https://github.com/rgnevashev) |  
|  [719media](https://github.com/719media) |  
| [chriswiggins](https://github.com/chriswiggins) |  
| [jmagnusson](https://github.com/jmagnusson) |  
| [LukasDrgon](https://github.com/LukasDrgon) |  
| [Cediddi](https://github.com/Cediddi) |  
|  [WoMayr](https://github.com/WoMayr) |  
|  [capynet](https://github.com/capynet) |  

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

Please read the [contributing guide](.github/contributing.md) for advice on opening issues, pull requests, and coding standards.

### Release History

|**DATE**      |**VERSION**   |**CHANGES**|
|--------------|--------------|-----------|
|2021-05-16    |v3.0.7        |sass support|
|2020-03-22    |v3.0.6        |fix security vulnerabilities|
|2019-12-28    |v3.0.5        |Fix dispose to be similar to init (adding event) [#184](https://github.com/onokumus/metismenu/pull/184)|
|2019-03-07    |v3.0.4        |fix|
|2018-10-05    |v3.0.3        |fix|
|2018-10-05    |v3.0.2        |fix|
|2018-10-05    |v3.0.1        |fix|
|2018-10-05    |v3.0.0        |more functionally|
|2018-10-05    |v2.7.9.1      |Fix dispose option [#173](https://github.com/onokumus/metismenu/pull/173)|
|2018-06-28    |v2.7.9        |Make jquery a peer dependency|
|2018-06-14    |v2.7.8        |remove aria-expanded attribute & remove transitionend check|
|2018-02-14    |v2.7.4        |jQuery -> $ in src/metisMenu.js to fix import. [#158](https://github.com/onokumus/metismenu/pull/158)|
|2018-02-14    |v2.7.3        |window might not be defined in node.js environment [#156](https://github.com/onokumus/metismenu/pull/156)|
|2017-12-31    |v2.7.2        |isolate against bootstrap changes, remove old legacy ie9 code [#154](https://github.com/onokumus/metismenu/pull/154)|
|2017-10-30    |v2.7.1        |added check in complete()-callback to break when menu was disposed [#150](https://github.com/onokumus/metismenu/pull/150)|
|2017-03-08    |v2.7.0        |fixed `has-arrow` class border color & added new 3 options|
|2017-02-23    |v2.6.3        |fixed #129|
|2017-02-02    |v2.6.2        |doubleTapToGo option is deprecated|
|2016-12-06    |v2.6.1        |fix require.js|
|2016-11-29    |v2.6.0        |dispose support|
|2016-05-06    |v2.5.2        |fix Menu failed to remove collapsing class|
|2016-05-06    |v2.5.1        |fixed bootstrap conflict|
|2016-03-31    |v2.5.0        |Event support|
|2016-03-11    |v2.4.3        |create meteor package|
|2016-03-04    |v2.4.2        |back to version 2.4.0|
|2016-03-03    |v2.4.1        |<del>Transition element passed to methods</del> (removed)|
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

### Author

**Osman Nuri Okumus**

* [GitHub Profile](https://github.com/onokumus)
* [Twitter Profile](https://twitter.com/onokumus)
* [LinkedIn Profile](https://linkedin.com/in/onokumus)

### License

Copyright © 2021, [Osman Nuri Okumus](https://github.com/onokumus).
Released under the [MIT License](LICENSE).
