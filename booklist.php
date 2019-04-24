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
  }

?>
