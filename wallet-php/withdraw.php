<?php
require_once "./assets/data.php";

header("Content-Type: application/json");

$response = [];

if ($_SERVER["REQUEST_METHOD"] == "GET") {
  $type = $_GET["type"];
  $token = $_GET["token"];

  if (empty($type) || empty($token)) {
    $response = [
      "status" => "error",
      "message" => "Type and token are required.",
    ];
    echo json_encode($response);
    exit();
  }

  $sql = "SELECT balance, id, number FROM user WHERE token = '$token'";
  $result = mysqli_query($conn, $sql);
  $user = mysqli_fetch_assoc($result);
  $balance = $user["balance"] ?? 0;
  $userId = $user["id"] ?? 0;
  $number = $user["number"];

  if (!$user) {
    $response = ["status" => "error", "message" => "Invalid token."];
    echo json_encode($response);
    exit();
  }

  if ($type === "Upi") {
    $upiId = $_GET["upiId"];
    $amount = $_GET["amount"];

    if (empty($upiId) || empty($amount)) {
      $response = [
        "status" => "error",
        "message" => "UPI ID and amount are required.",
      ];
      echo json_encode($response);
      exit();
    }

    if ($balance >= $amount) {
      $newBalance = $balance - $amount;
      $sql = "UPDATE user SET balance = '$newBalance' WHERE token = '$token'";
      mysqli_query($conn, $sql);

      $sql = "INSERT INTO transaction (title, amount, date, time, type, toname, toupi, tonameb, tobank, toifsc, user, tref) 
        VALUES ('$type', $amount, '$date', '$time', 'debit', '$toname', '$upiId', '$name', '$accountNumber', '$ifsc', '$number', '$tref')";

      mysqli_query($conn, $sql);

      $response = [
        "status" => "success",
        "message" => "Withdrawal successful via UPI.",
      ];
    } else {
      $response = ["status" => "error", "message" => "Insufficient balance."];
    }
  } elseif ($type === "Bank") {
    $name = $_GET["name"];
    $accountNumber = $_GET["accountNumber"];
    $ifsc = $_GET["ifsc"];
    $amount = $_GET["amount"];

    if (
      empty($name) ||
      empty($accountNumber) ||
      empty($ifsc) ||
      empty($amount)
    ) {
      $response = [
        "status" => "error",
        "message" => "Name, account number, IFSC, and amount are required.",
      ];
      echo json_encode($response);
      exit();
    }

    if ($balance >= $amount) {
      $newBalance = $balance - $amount;
      $sql = "UPDATE user SET balance = '$newBalance' WHERE token = '$token'";
      mysqli_query($conn, $sql);

      $sql = "INSERT INTO transaction (title, amount, date, time, type, toname, toupi, tonameb, tobank, toifsc, user, tref) 
        VALUES ('$type', $amount, '$date', '$time', 'debit', '$toname', '$upiId', '$name', '$accountNumber', '$ifsc', '$number', '$tref')";

      mysqli_query($conn, $sql);

      $response = [
        "status" => "success",
        "message" => "Withdrawal successful via bank transfer.",
      ];
    } else {
      $response = ["status" => "error", "message" => "Insufficient balance."];
    }
  } else {
    $response = ["status" => "error", "message" => "Invalid withdrawal type."];
  }

  mysqli_close($conn);
} else {
  $response = ["status" => "error", "message" => "Invalid request method."];
}

echo json_encode($response);
?>
