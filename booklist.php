<?php
  try {
    $db = new PDO('mysql:dbname=booksdb;host=localhost', 'reader', 'bookworm');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  } catch (PDOException $ex) {
  }
?>
