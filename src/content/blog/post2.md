---
title: "Getting started using Python’s ElementTree to navigate XML files"
description: "A few tips on getting started and avoiding some under-documented sources of frustration."
pubDate: "Mar 1 2020"
heroImage: "/blog/sherlock_final.webp"
---

More often than not, when you are gathering data via APIs you will be presented with the [**_JSON_**](https://www.w3schools.com/whatis/whatis_json.asp) format, a conveniently packaged nested dictionary (or list of them). But while the adoption of JSON is ubiquitous, sometimes you may have to work with the older [**_XML_**](https://www.w3schools.com/xml/xml_whatis.asp) standard.

How can you work with XML? It depends on what library you use as there are four that are frequently used. Three of included of them are included in Python’s standard library: [**_MiniDom_**](https://docs.python.org/3/library/xml.dom.minidom.html), [**_Sax_**](https://docs.python.org/3/library/xml.sax.reader.html) and [**_ElementTree_**](https://docs.python.org/3.8/library/xml.etree.elementtree.html); each offering a distinct API to interact with the XML files; while [**_lxml_**](https://lxml.de/) (a library that builds on Element Tree) will require an additional download via Python’s package manager.

The libraries all come with their own trade-offs. The advantages of ElementTree lie in that it provides capabilities to facilitate both reading and writing the entire XML, the API is specific to and optimized for Python, and that it is already included with most Python installs.

<figure class="blog-image">
    <img
        alt="Meme of Sherlock Holmes slapping Watson like Batman"
        src="/blog/sherlock_final.webp">
    <figcaption>
        Image composed using <a href="https://krita.org/en/">Krita</a>.
    </figcaption>
</figure>

I’ve included some code examples from a [**_TCX_**](https://en.wikipedia.org/wiki/Training_Center_XML) file (a type of XML) generated from a smart-watch below. Also provided are edited snippets from my foray into writing a Python class for an unconventional use-case: modifying XML files created by lower end smart watches to provide extra insights on swim activities when uploaded to online sports trackers. You can see the full repo with the code in action here:

[https://github.com/coreyryanhanson/y\_u\_no\_swim](https://github.com/coreyryanhanson/y_u_no_swim)

## How does XML work?

<figure class="blog-image">
    <img
        alt="Illustration of a tree sticking out of an XML tag"
        src="/blog/element_tree.webp">
    <figcaption>
        Image composed using <a href="https://inkscape.org/">Inkscape</a> and public domain sources.
    </figcaption>
</figure>

If you are familiar with HTML, you may very well feel at home navigating through the XML structure. Each [element is bookened by tags forming layers of hierarchical data](https://www.w3schools.com/xml/xml_elements.asp).

The opening tag is indicated by the notation “<_name of tag_\>”, while the closing tag includes a slash before the name: “</_name of tag_\>”. An opening tag can also contain attributes which provide extra information about that particular instance of a tag and can also distinguish it from others.

```xml
<!-- An excerpt of an xml document that recorded a swim showing how
tags can fit inside other tags. Here "Activities" can contain one or
more instances of an "Activity" which contains one or more instances
of a Lap. -->
<Activities>
    <Activity Sport="Other">
        <Id>2019-08-21T23:43:28.000Z</Id>
        <Lap StartTime="2019-08-21T23:43:29.000Z">
            <TotalTimeSeconds>81.0</TotalTimeSeconds>
            <DistanceMeters>0.0</DistanceMeters>
            <Calories>279</Calories>
        <!-- The data continues with the closing tag for the lap,
        followed by the closing tag for the activity, and
        finally a closing tag for all of the activities. -->
```

By default Python will treat all of the data contained in these tags as a single unwieldy string of text, but using a library such as element tree allows for a list-like navigation that is much more efficient.

## Getting started with ElementTree

When you use ElementTree the entire XML is parsed and stored in an [**_ElementTree object_**](https://docs.python.org/3.8/library/xml.etree.elementtree.html#xml.etree.ElementTree.ElementTree). The API is powerful in that not only can run searches for specific tags saving specific [**_Elements_**](https://docs.python.org/3.8/library/xml.etree.elementtree.html#xml.etree.ElementTree.Element) in other variables, but also any modifications and insertions to them will be reflected back to the entire tree.

```python
import xml.etree.ElementTree as ET

# Uses element tree to parse the url or local file and stores it in
# memory.
tree = ET.parse(path)

# Stores the top level tag (and all children) of the tree into a
# variable. You will mostly be using this in your xml interactions
# with the entire document.
root = tree.getroot()
```

## Enter namespaces: the least intuitive part of ElementTree

So you’ve imported the library, parsed the file, and are ready to begin exploring the data. Or are you? If your XML happens to contain [**_namespaces_**](https://www.w3schools.com/xml/xml_namespaces.asp), the answer is no.

```python
# Prints a string of the entire XML document
print(ET.tostring(root, 'utf-8')
```

A quick preview of the text shows that a strange anomaly has decided to insert itself throughout your XML. One that is not present in the original document when viewed directly through a text editor or parsed with another library.

```xml
<!-- Unknown namespace causes "ns0:" to be inserted
in every single tag. -->
<ns0:Trackpoint>
    <ns0:Time>
        2019-08-22T00:10:16.000Z
    </ns0:Time>
    <ns0:HeartRateBpm>
        <ns0:Value>
            120
        </ns0:Value>
    </ns0:HeartRateBpm>
    <ns0:SensorState>
        Present
    </ns0:SensorState>
</ns0:Trackpoint>
```

Why is this happening? Undefined namespaces will wreck havoc on your ElementTree workflow. Because XML is an extensible standard that allows anyone to create their own system and define their own set of tags, XML provides a means to ensure these tags in different XML ecosystems are unique from each other preventing confusion when overlaps are bound to occur.

While other libraries will take care of this in the background, ElementTree needs these namespaces defined explicitly, otherwise your XML will be cluttered with clunky placeholder annotation.

Defining namespaces manually may sound daunting, but it is not as hard as it sounds. All of the needed information should be present right in the XML that you are working with. ElementTree just needs to be properly configured with the information contained in the attribute indicated by **_xmlns_** (which incidentally stands for **_XML namespace_**). You will see it followed by a [**_uri_**](https://dev.to/flippedcoding/what-is-the-difference-between-a-uri-and-a-url-4455) which often takes the form of a url.

```xml
<!-- An xml namespace attribute inside that element's tag follows this
basic format. -->
<Author xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="Application_t">
```

While at first glance, it may look like a complicated component dependent on internet connectivity, **_it is merely a unique identifier_**. Any hyperlinks are just added as convention and a resource for developers to find more information if they choose. Also note that if no parameter is specified between the xmlns attribute and the uri, then it indicates a **_default namespace_**.

```xml
<!-- Default namespaces follow this format. -->
xmlns="namespaceURI"
```

To define namespaces in ElementTree, you can find and pass them through individually…

```python
# Be sure to replace "URI" with the actual URI in your XML document.
ET.register_namespace('', "URI")
ET.register_namespace('xsi', "http://www.w3.org/2001/XMLSchema-instance")
```

…or you could abstract the process defining the namespaces directly from the document to handle things in a more procedural fashion. Doing this is easier said than done, but can be achieved with some lower level trickery in the [**_iterparse_**](https://docs.python.org/3.8/library/xml.etree.elementtree.html?highlight=iterparse#xml.etree.ElementTree.iterparse) function that ElementTree provides.

```python
# Uses a list comprehension and element tree's iterparse function to
# create a dictionary containing the namespace prefix and it's uri.
# The underscore is utilized to remove the "start-ns" output from the
# list.
namespaces = {node[0]: node[1] for _, node in ET.iterparse(self.filepath, events=['start-ns'])}

# Iterates through the newly created namespace list registering each one.
for key, value in namespaces.items():
    ET.register_namespace(key, value)
```

What is useful about this particular block of code is that it stores all of the document’s namespaces in a single dictionary, which will come in handy later when you execute searches because that dictionary will need to be passed in as an argument. Without it, you will likely get no matches when using commands like [**_findall_**](https://docs.python.org/3.8/library/xml.etree.elementtree.html?highlight=findall#xml.etree.ElementTree.Element.findall).

## Ready to start working? Not quite… namespaces strike again!

While it can be argued that the level of namespace specificity needed by ElementTree can be great if you are faced with a situation with overlapping tag names, there is one particular quirk that is hard to justify: ElementTree’s handling of default namespaces.

Long story short, [**_it does not know what to do with a namespace key of an empty string_**](https://stackoverflow.com/questions/34009992/python-elementtree-default-namespace).

While an oversight this clunky can be somewhat disappointing, you can minimize the inconvenience and move forward by storing the text that allows for manual searching within the default namespace into a variable to be used later.

```python
# The curly braces are needed around the uri when using
# Element Tree's find command with a manually passed namespace.
default_ns = "{" + namespaces[""] + "}"

# By inserting your namespace variable immediately before the search
# term your code will return the results you expect.
activ_tag = root.find(".//" + default_ns + "Activity")
```

Now, you will be all set up to leverage the capabilities of ElementTree on your XML without further hindrance. Refer to [the documentation](https://docs.python.org/3.8/library/xml.etree.elementtree.html) for examples on what you can do.

## One final formatting note

XML is a language that ignores whitespace completely. If for any reason you need seamlessly to output an XML into a format that makes the hierarchical structure more human readable, it may be harder to do so in ElementTree.

To overcome this, there [are several approaches you could take](https://stackoverflow.com/questions/749796/pretty-printing-xml-in-python). For my smart-watch script, I used a workaround that involved sacrificing efficiency for brevity and importing the entire XML in MiniDom to use their [**_toprettyxml_**](https://docs.python.org/2/library/xml.dom.minidom.html?highlight=prettyxml#xml.dom.minidom.Node.toprettyxml) method at export time since the files aren’t too large. You can check out [my code](https://github.com/coreyryanhanson/y_u_no_swim) for an example on how to set this up.

Depending on how your XML is structured, using ElementTree for the first time may be rocky. Getting started was a source of frustration for me, but once I figured out a few tricks, I found it to be an extremely versatile tool that did exactly what I needed!
