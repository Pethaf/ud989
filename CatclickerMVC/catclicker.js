document.addEventListener("load", (function(){
var catPictureView = 
{
	init: function()
	{
		this.name = document.getElementById("catname");
		this.picture = document.getElementById("catpicture");
		this.counter = document.getElementById("counter");
		this.picture.addEventListener("click",octopus.updateCounter);
		catPictureView.render();
	},
	render: function()
	{
		var theCat = octopus.getCurrentCat()
		this.name.textContent = theCat.name;
		this.picture.src = theCat.imageURL;
		this.counter.textContent = theCat.counter;
	}
}

var catlistView = 
{
	init: function()
	{
		this.theList = document.getElementById("catlist");
		this.theList.addEventListener("click",octopus.updateCurrentCat);
		catlistView.render();
	},
	render: function()
	{
		octopus.getAllCats().forEach(function(cat)
		{
			var catNode = document.createElement("li");
			catNode.textContent = cat.name;
			catlist.appendChild(catNode);
	   	}
	   );
	}
}

var adminFormView = 
{
	init: function() 
	{
		this.adminButton = document.getElementById("adminbutton");
		this.adminForm = document.getElementById("catform");
		this.catNameForm = document.getElementById("kittyname");
		this.catImageForm = document.getElementById("kittypicture");
		this.catCounterForm = document.getElementById("kittycounter");
		this.hidden = true;
		adminbutton.addEventListener("click",function(){
			console.log("admin button");
			adminFormView.hidden = !adminFormView.hidden;
			adminFormView.render();
		})
			document.getElementById("save").addEventListener("click",function(e){
			e.preventDefault();
			adminFormView.saveCat();
		});
			document.getElementById("cancel").addEventListener("click", function(e){
				e.preventDefault();
				adminFormView.cancel();
			});
		this.render();
	
			
	},
	render: function()
	{
		if(this.hidden)
		{
			this.adminForm.style.display = "none";
		}
		else
		{
			this.adminForm.style.display = "flex";
			var cat = octopus.getCurrentCat();
			this.catNameForm.placeholder = cat.name;
			this.catImageForm.placeholder = cat.imageURL;
			this.catCounterForm.placeholder = cat.counter;
		}
	},
	saveCat: function()
	{
		octopus.saveCat((this.catNameForm.value || this.catNameForm.placeholder),
			            (this.catImageForm.value || this.catImageForm.placeholder),
			            (this.catCounterForm.value || this.catCounterForm.placeholder));
	},
	cancel: function()
	{
		this.catNameForm.value ="";
		this.catImageForm.value = "";
		this.catCounterForm.value="";
		this.render();
	}
}

var octopus = 
{
	init: function()
	{
		model.init();
		catlistView.init();
		catPictureView.init();
		adminFormView.init();
	},

	getCurrentCat: function()
	{
		return model.getCurrentCat();
	},
	updateCounter: function()
	{
		model.updateCounter();
		catPictureView.render();
		adminFormView.render();
	},
	updateCurrentCat: function()
	{
		model.updateCurrentCat(event);
		catPictureView.render();
		adminFormView.render();
	},
	getAllCats: function()
	{
		return model.getAllCats();
	},

	saveCat: function(name, imageURL, counter)
	{
		model.saveCat(name,imageURL,counter);
		catPictureView.render();
		adminFormView.render();
	}
}

var model = 
{
	cats: [],
	currentCat: null,
	Cat: function(name, imageURL){
    	this.name = name;
    	this.imageURL = imageURL;
    	this.counter = 0;
  	},
  init: function()
  {
  	var catNames =
    [
      ["Sebastian","http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg"],
      ["Claude","http://placekitten.com.s3.amazonaws.com/homepage-samples/200/287.jpg"],
      ["Bumbalerina","http://placekitten.com.s3.amazonaws.com/homepage-samples/200/139.jpg"],
      ["Electra","http://placekitten.com.s3.amazonaws.com/homepage-samples/200/138.jpg"],
      ["Demeter","http://placekitten.com.s3.amazonaws.com/homepage-samples/96/139.jpg"]
    ];
      catNames.forEach(function(cat){
      model.cats.push(new model.Cat(cat[0],cat[1]));
    })
      model.currentCat = model.cats[0];
	},
	getAllCats: function()
	{
		return model.cats;
	},
	getCurrentCat: function()
	{
		return model.currentCat;
	},
	updateCounter: function()
	{
		model.currentCat.counter+=1;
	},
	updateCurrentCat: function(event)
	{
		if(event.target.tagName==="LI");
		{
			model.cats.forEach(function(cat){
				if(cat.name === event.target.textContent)
				{
					model.currentCat = cat;
				}
			})
		}
	},
	saveCat: function(name, imageURL, counter)
	{
		model.currentCat.name = name;
		model.currentCat.imageURL = imageURL;
		model.currentCat.counter = counter;
	}
	}	
	octopus.init();
})())