var $rdf = require('rdflib');

// For quick access to those namespaces:
var FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
var RDF = $rdf.Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
var RDFS = $rdf.Namespace('http://www.w3.org/2000/01/rdf-schema#');
var OWL = $rdf.Namespace('http://www.w3.org/2002/07/owl#');
var DC = $rdf.Namespace('http://purl.org/dc/elements/1.1/');
var RSS = $rdf.Namespace('http://purl.org/rss/1.0/');
var XSD = $rdf.Namespace('http://www.w3.org/TR/2004/REC-xmlschema-2-20041028/#dt-');
var CONTACT = $rdf.Namespace('http://www.w3.org/2000/10/swap/pim/contact#');

// TestStore implementation from dig.csail.mit.edu/2005/ajar/ajaw/test/rdf/rdfparser.test.html
// RDFIndexedFormula from dig.csail.mit.edu/2005/ajar/ajaw/rdf/identity.js
//  (extends RDFFormula from dig.csail.mit.edu/2005/ajar/ajaw/rdf/term.js which has no indexing and smushing)
// for the real implementation used by Tabulator which uses indexing and smushing

var kb = $rdf.graph();

var uri = 'http://bblfish.net/people/henry/card.rdf';
var person = $rdf.sym(uri);

var docURI;
if (uri.indexOf('#') > -1) {
  docURI = uri.slice(0, uri.indexOf('#'));
} else {
  docURI = uri;
}

/**
 * Transforms a RDF JS Interfaces API Graph object into a JSON-LD serialization
 *
 * @arguments
 * @param graph JS RDF Interface graph object to be serialized
 * @param rdf JS RDF Interface RDF environment object
 */
var graphToJSONLD = function(graph, rdf) {
    var nodes = {};
    
    graph.forEach(function(triple) {
        var subject = triple.subject.valueOf();
        var node = nodes[subject];
        if(node == null) {
            node = {"@subject" : subject, "@context": {}};
            nodes[subject] = node;
        }

        var predicate = triple.predicate.valueOf();
        if(predicate === "http://www.w3.org/1999/02/22-rdf-syntax-ns#type") {
            predicate = "@type";
        }

        var property  = null;
        var isCURIE = false;
        property = rdf.prefixes.shrink(predicate);

        if(property != predicate) {
            isCURIE = true;
        }
        if(property.indexOf("#") != -1) {
            property = property.split("#")[1];
        } else {
            property = property.split("/");
            property = property[property.length-1];
        }

        var object = triple.object.valueOf();

        if(node[property] != null) {
            if(!isCURIE) {
                if(node["@context"][property] != null || property[0] === '@') {
                    if(typeof(node[property]) === "object") {
                        node[property].push(object);
                    } else {
                        object = [ node[property], object];
                        node[property] = object;
                    }
                } else {
                    property = triple.predicate.valueOf();
                    if(node[property] == null) {
                        node[property] = object;
                    } else {
                        if(typeof(node[property]) === "object") {
                            node[property].push(object);
                        } else {
                            object = [ node[property], object ];
                            node[property] = object;
                        }
                    }

                    if(typeof(object) === 'string' &&
                       (object.indexOf("http://") == 0 || object.indexOf("https://") == 0)) {
                        Server.jsonldCoerce(node, property, "@iri");
                    }
                }
            } else {
                var prefix = property.split(":")[0];
                if(typeof(node[property]) === "object") {
                    node[property].push(object);
                } else {
                    object = [ node[property], object];
                    node[property] = object;
                }
            }
        } else {
            node[property] = object;
            if(property[0] != '@') {
                if(isCURIE == true) {
                    // saving prefix
                    var prefix = property.split(":")[0];
                    node["@context"][prefix] = rdf.prefixes[prefix];
                } else {
                    // saving whole URI in context
                    node["@context"][property] = triple.predicate.valueOf();
                }

                if(typeof(object) === 'string' &&
                   (object.indexOf("http://") == 0 || object.indexOf("https://") == 0)) {
                    Server.jsonldCoerce(node, property, "@iri");
                }
                
            }
        }
    });

    var results = [];
    for(var p in nodes) {
        results.push(nodes[p]);
    }

    return results;
};



