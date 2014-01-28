// Set up a collection to contain background ole.log(olor information. On the server,
// it is backed by a MongoDB collection named "bgcolor".

Colors = new Meteor.Collection("bgcolor22");



if (Meteor.isClient) {


Template.hello.greeting = function () {
    return "Welcome to hood.";
  };

  Template.hello.bgcolor = function () {
        var bgc = Colors.findOne();
	console.log(bgc);
	if (bgc){
	     $('body').css('background-color',bgc.name);
	    return bgc.name;
		
	//return "red";
	}
	};


  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    	 $('body').css('background-color','yellow');
    }
  });
}

if (Meteor.isServer) {



  Meteor.Router.add({
  '/inbound':  function() {
	      post = this.request.body;
	console.log(post)
color = post.subject;
	      Colors.update({pos: 1},{ $set: { "name": color } } );

	      return [200, "Success"]
	      }
    });




Meteor.startup(function () {
    // code to run on server at startup

console.log(Colors.update({pos: 1},{ $set: { "name": "red" } } ));

if (Colors.find().count() === 0) {
	console.log("insert");
	var names = ["blue"];
	Colors.insert({name: names[0], pos: 1});
	}

  });
}
