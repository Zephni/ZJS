# ZJS

ZJS will streamline your JavaScript code. Note this is an experimental project and has many similarities to JQuery, however ZJS already has some functionality that JQuery does not have. Remember I am not attempting to
replace JQuery, however I will continue building ZJS so it has every function I need throughout my projects. Feel free to play with it :)

**CDN for lastest GitHub repo usage**
```html
<script type="text/javascript" src="https://rawgit.com/Zephni/ZJS/master/scripts/Z.js"></script>
```

**Example below is standard JavaScript (14 lines)**

```javascript
Body = document.querySelector("body");
Div = document.createElement("div");
Div.style.width = "60%";
Div.style.margin = "10px auto";
Div.style.border = "3px dotted #999999";
Div.style.padding = "15px";
H2 = document.createElement("h2");
H2.style.color = "goldenrod";
H2.innerHTML = "JavaScript Style";
P = document.createElement("p");
P.innerHTML = PText;
Div.appendChild(H2);
Div.appendChild(P);
Body.appendChild(Div);
```

**Example below is using ZJSS (1 line)**
```javascript
Z("body").Append(Z("<div>").CSS({"width":"60%", "margin":"10px auto", "border":"3px dotted #999999", "padding":"15px"}).Append(Z("<h2>").HTML("Z Style").CSS("color", "goldenrod"), Z("<p>").HTML(PText)));
```

**Some of ZJS handy tools**

Do something every X and get iterations with I
```javascript
Z.Wait(50, function(I){
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

You can create a ZJS object with either of the following styles
```javascript
Example = Z("<div>");
Example = Z.Element("div");
```

You can select an element, or collection of elements with a standard CSS query selector
```javascript
Example = Z("div");
Example = Z(".someClass");
Example = Z("input[type='submit']");
```

Once again, remember this is experimental. But if you have any questions/suggestions please contact me on contact@zephni.com