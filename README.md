Lazy and modularised transform functions for Meteor collections
===============================================================

Meteor Mongo Collections can only have a single transform function added at the time of 
declaration. 

```
Pets = new Mongo.Collection('pets', { 
  transform: function(doc){ return new Pet(doc) 
} } );
Pet = function (doc) { _.extend(this, doc); };
Pet.prototype.introduction = function () { 
  return 'It\'s ' + this.name + ' the ' + this.animal + '!'; 
};
```

This prevents any flexibility of adding methods or modifiers after declaration, such as in 
another script file or a seperate package, which may make sense for modularity.

It also prevents multiple transform functions acting on the one collection.

Retransform allows unlimited transform functions to be declared anywhere.

```
Pets.transform(function(doc){
  doc.name = doc.name.toUpperCase()
  return doc;
})
```

In this example, both the original transform and this extra function are run when a transform 
usually would.

```
Pets.insert({ name: 'Fluffy', animal: 'Dog' });
Pets.findOne().introduction();
// => "It's FLUFFY the Dog!"
```

Retransform also provides shortcut for defining properties upon transform by declaring them as
a primitive object. This is a simple way to set document defaults.

```
Pets.transform({
  domestic: true
})
```
