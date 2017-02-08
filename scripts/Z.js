/*
	ZJS
	Author: Craig Dennis
*/

// Main Z object class
class ZElement
{
	constructor(selector, element = null)
	{
		this.Selector = selector;
		this.Elements = [];
		this._BuildElements(element);
	}

	/*
		Private methods
	*/

	// Called from constructor, builds list of elements contained by this object.
	_BuildElements(element)
	{
		this.Elements = [];

		// Do nothing if selector undefined. This may be because the user is just accessing static methods
		if(this.Selector != undefined)
		{
			// If a string, query the document for DOM elements or create Z.Element if wrapped with <>
			if(this.Selector.constructor === String)
			{
				if(this.Selector.substring(0, 1) == "<" && this.Selector.substring(this.Selector.length -1) == ">")
				{
					this.Elements = [Z.Element(this.Selector.substring(1, this.Selector.length -1)).Element()];
				}
				else
				{
					var Items = [];

					if(element === null)
						var Query = document.querySelectorAll(this.Selector);
					else
						var Query = element.querySelectorAll(this.Selector);
					
					Array.prototype.forEach.call(Query, function(Item){
						Items.push(Item);
					});
					this.Elements = Items;
				}
			}
			// If an a DOM element is passed, set that as the only element
			else if(this.Selector.tagName)
			{
				this.Elements.push(this.Selector);
			}
			// If a function is passed, just run it
			else if(typeof(this.Selector) === "function")
			{
				this.Selector();
			}
		}
	}

	_ElementCSSToObj(element)
	{
		var output = {};

		for (var i = 0; i < element.style.length; i++) {
			var name = element.style[i];
			var value = element.style.getPropertyValue(name);
			output[name] = value;
		}

		return output;
	}

	_SerializeQueryString(obj, prefix)
	{
		var str = [], p;
		for(p in obj) {
			if (obj.hasOwnProperty(p))
			{
				var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
				str.push((v !== null && typeof v === "object") ?
				serialize(v, k) :
				encodeURIComponent(k) + "=" + encodeURIComponent(v));
			}
		}

		return str.join("&");
	}

	_SetElementInnerHTML(element, argument)
	{
		if(typeof(argument) == "string")
			element.innerHTML += argument;
		else
			element.innerHTML += argument.Elements[0].outerHTML;
	}

	/*
		Elements and selection
	*/

	// Returns the first DOM element in collection
	Element()
	{
		return this.Elements[0];
	}

	// Returns the Nth element (I) as Z object
	GetNth(I)
	{
		return Z(this.Elements[I]);
	}

	// Returns the Nth child element (I) as Z object
	GetChild(I)
	{
		return Z(this.Elements[0].childNodes[I]);
	}

	// Find within
	Find(selector)
	{
		return Z(selector, this.Element[0]);
	}

	/*
		GETS / SETS
	*/

	// Returns inner HTML, or sets when parameters passed. Can accept any number of parameters of either string or a Z object
	HTML()
	{
		if(arguments.length == 0)
			return this.Elements[0].innerHTML;

		for(var e = 0; e < this.Elements.length; e++){
			this.Elements[e].innerHTML = "";

			for(var i = 0; i < arguments.length; ++i)
			{


				if(typeof(arguments[i]) == "string" || arguments[i] instanceof ZElement)
					this._SetElementInnerHTML(this.Elements[e], arguments[i]);
				else
					for(var v in arguments[i])
						this._SetElementInnerHTML(this.Elements[e], arguments[i][v]);
			}
		}

		return this;
	}

	// Appends to inner HTML with any number of parameters of either string or a Z object
	Append()
	{
		var Args = [];
		Z.Each(arguments, (Arg) => {Args.push(Arg);});
		this.HTML(this.HTML(), Args);
		return this;
	}

	// Prepends to inner HTML with any number of parameters of either string or a Z object
	Prepend()
	{
		var Args = [];
		Z.Each(arguments, (Arg) => {Args.push(Arg);});
		this.HTML(Args, this.HTML());
		return this;
	}

	// Returns Style value if CSS key passed as string.
	// Appends to CSS object if object [value] passed. Sets individual key/value if [value2] passed.
	CSS(value, value2 = null)
	{
		if(typeof(value) == "object")
		{
			this.Attr("style", null);

			Z.Each(this.Elements, function(Element){
				Z.Each(value, function(Item, Key){
					Element.style[Key] = Item;
				});
			});
		}
		else if(typeof(value) == "string" && typeof(value2) == "string")
		{
			Z.Each(this.Elements, function(Element){
				Element.style[value] = value2;
			});
		}
		else if(typeof(value) == "string")
		{
			return this.Elements[0].style[value];
		}
		else
		{
			return this._ElementCSSToObj(this.Elements[0]);
		}

		return this;
	}

	// Removes passed style key [key]
	RemoveStyle(Key)
	{
		Z.Each(this.Elements, function(Element){
			Element.style[Key] = null;
		});

		return this;
	}

	// Gets/Sets width
	Width(value)
	{
		return this.ClientStyle((value === undefined) ? "clientWidth" : "width", value);
	}

	// Gets/Sets height
	Height(value)
	{
		return this.ClientStyle((value === undefined) ? "clientHeight" : "height", value);
	}

	// Gets/Sets top positioning
	Top(value)
	{
		return this.ClientStyle((value === undefined) ? "clientTop" : "top", value);
	}

	// Gets/Sets left positioning
	Left(value)
	{
		return this.ClientStyle((value === undefined) ? "clientLeft" : "left", value);
	}

