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



     $json_data=array();
     $xmlresponse .= "<books>\n";

    header("Content-type: text/xml; charset=utf-8");

     foreach ($books as $book) {
        $xmlresponse .= "<book>";

        $xmlresponse .= "<name>";
        $xmlresponse .= $book["book_name"];
        $xmlresponse .= "</name>\n";

        $xmlresponse .= "<author>";
        $xmlresponse .= $book["book_author"];
        $xmlresponse .= "</author>\n";

        $xmlresponse .= "<year>";
        $xmlresponse .= $book["year"];
        $xmlresponse .= "</year>\n";

        $xmlresponse .= "</book>\n";

        $json_array['name']=$book['book_name'];
        $json_array['author']=$book['book_author'];
        $json_array['year']=$book['year'];
        array_push($json_data,$json_array);
     }

  } catch (PDOException $ex) {

        echo ("failed request");
        echo ("Sorry, a database error occurred. Please try again later.</p>
              <p>(Error details: <?= $ex->getMessage() ?>)");

  }

  $xmlresponse .= "</books>\n";
  if(isset($_GET['format']) && $_GET['format'] == "JSON") {
    header('Content-Type: application/json');
    echo json_encode($json_data);
    exit;
  }
  echo($xmlresponse);

  exit;
}

?>
