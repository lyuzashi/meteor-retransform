Object.defineProperties( Meteor.Collection.prototype, {
  _transforms: {
    get: function(){
      if(!this.__transforms) this.__transforms = [];
      return this.__transforms;
    }
  },
  _transform: {
    get: function(){
      return this.runTransforms.bind(this);
    },
    set: function(transform){
      this.transform.bind(this)(transform);
    }
  },
  transform: {
    value: function(transform){
      this._transforms.push(transform);
      return this;
    }
  },
  runTransforms: {
    value: function(doc){
      this._transforms.forEach(function( transform ){
        if( 'function' === typeof transform ){
          doc = transform.call( doc, doc );
        } else if( 'object' === typeof transform ) {
          for( var key in transform ) {
            Object.defineProperty(doc, key, { value: transform[key] });
          }
        }
      });
      return doc;
    }
  }
} );