	// Returns element [type] if value not defined
	// Sets element style [type] to [value] if both defined
	ClientStyle(type, value)
	{
		if(value === undefined)
			return parseFloat(this.Elements[0][type]);

		Z.Each(this.Elements, function(Element){
			Element.style[type] = value;
		});

		return this;
	}

	// Returns attribute by [key] if value not defined
	// Sets attribute [key] to [value] if both defined, if [value] is null, remove the attribute [key]
	Attr(key, value)
	{
		if(value === undefined)
			return this.Elements[0].getAttribute(key);

		Z.Each(this.Elements, function(Element){
			if(value != null)
				Element.setAttribute(key, value);
			else
				Element.removeAttribute(key);
		});

		return this;
	}

	// Sets the elements value to [value]
	Val(value)
	{
		if(value === undefined)
			return this.Elements[0].value;

		Z.Each(this.Elements, function(Element){
			Element.value = value;
		});

		return this;
	}

	// Adds class [value]
	AddClass(value)
	{
		Z.Each(this.Elements, function(Element){
			Element.classList.add(value);
		});

		return this;
	}

	// Removes [value]
	RemoveClass(value)
	{
		Z.Each(this.Elements, function(Element){
			Element.classList.remove(value);
		});

		return this;
	}

	/*
		LISTENERS
	*/

	// Adds event listener of type [type] with function [func]
	AddListener(type, func)
	{
		var This = this;
		Z.Each(this.Elements, function(Element){
			Element.addEventListener(type, function(){
				func.call(This, this);
			});
		});
		
		return this;
	}

	// Removes listener of type [type] using function [func]
	RemoveListener(type, func)
	{
		Z.Each(this.Elements, function(Element){
			Element.removeEventListener(type, function(){
				func.call(This, this);
			});
		});
	}

	// MouseOver
	MouseEnter(func)
	{
		this.AddListener("mouseover", func);
		return this;
	}

	// MouseExit
	MouseExit(func)
	{
		this.AddListener("mouseleave", func);
		return this;
	}

	// When nothing passed, simulate click on first element
	// Adds click listener with function [func]
	Click(func)
	{
		if(func !== undefined)
			this.AddListener("click", func);
		else
			this.Element().click();
	}

	// When nothing passed, simulate submit on first element
	// Adds submit listener with function [func]
	Submit(func)
	{
		if(func !== undefined)
			this.AddListener("submit", func);
		else
			this.Element().submit();
	}

	/*
		AJAX
	*/

	Ajax(obj)
	{
		// Default settings
		var Settings = {
			URL: "",
			Type: "GET",
			Callback: null,
			Failure: null,
			Data: {}
		}

		// Settings overrides
		Z.Each(obj, (val, key) => {Settings[key] = val;});

		var This = this;

		// Perform request
		var xhttpd = new XMLHttpRequest();
		xhttpd.open(Settings.Type, Settings.URL, true);
		xhttpd.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttpd.send(this.SerializeQueryString(Settings.Data));

		xhttpd.onreadystatechange = function()
		{
			if(Settings.Callback != null && this.readyState == 4 && this.status == 200)
				Settings.Callback.call(This, this.responseText);
			else if(Settings.Failure != null)
				Settings.Failure.call(This, this.responseText);
		}

		return this;
	}

	Get(url, callback, failure)
	{
		this.Ajax({
			"URL":url,
			"Type":"GET",
			"Callback":callback,
			"Failure":failure
		});

		return this;
	}

	Post(url, data, callback, failure)
	{
		this.Ajax({
			"URL":url,
			"Type":"POST",
			"Data":data,
			"Callback":callback,
			"Failure":failure
		});

		return this;
	}

	/*
		Self referencing tools
	*/

	Wait(wait, func){
		setTimeout(func.call(this), wait);
	}

	Each(func)
	{
		Z.Each(this.Elements, (Element) => {
			func.call(this, Z(Element));
		});
	}

	Run(func)
	{
		func.call(this);
	}

	/*
		DESTRUCTIVE
	*/
	
	// Removes this all DOM elements from collection
	Remove()
	{
		for(var i = 0; i < this.Elements.length; i++)
			this.Elements[i].parentNode.removeChild(this.Elements[i]);
	}
}

Z = function(selector)
{
	return new ZElement(selector);
}

Z.Each = function(Items, func){
	for(var I in Items)
		func(Items[I], I);
}

Z.Wait = function(wait, func){
	setTimeout(func, wait);
}

Z.Every = function(wait, func, I = 0){
	func(I);
	I++;
	Z.Wait(wait, function(){
		Z.Every(wait, func, I);
	});
}

Z.WaitDo = function(Wait, Do){
	Z.WaitDoRun(Wait, Do, null);
}

Z.WaitDoRun = function(Wait, Do, Run){
	var T = 0;
	Z.UntilDoRun(() => {return T >= Wait;}, () => {
		T++;
		Do(T);
	}, () => {
		if(Run !== undefined && Run !== null) Run();
	});
}

Z.UntilRun = function(Until, Run){
	Z.UntilDoRun(Until, null, Run);
}

Z.UntilDoRun = function(Until, Work, Run){
	var Interval = setInterval(() => {
		if(!Until())
		{
			if(Work !== null) Work();
		}
		else
		{
			clearInterval(Interval);
			if(Run !== undefined && Run !== null) Run();
		}
	}, 1);
}

Z.Element = function(tag){
	return Z(document.createElement(tag));
}

Z.Ready = function(Func){
	Z.UntilRun(() => {return document.readyState === "complete";}, Func);
}