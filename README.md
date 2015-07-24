Material Card
=============
Simple user card based on Google Material Color palette.

More info [Color palette](https://www.google.com/design/spec/style/color.html#color-color-palette).

Less files
-------------
    material-card.less
    gm-variables.less
    mixin.less
    material-color.less
 
> **material-card.less** are the **.less material card core file** that inlcude other .less file.  
> **gm-variables.less** contain all [color palette](https://www.google.com/design/spec/style/color.html#color-color-palette) with the color accent.  
> **mixin.less** contain some utility.  
> **material-color.less** contains the material color variant based on **gm-variables.less**

Usage
---------
Yo can download full package and check inside **demo** folder for implementation or via **bower**:

    bower install material-card
    
Demo files require [Font Awesome](http://fortawesome.github.io/Font-Awesome/)

Material Card jquery plugin
------------------------------------
You can use material card with a simple jquery script (demo file located in **demo folder**).  
Otherwise you can use **jquery plugin** that manage **options**, **methods** and **events** for full customization.

Check inside **js/** folder **jquery.material-card.js** or **jquery.material-card.min.js**

###Init jquery material card

    $('.material-card').materialCard(options);

Options
----------
    options = {
        icon_close			: 'fa-arrow-left',		//string
        icon_open			: 'fa-bars',			//string
        icon_spin			: 'fa-spin-fast',		//string
        card_activator		: 'click'				//string     **click** or **hover**
    });

------

The icon are [Font Awesome](http://fortawesome.github.io/Font-Awesome/), **fa-spin-fast** is similar [**fa-spin**](http://fortawesome.github.io/Font-Awesome/examples/#animated) but more fast.  

The default **card_activator** is **click** event on button card, you can use **hover** option, *this option remove the button*.

Methods
-----------

**toggle** change selected material card state

    $('.material-card').materialCard('toggle');
    
**open** open selected material card

    $('.material-card:eq(1)').materialCard('open');
    
**close** close selected material card

    $('.material-card:eq(2)').materialCard('close');
    
    
**isOpen** check material card status, return **true** or **false**

    if($('.material-card:eq(3)').materialCard('isOpen') === true) {
    	//    do something    }

Events
---------
* **show.material-card** This event fires immediately when the **open** instance method is called
* **shown.material-card** This event is fired when the card has been made visible to the user (will wait for end of CSS transitions)
* **hide.material-card** This event fires immediately when the **close** instance method is called
* **hidden.material-card** This event is fired when the card has finished being hidden from the user (will wait for end of CSS transitions)   

###Se code below

    $('.material-card').on('shown.material-card', function (event) {
        console.log(event.type, event.namespace, $(this));
        //that return
        //shown material-card [article.material-card...]    });
    
-----

    var fullCardEvent = 'shown.material-card show.material-card hide.material-card hidden.material-card';
    $('.material-card').on(fullCardEvent, function (event) {
    	//   do something    });