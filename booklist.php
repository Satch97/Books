<?php
  if(isset($_GET['categorylist'])){

  try {
     $db = new PDO('mysql:dbname=booksdb;host=localhost', 'reader', 'bookworm');
     $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

     $categories = $db->query("SELECT cat_name FROM category;");

     $xmlresponse = "<?xml version='1.0' encoding='utf-8'?>\n";
     $xmlresponse .= "<categories>\n";

     header("Content-type: text/xml; charset=utf-8");

     foreach ($categories as $category) {
       $xmlresponse .= "<category>";
       $xmlresponse .= $category["cat_name"];
       $xmlresponse .= "</category>\n";
     }

  } catch (PDOException $ex) {

    echo ("failed request");
  }
  $xmlresponse .= "</categories>\n";
  echo($xmlresponse);

  exit;

} elseif(isset($_GET['booklist'])){

  $categ_name = $_GET["category"];

  try {
     $db = new PDO('mysql:dbname=booksdb;host=localhost', 'reader', 'bookworm');
     $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
     $categ_name = $_GET['category'];
     $categ_name = $db->quote($categ_name);
     $books = $db->query("SELECT book_name, book_author, year
                          FROM category c
                          JOIN book b
                          ON c.cat_id = b.cat_id
                          WHERE c.cat_name = $categ_name");
     $xmlresponse .= "<books>\n";

     header("Content-type: text/xml; charset=utf-8");

     foreach ($books as $book) {
        $xmlresponse .= "<book>";

        $xmlresponse .= "</book>\n";
     }


  } catch (PDOException $ex) {
  }

  exit;
}

?>
