# ZJS

ZJS will streamline your JavaScript code. Note this is an experimental project and has many similarities to JQuery, however ZJS already has some functionality that JQuery does not have. Remember I am not attempting to
replace JQuery, however I will continue building ZJS so it has every function I need throughout my projects. Feel free to play with it :)

**CDN for lastest GitHub repo usage**
```html
<script type="text/javascript" src="https://rawgit.com/Zephni/ZJS/master/scripts/Z.js"></script>
```

**Some of ZJS handy tools**

Do something every X and get iterations with I
```javascript
Z.Every(50, function(I){
	// Do something every 50, can use 'I' for number of iterations
});
```

Wait and then run a function
```javascript
Z.Wait(1000, function(){
	// Do something
});
```

Wait and do something with the timer every frame (Note Z.WaitDoRun accepts another function that will be called after the time is complete)
```javascript
Z.WaitDo(1000, function(T){
	// Use T to get current progression
});
```

UntilRun accepts a conditional function, and runs the second function once it is true
```javascript
Z.UntilRun(function(){return X == Y;}, function(){
	// X is now == Y
});
```

UntilDoRun accepts a conditional function, and runs the second function while it is false, then finally the third once it is true
```javascript
X = 0;
Y = 10;
Z.UntilDoRun(function(){return X == Y;}, function(){
	X++;
}, function(){
	// X is now == Y
});
```

**Z.Element usage, note to see all check scripts/Z.js**

Create a ZJS object with either of the following styles
```javascript
Example = Z("<div>");
Example = Z.Element("div");
```

Select an element, or collection of elements with a standard CSS query selector
```javascript
Example = Z("div");
Example = Z(".someClass");
Example = Z("input[type='submit']");
```

GetNth will return the nth item from the query selector but as it's own Z.Element
```html
<p>Paragraph 1</p>
<p>Paragraph 2</p>
<p>Paragraph 3</p>
```
```javascript
// This will select the second paragraph returned by the 'p' selector
Z("p").GetNth(1);
```

GetChild will return the nth child belonging to this element
```html
<div id="group">
	<h2>Title</h2>
	<span>Info</span>
	<p>Paragraph</p>
</div>
```
```javascript
// This would return the <span> Z.Element from above
Z("#group").GetChid(1);
```

Element will return the actual javascript DOM element
```javascript
Z("#example").Element().style.color = "blue";
```

HTML methods (Assume example is a Z.Element)
```javascript
// Just set the text
Example.HTML("Some text");

// Set a Z.Element as a child
P = Z("<p>").HTML("Some text");
Example.HTML(P);

// Set multiple elements/text at once
P = Z("<p>").HTML("Second line");
Example.HTML("<p>First line</p>", P);

// Append/Prepend has all the functionality of HTML(), but will only append/prepend it to the current html
Example.Append("Some text");
Example.Prepend("Some text");
```

CSS Method
```javascript
// Get CSS style
Color = Example.CSS("color");

// Set CSS style
Example.CSS("color", "red");

// Append/Change multiple styles by passing object
Example.CSS({"background":"blue", "color":"white"});
```

Please check Z.js for more usages.

Once again, remember this is experimental. But if you have any questions/suggestions please contact me on contact@zephni.com