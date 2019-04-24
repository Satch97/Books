function getBooks(){
  var radios = document.getElementsByName('category');

  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
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
