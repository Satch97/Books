function printCategories(ajax) {}


window.onload = function () {
  new Ajax.Request('http://10.26.104.41/Books/booklist.php', {
    method: 'get',
    parameters: {categorylist: 'true'},
    onSuccess: printCategories
  });
};
