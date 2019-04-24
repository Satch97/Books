function getRadioButton(category_name) {
  var radiobtn = document.createElement("input");
  radiobtn.type = "radio";
  radiobtn.name = "category";
  radiobtn.value = category_name;
  return radiobtn;
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
