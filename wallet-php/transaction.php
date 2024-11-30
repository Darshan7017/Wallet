<?php
require_once './assets/data.php'; 

$message = "";

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $password = $_GET['password'];

    if ($password !== "Darshan701") {
        $message = json_encode(["status" => "error", "message" => "Invalid password. Data not inserted."]);
    } else {
        $title = $_GET['title'];
        $amount = $_GET['amount'];
        $type = $_GET['type'];
        $toname = $_GET['toname'];
        $toupi = $_GET['toupi'];
        $tonameb = $_GET['tonameb'];
        $tobank = $_GET['tobank'];
        $toifsc = $_GET['toifsc'];
        $user = $_GET['user'];
        $tref = $_GET['tref'];

        $sql = "INSERT INTO transaction (title, amount, date, time, type, toname, toupi, tonameb, tobank, toifsc, user, tref) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sissssssssss", $title, $amount, $date, $time, $type, $toname, $toupi, $tonameb, $tobank, $toifsc, $user, $tref);

        if ($stmt->execute()) {
            $message = json_encode(["status" => "success", "message" => "Transaction added successfully!"]);
        } else {
            $message = json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
        }

        $stmt->close();
    }

    $conn->close();
    
    echo $message;
}
?>