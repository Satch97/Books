function  getListElem(book) {
  var elem = document.createElement("li");
  elem.innerHTML = book["bookname"] + ",  by " + book["author"] + " (" + book["year"] + ')';
  return elem;
}


function updateListlabel(category) {
  $("listlabel").innerHTML = 'Books in category "' + category + '":';
}


function clearList() {
  var listnode = $("booklist");
  var children = listnode.childElements();
  for (var i = 0; i < children.length; i++) {
    $("booklist").removeChild(children[i]);
  }
}

function printBooks(ajax) {
  if(window.format == "XML") {
    var books = ajax.responseXML.getElementsByTagName("book");
    var dict = {};
    clearList();
    for (let i = 0; i < books.length; i++) {
      dict["bookname"] = books[i].getElementsByTagName("name")[0].firstChild.nodeValue;
      dict["author"] = books[i].getElementsByTagName("author")[0].firstChild.nodeValue;
      dict["year"] = books[i].getElementsByTagName("year")[0].firstChild.nodeValue;
      li = getListElem(dict);
      $("booklist").appendChild(li);
    }
  } else if (window.format == "JSON") {
    var json = ajax.responseText.evalJSON();
    var dict = {};
    clearList();
    for (let i = 0; i < json.length; i++) {
      dict["bookname"] = json[i]["name"];
      dict["author"] = json[i]["author"];
      dict["year"] = json[i]["year"];
      li = getListElem(dict);
      $("booklist").appendChild(li);
    }
  }

}


function generateBooks(categ) {
  new Ajax.Request('http://10.26.104.41/Books/booklist.php', {
    method: 'get',
    parameters: { booklist: 'all',
                  category : categ,
                  format : window.format},
    onSuccess: printBooks
  });

}


function getBooks(){
  var radios = document.getElementsByName('category');

  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      updateListlabel(radios[i].value);
      generateBooks(radios[i].value);
      break;
    }

  }
}

function getRadioButton(category_name) {
  var radiobtn = document.createElement("input");
  radiobtn.type = "radio";
  radiobtn.name = "category";
  radiobtn.value = category_name;
  return radiobtn;
}


function getLabel(label_name) {
  var label = document.createElement("label");
  label.innerHTML = label_name;
  return label;
}


function getListButton(){
  var button = document.createElement("input");
  button.type = "button";
  button.value = "List Books";
  button.onclick = getBooks;
  return button;
}


function printCategories(ajax) {
  if (window.format == "XML") {
    var categories = ajax.responseXML.getElementsByTagName("category");
    for (let i = 0; i < categories.length; i++) {
      category = categories[i].firstChild.nodeValue;
      radio = getRadioButton(category);
      label = getLabel(category);
      $("controls").appendChild(radio);
      $("controls").appendChild(label);
    }
  }
  else if (window.format == "JSON") {
    var json = ajax.responseText.evalJSON();
    for (let i = 0; i < json.length; i++) {
      category = json[i]["category"];
      radio = getRadioButton(category);
      label = getLabel(category);
      $("controls").appendChild(radio);
      $("controls").appendChild(label);
    }
  }


    button = getListButton();
    $("controls").appendChild(button);
}


window.onload = function () {
  if (window.location.search.substr(1) == "format=json") {
    window.format = "JSON";
  } else {
    window.format = "XML";
  }
  new Ajax.Request('http://10.26.104.41/Books/booklist.php', {
    method: 'get',
    parameters: {categorylist: 'true', format: window.format},
    onSuccess: printCategories
  });

};
