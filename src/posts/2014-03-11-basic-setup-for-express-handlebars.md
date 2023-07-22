---
date: 2014-03-11T12:27:41Z
tags:
- nodejs
- express
- handlebars
title: basic setup for express + handlebars
slug: basic-setup-for-express-handlebars/
---

<p class="text-center"><img src="/media/images/2014/Mar/nodejs_logo_w_128.png" width="277px" alt=""><img src="/media/images/2014/Mar/express_loog_w_128.png" width="267px" alt=""></p>

This is a basic guide on getting started with node.js using express.
You can use tools to automate the creation of express apps but I decided to do it manually as you get more idea of what is going on so if/when you encounter problems you have more idea than you would if you blindly used a tool.

**create a new working directory**

    mkdir newexpress
    cd newexpress

**install express**

    npm install express

    node_modules/express/bin/express
    npm install

**install handlebars for express**

    npm install express3-handlebars --save

    rm views/*
    cp -R node_modules/express3-handlebars/examples/basic/views/* views/

**enable handlebars templating**

*edit app.js*

add

```js
var exphbs = require('express3-handlebars');
```

replace

```js
app.set('view engine', 'jade');
```

with

```js
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
```

remove or comment out default routes

```js
var routes = require('./routes');
var user = require('./routes/user');

app.get('/', routes.index);
app.get('/users', user.list);
```

add new routes

```js
app.get('/', function (req, res) {
    res.render('home');
});
```

You should now be able to start the app with `node app`.<br>The example views are basic but you can easily add in 'partials' to extend layouts.

This can also be extended to include other modules like sass etc.<br> I personally have extended it to use grunt + sass + livereload just to make is easier for designing sites.

_**UPDATE:** 22nd March 2014_

I have now switched from `express3-handlebars` to `express-hbs`.