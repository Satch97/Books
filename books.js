function  getListElem(book) {
  var elem = document.createElement("li");
  elem.innerHTML = book["bookname"] + ",  by " + book["author"] + " (" + book["year"] + ')';
  return elem;
}


function updateListlabel(category) {
  $("listlabel").innerHTML = 'Books in category "' + category + '"';
}


function clearList() {
  var listnode = $("booklist");
  var children = listnode.childElements();
  for (var i = 0; i < children.length; i++) {
    $("booklist").removeChild(children[i]);
  }
}

function printBooks(ajax) {
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
}


function generateBooks(categ) {
  new Ajax.Request('http://10.26.104.41/Books/booklist.php', {
    method: 'get',
    parameters: { booklist: 'all',
                  category : categ},
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
  var categories = ajax.responseXML.getElementsByTagName("category");
  for (let i = 0; i < categories.length; i++) {
    category = categories[i].firstChild.nodeValue;
    radio = getRadioButton(category);
    label = getLabel(category);
    $("controls").appendChild(radio);
    $("controls").appendChild(label);
  }

    button = getListButton();
    $("controls").appendChild(button);
}


window.onload = function () {
  new Ajax.Request('http://10.26.104.41/Books/booklist.php', {
    method: 'get',
    parameters: {categorylist: 'true'},
    onSuccess: printCategories
  });
};