var fetch = $rdf.fetcher(kb);
fetch.nowOrWhenFetched(docURI,undefined,function(ok, body){ // @@ check ok
  console.log('Success: ' + ok);
  /*
  console.log('kb');
  console.log(kb);
  console.log('person');
  console.log(person);
  //*/
  


  //var serialized = graphToJSONLD(kb, rdf);
  //console.log(serialized);
  console.log('*****************************************************************************************************************************************************************************************');
  console.log('*****************************************************************************************************************************************************************************************');
  console.log('*****************************************************************************************************************************************************************************************');
  console.log('kb');
  //console.log(kb);
  console.log('*****************************************************************************************************************************************************************************************');
  console.log('*****************************************************************************************************************************************************************************************');
  console.log('*****************************************************************************************************************************************************************************************');
  console.log('*****************************************************************************************************************************************************************************************');
  console.log('*****************************************************************************************************************************************************************************************');
  console.log('*****************************************************************************************************************************************************************************************');
  console.log('kb.toString()');
  //console.log(kb.toString());
  console.log('*****************************************************************************************************************************************************************************************');
  console.log('*****************************************************************************************************************************************************************************************');
  console.log('*****************************************************************************************************************************************************************************************');

  var jsonld = require('jsonld');

  var nquads = kb.toString().replace(/{/g,'').replace(/}/g,'');

  /*
  // use the promises API
  var promises = jsonld.promises();

  // deserialize from RDF
  var promise = promises.fromRDF(nquads, {format: 'application/nquads'});
  promise.then(function(doc) {
    console.log('doc');
    console.log(doc);
  }, function(err) {
    console.log(err);

  });
  //*/

  //*
  // deserialize N-Quads (RDF) to JSON-LD
  jsonld.fromRDF(nquads, {format: 'application/nquads'}, function(err, doc) {
    // doc is JSON-LD
    console.log('*****************************************************************************************************************************************************************************************');
    console.log('*****************************************************************************************************************************************************************************************');
    console.log('*****************************************************************************************************************************************************************************************');
    console.log('doc');
    console.log(JSON.stringify(doc, null, '\t'));
    console.log('*****************************************************************************************************************************************************************************************');
    console.log('*****************************************************************************************************************************************************************************************');
    console.log('*****************************************************************************************************************************************************************************************');
  });
  //*/

  /*
  var jsonld = {
    "@context": 
    {  
      "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
      "xsd": "http://www.w3.org/2001/XMLSchema#",
      "name": "http://xmlns.com/foaf/0.1/name",
      "age": {"@id": "http://xmlns.com/foaf/0.1/age", "@type": "xsd:integer" },
      "homepage": {"@id": "http://xmlns.com/foaf/0.1/homepage", "@type": "xsd:anyURI" },
      "ex": "http://example.org/people/"
    },
    "@id": "ex:john_smith",
    "name": "John Smith",
    "age": "41",
    "homepage": "http://example.org/home/"
  };    

  store.setPrefix("ex", "http://example.org/people/");

  store.load("application/ld+json", jsonld, "ex:test", function(success, results) {
    store.node("ex:john_smith", "ex:test", function(success, graph) {
      console.log('*****************************************************************************************************************************************************************************************');
      console.log('*****************************************************************************************************************************************************************************************');
      console.log('*****************************************************************************************************************************************************************************************');
      console.log('graph');
      console.log(graph);
      console.log('*****************************************************************************************************************************************************************************************');
      console.log('*****************************************************************************************************************************************************************************************');
      console.log('*****************************************************************************************************************************************************************************************');
      // process graph here
    });
  });
  //*/

});
