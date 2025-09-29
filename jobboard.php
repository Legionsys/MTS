<?php
#page setup
$pName = "jboard";
include_once 'header.php';
$pName = "";
if (!defined("FS_ROOT")) {
    define("FS_ROOT", realpath(dirname(__FILE__)));
}
require_once FS_ROOT . '/inc/dbh.inc.php';

?>
<!-- Body content template for the Job Board page -->
<div class="job-board-container">
  <div class="status-indicators">
    <p><span id="last-update">Never</span></p>
    <div id="error-message" style="display: none; color: red; padding: 10px; background-color: #f8d7da; border-radius: 4px;"></div>
  </div>
  <div class="table-wrapper">
  <table id="job-table" class="table table-striped">
    <thead>
      <tr>
        <th>Customer Name</th>
        <th>Job</th>
        <th>Date</th>
        <th>Scheduled Time</th>
        <th>Collection Address</th>
        <th>Collection Suburb</th>
        <th>Delivery Date</th>
        <th>Delivery Address</th>
        <th>Delivery Suburb</th>
        <th>Consignment Number</th>
        <th>No Items</th>
        <th>Freight Description</th>
        <th>Weight (kg)</th>
        <th>Length (cm)</th>
        <th>Width (cm)</th>
        <th>Height (cm)</th>
        <th>Qty</th>
        <th>UN Num</th>
        <th>Supplier Name</th>
        <th>Trailer</th>
      </tr>
    </thead>
    <tbody id="job-table-body"></tbody>
  </table>
  </div>
  <div id="no-jobs-message" style="display: none; text-align: center; padding: 20px;">
    <p>No jobs found.</p>
  </div>
</div>
<?php
echo '<script src="' . fileDetails("/js/jboard.js") . '"></script>';
include_once 'footer.php'
?>