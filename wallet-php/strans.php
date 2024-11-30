<?php
require_once './assets/data.php'; 

$response = [];

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $id = $_GET['id'];
    $token = $_GET['token'];

    if (empty($id) || empty($token)) {
        $response = ["status" => "error", "message" => "ID and token are required."];
        echo json_encode($response);
        exit;
    }

    $sql = "SELECT number FROM user WHERE token = '$token'";
    $result = mysqli_query($conn, $sql);
    $user = mysqli_fetch_assoc($result);

    if (!$user) {
        $response = ["status" => "error", "message" => "Invalid token."];
        echo json_encode($response);
        exit;
    }

    $userId = $user['number'];

    $sql = "SELECT * FROM transaction WHERE id = '$id' AND user = '$userId'";
    $result = mysqli_query($conn, $sql);
    $transaction = mysqli_fetch_assoc($result);

    if ($transaction) {
        $response = ["status" => "success", "transaction" => $transaction];
    } else {
        $response = ["status" => "error", "message" => "Transaction not found."];
    }

    mysqli_close($conn);
} else {
    $response = ["status" => "error", "message" => "Invalid request method."];
}

echo json_encode($response);
?>