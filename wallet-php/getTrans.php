<?php
require_once './assets/data.php'; 

$response = [];

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $token = $_GET['token'];

    if (empty($token)) {
        $response = ["status" => "error", "message" => "Invalid token."];
        echo json_encode($response);
        exit;
    }

    $sql = "SELECT number FROM user WHERE token = '$token'";
    $result = mysqli_query($conn, $sql);
    $user = mysqli_fetch_assoc($result);
    $number = $user['number'] ?? null;

    if ($number) {
        $sql = "SELECT * FROM transaction WHERE user = '$number'";
        $result = mysqli_query($conn, $sql);
        
        $transactions = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $transactions[] = $row;
        }

        $response = ["status" => "success", "transactions" => $transactions];
    } else {
        $response = ["status" => "error", "message" => "No user found for the provided token."];
    }

    mysqli_close($conn);
} else {
    $response = ["status" => "error", "message" => "Invalid request method."];
}

echo json_encode($response);
?>