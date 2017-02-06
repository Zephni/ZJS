# ZJS

ZJS will streamline your JavaScript code. Note this is an experimental project and has many similarities to JQuery, however ZJS already has some functionality that JQuery does not have. Remember I am not attempting to
replace JQuery, however I will continue building ZJS so it has every function I need throughout my projects. Feel free to play with it :)

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

Once again, remember this is experimental. But if you have any questions/suggestions please contact me on contact@zephni.com