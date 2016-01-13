
console.log(Meteor.Collection)

Retransform = (function( collection ){
  if(collection._transform && collection._transform.re) return collection._transform.re;
  var p=this.constructor.prototype; for(var m in p){ this[m] = this[m].bind(this); }
  this.run.re = this;
  Object.defineProperties(this, { transforms: { value: [] } });
  if(collection._transform) {
    var existingTransform = collection._transform;
    this.add(existingTransform);
  }
  collection._transform = this.run;
  return collection.retransform;
});

Retransform.prototype.add = function(transformFunction){
  this.transforms.push( transformFunction );
  return this;
};

Retransform.prototype.run = function(doc){
  this.transforms.forEach(function( transform ){
    if( 'function' === typeof transform ){
      doc = transform.call( doc, doc );
    } else if( 'object' === typeof transform ) {
      for( var key in transform ) {
        Object.defineProperty(doc, key, { value: transform[key] });
      }
    }
  });
  return doc;
};