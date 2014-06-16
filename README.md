rdfxml-to-jsonld-demo
=====================

Demo converter from RDF/XML to JSON-LD in Node.js

This is a rough demo that I got to work by cobbling together several modules:

https://github.com/antoniogarrote/rdfstore-js (RDF/XML parser currently not working)
https://github.com/linkeddata/rdflib.js/blob/master/rdfparser.js (for RDF/XML parser)
https://github.com/digitalbazaar/jsonld.js/ (above two modules convert RDF/XML to n-quads, which jsonld.js can convert to JSON-LD)

Obviously, it could be significantly improved.

# Instructions
Currently, the rdflib.js library throws an error when used in Node.js, so there are some extra steps to get around the errors. To get this demo working, follow these steps:

```
git clone https://github.com/ariutta/rdfxml-to-jsonld-demo.git
cd ./rdfxml-to-jsonld-demo
npm install
cd ./node_modules
git clone https://github.com/ariutta/rdflib.js.git
mv rdflib.js rdflib
cd ./rdflib
npm install
make
```
