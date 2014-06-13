rdfxml-to-jsonld-demo
=====================

Demo converter from RDF/XML to JSON-LD in Node.js

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
