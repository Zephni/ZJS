/*
	ZJS
	Author: Craig Dennis
*/

Z = function(selector)
{
	// Main Z object class
	class ZElement
	{
		constructor(selector, element = null)
		{
			this.Selector = selector;
			this.Elements = [];
			this._BuildElements(element);
		}

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

			Z.Each(this.Elements, (Element) => {
				Element.innerHTML = "";
			});

			for(var arg = 0; arg < arguments.length; ++ arg)
			{
				var value = arguments[arg];

				if(value.constructor === Array)
				{
					for(var i = 0; i < value.length; i++)
						this.HTML(this.HTML(), value[i]);
				}
				else
				{
					Z.Each(this.Elements, (Element) => {
						if(typeof(value) != "string")
							Element.appendChild(value.Elements[0]);
						else
							Element.innerHTML = Element.innerHTML + value;
					});
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
			Z.Each(this.Elements, function(Element){
				Element.addEventListener(type, func);
			});
			
			return this;
		}

		// Removes listener of type [type] using function [func]
		RemoveListener(type, func)
		{
			Z.Each(this.Elements, function(Element){
				Element.removeEventListener(type, func);
			});
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
			Self referencing tools
		*/

		Wait(wait, func){
			setTimeout(func(this), wait);
		}

		Every(wait, func, I = 0)
		{
			var Iteration = I;
			func(Iteration, this);
			Z.Wait(wait, () => {
				Iteration++;
				func(Iteration, this);
				this.Every(wait, func, Iteration);
			});

			return this;
		}

		Run(func)
		{
			func(this);
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

	return new ZElement(selector);
}

Z.Each = function(Items, func){
	for(var I in Items)
		func(Items[I], I);
}

Z.Every = function(wait, func, I = 0){
	var Iteration = I;
	Z.Wait(wait, () => {
		Iteration++;
		func(Iteration);
		Z.Every(wait, func, Iteration);
	});
}

Z.Wait = function(wait, func){
	setTimeout(func, wait);
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