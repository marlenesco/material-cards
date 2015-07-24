Material Card
=============
Simple user card based on [Google Material Color palette](https://www.google.com/design/spec/style/color.html#color-color-palette).

Less files
-------------
    material-card.less
    gm-variables.less
    mixin.less
    material-color.less
 
> `material-card.less` is the main `.less` file that includes the other .less files.  
> `gm-variables.less` contains all the [color palette](https://www.google.com/design/spec/style/color.html#color-color-palette) with the color accent.  
> `mixin.less` contains some utilities.  
> `material-color.less` contains the material color variant based on `gm-variables.less`

Usage
---------
Yo can download full package and check the **demo** folder for implementation example or you can use **bower**:

    bower install material-card
    
Demo files require [Font Awesome](http://fortawesome.github.io/Font-Awesome/)

Material Card jQuery plugin
------------------------------------
You can use material card with a simple jQuery script (demo file located in **demo** folder).  
Or you can use the **jquery plugin** to manage **options**, **methods** and **events** for full customization.

Check inside **js/** folder **jquery.material-card.js** or **jquery.material-card.min.js**

### Init jquery material card

```javascript
$('.material-card').materialCard(options);
```

Options
----------

```javascript
options = {
    icon_close	   : 'fa-arrow-left', //string
    icon_open	   : 'fa-bars',       //string
    icon_spin	   : 'fa-spin-fast',  //string
    card_activator : 'click'          //string: click or hover
});
```

The icons are from [Font Awesome](http://fortawesome.github.io/Font-Awesome/), `fa-spin-fast` is similar to [`fa-spin`](http://fortawesome.github.io/Font-Awesome/examples/#animated) but faster.  

The default **card_activator** is the **click** event on button card, but you can also use **hover** (this option remove the button).

Methods
-----------

`toggle`: change selected material card state

```javascript
$('.material-card').materialCard('toggle');
```
    
`open`: open selected material card

```javascript
$('.material-card:eq(1)').materialCard('open');
```

`close`: close selected material card

```javascript
$('.material-card:eq(2)').materialCard('close');
```
   
`isOpen`: check material card status, return **true** or **false**

```javascript
if($('.material-card:eq(3)').materialCard('isOpen') === true) {
	// do something
}
```

Events
---------
* `show.material-card`: triggered immediately when the **open** instance method is called
* `shown.material-card`: triggered when the card becomes visible to the user (will wait the end of the CSS transitions)
* `hide.material-card`: triggered immediately when the **close** instance method is called
* `hidden.material-card`: triggered when the card has become hidden to the user (will wait for end of CSS transitions)

### Examples

```javascript
$('.material-card').on('shown.material-card', function (event) {
    console.log(event.type, event.namespace, $(this));
    //that return
    //shown material-card [article.material-card...]
});
```

```javascript
var fullCardEvent = 'shown.material-card show.material-card hide.material-card hidden.material-card';
$('.material-card').on(fullCardEvent, function (event) {
	//   do something
});
```
