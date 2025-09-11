<?php
//include library


define("FS_ROOT", realpath(dirname(__FILE__)));
require FS_ROOT.'/inc/dbh.inc.php';
include(FS_ROOT.'/TCPDF/tcpdf.php');
//base object
$pdf = new TCPDF('L','mm','A4');
//Getting Data from Server
if (isset($_GET['CNID'])) {
    $CNID = safeStrReplace("|",",",$_GET['CNID']);
} else {
    exit();
}
$MKR = '';
if (isset($_GET['mrkr'])) {
    $MKR = $_GET['mrkr'];
}



//pull data from Server
$sql = "SELECT * FROM `conNotes` WHERE cnID in ($CNID);";

$resultData = mysqli_query($conn,$sql);
if (mysqli_num_rows($resultData) > 0){
    //check for multiple con notes and set file name Accordingly

    while ($row = mysqli_fetch_assoc($resultData)) {
        if (strlen($CNID)==strlen(safeStrReplace(",","",$CNID))) {
            $fnam = $row['cnNum'];
        } else {
            $fnam = "MTS_CN_Pack";
        }
        if (is_null($row['hl'])) {
            $MKR = '';
        } else {
            $MKR = $row['hl'];
        }
        //Reused Vars
        $cnote = $row['cnNum'];

        //remove header and footer
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);
        //add page -- create loop for multiple connote output inc content
        $pdf->SetMargins(10,2,2,false);
        $pdf->SetAutoPageBreak(true,2);
        for ($i = 0; $i < 2; $i++) {
            $pdf->AddPage();

            //add content
            //header
            $pdf->SetLineStyle(array('width' => 0.1, 'cap' => 'butt', 'join' => 'miter', 'dash' => 0, 'color' => array(125,125,125)));
            // Set the fill color to light yellow (255, 255, 204)
            $pdf->SetFillColor(255, 255, 102);
            if (strpos($MKR,"P") !== false) {
                // Draw a rectangle as a highlight behind the code section
                $pdf->Rect(200, 22, 45, 67, 'F');
            }
            if (strpos($MKR,"S") !== false) {
                // Draw a rectangle as a highlight behind the code section
                $pdf->Rect(8, 188, 116, 14, 'F');
                //draw the rectangle for the boders overlapped
            }
            if (strpos($MKR,"R") !== false) {
                // Draw a rectangle as a highlight behind the code section
                $pdf->Rect(120, 177, 124, 25, 'F');
            }
            $pdf->Rect(10, 177, 112, 13.25, 'D');
            $pdf->Rect(10,190.28, 112, 9.73, 'D');

            

            $pdf->SetLineStyle(array('width' => 0.1, 'cap' => 'butt', 'join' => 'miter', 'dash' => 0, 'color' => array(125,125,125)));
            $pdf->Image(__DIR__.'/img/MT-PTY-Logo x 8.jpg',10,1.5,68,20);
            $pdf->SetFont('Helvetica','',14);
            $pdf->Cell(75,20,'',0,0,'C'); //You need to have logo inserted
            $pdf->SetFont('Helvetica','',8);
            $pdf->Cell(30,20,'ABN 54 157 699 815',0,0,'C',false,'',0,false,'','B');
            $pdf->SetFont('Helvetica','B',12);
            //$pdf->Cell(35,20,'  (08) 6185 3007',0,0,'L',false,'',0,false,'','B');
            $pdf->Cell(35,20,'  (08) 6185 3007',0,0,'L',false,'',0,false,'','B');
            $pdf->SetFont('Helvetica','B',10);
            $pdf->Cell(41,9,'',0,0,'L',false,'',0,false,'','B');
            $pdf->Cell(22,9,'Contract No.',0,0,'L');
            $pdf->SetFont('Helvetica','',14);
            $pdf->SetTextColor(255,0,0);
            $pdf->Cell(28,9,$cnote,0,1,'C');
            $pdf->SetFont('Helvetica','B',10);
            $pdf->SetTextColor(0,0,0);
            $pdf->Cell(142,5,'',0,0);
            $pdf->Cell(91,5,'accounts@moorishtransport.com.au',0,1,'L',false,'',0,false,'','B');
            $pdf->Cell(142,6,'',0,0);
            $pdf->Cell(91,6,'enquiries@moorishtransport.com.au',0,1,'L',false,'',0,false,'','B');
            //spacer line
            $pdf->Cell(233,2,'',0,1,'',false,'',0,true);
            //Header Row Addresses
            $pdf->SetFont('Helvetica','B',8);
            $pdf->SetFillColor(255,80,0);
            $pdf->Cell(92,6,'SENDER',1,0,'L',true,'',0,false,'','C');
            $pdf->Cell(4,6,'',0,0,'L',false,'',0,true);//spacer line
            $pdf->Cell(92,6,'RECEIVER',1,1,'L',true,'',0,false,'','C');
            //CN Type
            if ($i == 0) {
                $pdf->SetXY(245,24);
                $pdf->SetFillColor(225,225,225);
                $pdf->Cell(40,176,'',1,0,'L',true,'',0,false,'','C');
    
                $pdf->SetFont('Helvetica','B',32);
                $pdf->SetTextColor(255,100,100);
                $pdf->SetXY(245,165);
                $pdf->StartTransform();
                $pdf->Rotate(90);
    
                $pdf->Cell(105,40,'OFFICE COPY',0,0,'C',false,'',0,false,'T','C');
                $pdf->StopTransform();   
            } else {
                $pdf->SetXY(245,24);
                $pdf->SetFillColor(255,165,165);
                $pdf->Cell(40,176,'',1,0,'L',true,'',0,false,'','C');

                $pdf->SetFont('Helvetica','B',32);
                $pdf->SetTextColor(255,255,255);
                $pdf->SetXY(245,165);
                $pdf->StartTransform();
                $pdf->Rotate(90);

                $pdf->Cell(105,40,'RECEIVERS COPY',0,0,'C',false,'',0,false,'T','C');
                $pdf->StopTransform();             
            }
            $pdf->SetXY(10,30);
            $pdf->SetTextColor(0,0,0);
            $pdf->SetFont('Helvetica','',6);
            $pdf->MultiCell(92,6,"Company\nName",1,'L',false,0);
            $pdf->Cell(4,6,'',0,0,'L',false,'',0,true);//spacer line
            $pdf->MultiCell(92,6,"Company\nName",1,'L',false,1);
            $pdf->Cell(92,6,'Address',1,0,'L',false,'',0,false,'','T');
            $pdf->Cell(4,6,'',0,0,'L',false,'',0,true);//spacer line
            $pdf->Cell(92,6,'Address',1,1,'L',false,'',0,false,'','T');
            $pdf->Cell(92,6,'',1,0,'L',false,'',0,false,'','T');
            $pdf->Cell(4,6,'',0,0,'L',false,'',0,true);//spacer line
            $pdf->Cell(92,6,'',1,1,'L',false,'',0,false,'','T');
            $pdf->Cell(69,6,'',1,0,'L',false,'',0,false,'','T');
            $pdf->Cell(10,6,'State',1,0,'C',false,'',0,false,'','T');
            $pdf->Cell(13,6,'Postcode',1,0,'C',false,'',0,false,'','T');
            $pdf->Cell(4,6,'',0,0,'L',false,'',0,true);//spacer line
            $pdf->Cell(69,6,'',1,0,'L',false,'',0,false,'','T');
            $pdf->Cell(10,6,'State',1,0,'C',false,'',0,false,'','T');
            $pdf->Cell(13,6,'Postcode',1,1,'C',false,'',0,false,'','T');
            $pdf->MultiCell(60,6,"Contact\nName",1,'L',false,0);
            $pdf->Cell(32,6,'Ph',1,0,'L',false,'',0,false,'','T');
            $pdf->Cell(4,6,'',0,0,'L',false,'',0,true);//spacer line
            $pdf->MultiCell(60,6,"Contact\nName",1,'L',false,0);
            $pdf->Cell(32,6,'Ph',1,1,'L',false,'',0,false,'','T');
            $pdf->Cell(188,3,'',0,1,'',false,'',0,true); //Spacer line

            //row 3
            $pdf->SetFont('Helvetica','',7);
            $pdf->SetFillColor(255,80,0);
            $pdf->MultiCell(79,6,"ALL drivers MUST answer these questions and sign below\nbefore entering the road network.",1,'L',true,0);
            $pdf->SetFont('Helvetica','B',7.5);
            $pdf->Cell(2,6,'',0,0,'L',false,'',0,true);//spacer line
            $pdf->Cell(30,6,'Who Pays For Freight',1,0,'L',true,'',0,false,'','C');

            $pdf->Cell(2,6,'',0,0,'L',false,'',0,true);//spacer line
            $pdf->SetFont('Helvetica','B',8);
            $pdf->Cell(75,6,'OTHER PARTY',1,1,'L',true,'',0,false,'','C');
            $pdf->SetFont('Helvetica','',6);
            $pdf->MultiCell(69,6,"You have checked to ensure all relevant permits,\napprovals etc are current and available (where applicable).",1,'L',false,0);
            $pdf->SetFont('Helvetica','B',7);
            $pdf->Cell(10,6,'Y/N',1,0,'C',false,'',0,false,'','C');
            $pdf->Cell(2,6,'',0,0,'L',false,'',0,true);//spacer line
            $pdf->SetFont('Helvetica','',7);
            //$pdf->Cell(30,6,'',1,0,'L',false,'',0,false,'','C');
            $pdf->SetTextColor(125,125,125);
            $pdf->Cell(10,6,'SEND',1,0,'C',false,'',0,false,'','C');
            $pdf->Cell(10,6,'REC',1,0,'C',false,'',0,false,'','C');
            $pdf->Cell(10,6,'OTH',1,0,'C',false,'',0,false,'','C');
            $pdf->SetTextColor(0,0,0);
            $pdf->Cell(2,6,'',0,0,'L',false,'',0,true);//spacer line
            $pdf->MultiCell(75,6,"Company\nName",1,'L',false,1);
            $pdf->SetFont('Helvetica','',6);
            $pdf->MultiCell(69,6,"You have checked the load to ensure the Dimension of the load\nis compliant prior to travelling on the road.",1,'L',false,0);
            $pdf->SetFont('Helvetica','B',7);
            $pdf->Cell(10,6,'Y/N',1,0,'C',false,'',0,false,'','C');
            $pdf->Cell(2,6,'',0,0,'L',false,'',0,true);//spacer line
            $pdf->SetFont('Helvetica','',6.75);
            $pdf->MultiCell(30,6,"Account\nNo.",1,'L',false,0);
            $pdf->Cell(2,6,'',0,0,'L',false,'',0,true);//spacer line
            $pdf->Cell(75,6,"Address",1,1,'L',false,'',0,false,'','T');
            $pdf->SetFont('Helvetica','',6);
            $pdf->MultiCell(69,6,"You have checked to ensure the load is restrained securely prior\nto the vehicle travelling on the road.",1,'L',false,0);
            $pdf->SetFont('Helvetica','B',7);
            $pdf->Cell(10,6,'Y/N',1,0,'C',false,'',0,false,'','C');
            $pdf->Cell(2,6,'',0,0,'L',false,'',0,true);//spacer line
            $pdf->SetFont('Helvetica','',6.75);
            $pdf->MultiCell(30,6,"Quote\nNo.",1,'L',false,0);

            $pdf->Cell(2,6,'',0,0,'L',false,'',0,true);//spacer line
            $pdf->SetFont('Helvetica','',6);
            $pdf->MultiCell(30,6,"Contact\nName",1,'L',false,0);
            $pdf->Cell(24,6,'Ph',1,0,'L',false,'',0,false,'','T');
            $pdf->Cell(10,6,'State',1,0,'C',false,'',0,false,'','T');
            $pdf->Cell(11,6,'Postcode',1,1,'C',false,'',0,false,'','T');
            $pdf->MultiCell(69,9,"You have checked to ensure the loading does not affect the centre of gravity for the vehicle. (The Main Roads Static Rollover Threshold (SRT) Calculator may be utilised).",1,'L',false,0);
            $pdf->SetFont('Helvetica','B',7);
            $pdf->Cell(10,9,'Y/N',1,0,'C',false,'',0,false,'','C');
            $pdf->Cell(2,9,'',0,1,'L',false,'',0,true);//spacer line
            $pdf->SetFont('Helvetica','',6);
            $pdf->Cell(69,6,'You are verifying you are suitably trained in load restraint methods.',1,0,'L',false,'',0,false,'','C');
            //$pdf->MultiCell(69,6,"You are verifying you are suitably trained in load restraint methods.",1,'L',false,0,'','',true,0,false,true,0,'C');
            $pdf->SetFont('Helvetica','B',7);
            $pdf->Cell(10,6,'Y/N',1,0,'C',false,'',0,false,'','C');
            $pdf->Cell(2,6,'',0,1,'L',false,'',0,true);//spacer line
            $pdf->SetFont('Helvetica','',6);
            $pdf->MultiCell(69,6,"You have checked the proposal route is approved for the particular vehicle combination to travelling on the road.",1,'L',false,0);
            $pdf->SetFont('Helvetica','B',7);
            $pdf->Cell(10,6,'Y/N',1,0,'C',false,'',0,false,'','C');
            $pdf->Cell(2,6,'',0,1,'L',false,'',0,true);//spacer line
            $pdf->SetFont('Helvetica','',6);
            /*$pdf->MultiCell(69,6,"Do you have a route planned this is safe and legal for your\nCombination",1,'L',false,0);
            $pdf->SetFont('Helvetica','B',7);
            $pdf->Cell(10,6,'Y/N',1,0,'C',false,'',0,false,'','C');
            $pdf->Cell(2,6,'',0,1,'L',false,'',0,true);//spacer line*/
            $pdf->SetFont('Helvetica','',6);
            $pdf->Cell(79,13,'Drivers Signature:',1,1,'L',false,'',0,false,'','T');
            $pdf->Cell(233,2,"",0,1,'',false,'',0,true);

            //table - header
            $pdf->SetFont('Helvetica','B',5.5);
            $pdf->MultiCell(30,7,"SENDER'S REF No.\n ",1,'C',true,0,'','',true,3,false,true,7,'M',true);
            $pdf->MultiCell(13,7,"No. OF\nITEMS",1,'C',true,0,'','',true,3,false,true,7,'M',true);
            $pdf->MultiCell(64,7,"PROPER SHIPPING NAME\n ",1,'C',true,0,'','',true,3,false,true,7,'M',true);
            $pdf->MultiCell(17,7,"WEIGHT\n(KG)",1,'C',true,0,'','',true,0,false,true,0,'M',true);
            $pdf->MultiCell(48,7,"CUBIC SIZE\n ",1,'C',true,0,'','',true,0,false,true,0,'M',true);
            $pdf->SetFillColor(200,5,0);
            $pdf->MultiCell(12,7,"UN No.\n ",1,'C',true,0,'','',true,3,false,true,7,'M',true);
            $pdf->MultiCell(12,7,"CLASS\n ",1,'C',true,0,'','',true,3,false,true,7,'M',true);
            $pdf->MultiCell(12,7,"SUB\nRISK",1,'C',true,0,'','',true,3,false,true,7,'M',true);
            $pdf->MultiCell(12,7,"PACKING\nGROUP",1,'C',true,0,'','',true,3,false,true,7,'M',true);
            $pdf->MultiCell(13,7,"PACKAGER\nDESC.",1,'C',true,1,'','',true,3,false,true,7,'M',true);
            //table rows - default
            $pdf->Cell(30,7,'',1,0);
            $pdf->Cell(13,7,'',1,0);
            $pdf->Cell(64,7,'',1,0);
            $pdf->Cell(17,7,'',1,0);
            $pdf->Cell(48,7,'X                   X                   X',1,0,'C',false,'',0,false,'T','C');
            $pdf->Cell(12,7,'',1,0);
            $pdf->Cell(12,7,'',1,0);
            $pdf->Cell(12,7,'',1,0);
            $pdf->Cell(12,7,'',1,0);
            $pdf->Cell(13,7,'',1,1);
            //row-2
            $pdf->Cell(30,7,'',1,0);
            $pdf->Cell(13,7,'',1,0);
            $pdf->Cell(64,7,'',1,0);
            $pdf->Cell(17,7,'',1,0);
            $pdf->Cell(48,7,'X                   X                   X',1,0,'C',false,'',0,false,'T','C');
            $pdf->Cell(12,7,'',1,0);
            $pdf->Cell(12,7,'',1,0);
            $pdf->Cell(12,7,'',1,0);
            $pdf->Cell(12,7,'',1,0);
            $pdf->Cell(13,7,'',1,1);
            //row-3
            $pdf->Cell(30,7,'',1,0);
            $pdf->Cell(13,7,'',1,0);
            $pdf->Cell(64,7,'',1,0);
            $pdf->Cell(17,7,'',1,0);
            $pdf->Cell(48,7,'X                   X                   X',1,0,'C',false,'',0,false,'T','C');
            $pdf->Cell(12,7,'',1,0);
            $pdf->Cell(12,7,'',1,0);
            $pdf->Cell(12,7,'',1,0);
            $pdf->Cell(12,7,'',1,0);
            $pdf->Cell(13,7,'',1,1);
            //row-4
            $pdf->Cell(30,7,'',1,0);
            $pdf->Cell(13,7,'',1,0);
            $pdf->Cell(64,7,'',1,0);
            $pdf->Cell(17,7,'',1,0);
            $pdf->Cell(48,7,'X                   X                   X',1,0,'C',false,'',0,false,'T','C');
            $pdf->Cell(12,7,'',1,0);
            $pdf->Cell(12,7,'',1,0);
            $pdf->Cell(12,7,'',1,0);
            $pdf->Cell(12,7,'',1,0);
            $pdf->Cell(13,7,'',1,1);
            //row-5
            $pdf->Cell(30,7,'',1,0);
            $pdf->Cell(13,7,'',1,0);
            $pdf->Cell(64,7,'',1,0);
            $pdf->Cell(17,7,'',1,0);
            $pdf->Cell(48,7,'X                   X                   X',1,0,'C',false,'',0,false,'T','C');
            $pdf->Cell(12,7,'',1,0);
            $pdf->Cell(12,7,'',1,0);
            $pdf->Cell(12,7,'',1,0);
            $pdf->Cell(12,7,'',1,0);
            $pdf->Cell(13,7,'',1,1);
            //Totals Row
            $pdf->SetFont('Helvetica','B',8);
            $pdf->SetFillColor(255,80,0);
            $pdf->Cell(30,7,'TOTALS',1,0,'R',true);
            $pdf->SetFillColor(255,200,150);
            $pdf->Cell(13,7,'',1,0,'C',true);
            $pdf->SetFillColor(255,80,0);
            $pdf->Cell(64,7,'',1,0,'',true);
            $pdf->SetFillColor(255,200,150);
            $pdf->Cell(17,7,'',1,0,'',true);
            $pdf->Cell(48,7,'m3',1,0,'R',true,'',0,false,'T','C');
            $pdf->SetFillColor(200,5,0);
            $pdf->Cell(12,7,'',1,0,'',true);
            $pdf->Cell(12,7,'',1,0,'',true);
            $pdf->Cell(12,7,'',1,0,'',true);
            $pdf->Cell(12,7,'',1,0,'',true);
            $pdf->Cell(13,7,'',1,1,'',true);
            $pdf->Cell(233,1,"",0,1,'',false,'',0,true);
            //Signatures
            $pdf->SetFont('Helvetica','B',8);
            $pdf->SetFillColor(255,80,0);
            $pdf->Cell(112,4,"SENDER'S SIGNATURE AND DECLARATION",1,0,'',true,'',0,true);
            $pdf->Cell(121,4,"RECEIVER'S SIGNATURE",1,1,'',true,'',0,true);
            $pdf->SetFont('Helvetica','B',6);
            $pdf->MultiCell(112,13,"I AGREE TO THE CONDITIONS ON THE TERMS AND CONDITIONS PAGE OF THIS CONTRACT,\nREQUEST MOORISH TO DELIVER THE GOODS AND DECLARE:\nTHESE GOODS DO NOT CONTAINER ANY UNAUTHORISED EXPLOSIVES OR INCENDIARY DEVICES; ANY\nDANGEROUS GOODS ARE PROPERLY CLASSIFIED, DESCRIBED, PACKAGED, MARKED AND LABELLED CORRECTLY;\nAND I AM AWARE THESE GOODS WILL BE SUBJECT TO SECURITY SCREENING AND CLEARING.",1,'L',false,0,'','',true,3,false,true,7,'M',true);
            $pdf->Cell(51,8,"RECEIVED IN GOOD CONDITION",1,0,'',false,'',0,true,'T','T');
            $pdf->SetFont('Helvetica','',6);
            $pdf->Cell(70,14.75,"    Print Name",1,2,'',false,'',0,true,'T','T');
            $pdf->Cell(70,4,"    Date          /            /",1,2,'',false,'',0,true,'T','C');
            $pdf->Cell(70,4,"    Time",1,1,'',false,'',0,true,'T','C');
            $pdf->Cell(233,3,"Please print minimum 2 copies, one for reciever, one for POD.",0,1,'',false,'',0,true,'T','B');
            //floating Sig sections
            $pdf->SetXY(10,190.25);
            $pdf->Cell(39,9.75,"   Signature",1,0,'',false,'',0,true,'T','T');
            $pdf->MultiCell(73,5.75,"Print\nName",1,'L',false,1);
            //$pdf->Cell(73,6," Print Name",1,2,'',false,'',0,true,'T','T');
            $pdf->Cell(39,1,"",0,0,'',false,'',0,true,'T','T');
            $pdf->Cell(73,4," Date          /            /",1,2,'',false,'',0,true,'T','C');
            $pdf->SetXY(122,185.25);
            $pdf->Cell(51,14.75," Signature",1,0,'',false,'',0,true,'T','T');
            //$pdf->SetFont('zapfdingbats','',10);// 3 for tick || 39
            //$pdf->Cell(188,6,"",1,1,'',false,'',0,true);
            //$pdf->Cell(188,0.2,"",1,1,'',false,'',0,true);//double thick border

            //delivery title
            $pdf->SetFont('Helvetica','B',8);
            $pdf->SetXY(202,87);
            $pdf->SetFillColor(255,80,0);
            $pdf->StartTransform();
            $pdf->Rotate(90);
            $pdf->Cell(63,6,'DELIVERY POINT  PICK UP POINT',1,1,'C',true,'',0,false,'T','C');
            $pdf->StopTransform();
            //Delivery fields
            $pdf->SetFont('Helvetica','',6);
            $pdf->SetXY(208,24);
            $pdf->Cell(35,10.5,'Depart Depot',1,2,'L',False,'',0,false,'T','T');
            $pdf->Cell(35,10.5,'Arrival Time',1,2,'L',False,'',0,false,'T','T');
            $pdf->Cell(35,10.5,'Departure Time',1,2,'L',False,'',0,false,'T','T');
            $pdf->Cell(35,10.5,'Arrival Time',1,2,'L',False,'',0,false,'T','T');
            $pdf->Cell(35,10.5,'Departure Time',1,2,'L',False,'',0,false,'T','T');
            $pdf->Cell(35,10.5,'Return Depot',1,1,'L',False,'',0,false,'T','T');
            
            //OSC
            $pdf->SetXY(91,89);
            $pdf->SetFont('Helvetica','B',8);
            $pdf->SetFillColor(255,80,0);
            $pdf->Cell(152,6.4,'ONFORWARDING / SPECIAL INSTRUCTIONS / COMMENTS (DELAY)',1,2,'L',true,'',0,false,'','C');
            $pdf->Cell(152,6.4,'',1,2,'L',false,'',0,false,'','C');
            $pdf->Cell(152,6.4,'',1,2,'L',false,'',0,false,'','C');
            $pdf->Cell(152,6.4,'',1,2,'L',false,'',0,false,'','C');
            $pdf->Cell(92,6.4,'',1,0,'L',false,'',0,false,'','C');
            $pdf->SetFont('Helvetica','B',10);
            $pdf->Cell(32,9,'Contract No.',0,0,'L',false,'',0,false,'','C');
            $pdf->SetFont('Helvetica','',14);
            $pdf->SetTextColor(255,0,0);
            $pdf->Cell(28,9,$cnote,0,1,'C');
            $pdf->SetTextColor(0,0,0);
    /*
            //billing tick and boxes
            $pdf->SetFont('zapfdingbats','',12);
            $pdf->SetXY(81.5,69);
            $pdf->SetFont('Helvetica','',6);
            $pdf->Rect(93,70.5,3,3);
            $pdf->Rect(103.5,70.5,3,3);
            $pdf->Rect(114,70.5,3,3);
            $pdf->Cell(9.5,6,"",0,0,'C',false,'',0,false,'','C');
            $pdf->Cell(7,6,"S",0,0,'C',false,'',0,false,'','C');
            $pdf->Cell(6.75,6,"",0,0,'C',false,'',0,false,'','C');
            $pdf->Cell(1,6,"R",0,0,'C',false,'',0,false,'','C');
            $pdf->Cell(6.75,6,"",0,0,'C',false,'',0,false,'','C');
            $pdf->Cell(6,6,"O",0,0,'C',false,'',0,false,'','C');
    */

            //table header subtext
            $pdf->SetFont('Helvetica','B',5);
            $pdf->SetXY(53,127);
            $pdf->Cell(64,7,"FREIGHT DESCRIPTION",0,0,'C',false,'',0,false,'','T');
            $pdf->MultiCell(17,7,"",0,'C',false,0);
            $pdf->Cell(48,7,"LENGTH CM X WIDTH CM X HEIGHT CM X QUANTITY",0,0,'C',false,'',0,false,'','T');

            //bolded lines
            $pdf->SetLineStyle(array('width' => 0.5, 'cap' => 'butt', 'join' => 'miter', 'dash' => 0, 'color' => array(0,0,0)));
            $pdf->SetXY(208.25,55);
            $pdf->Cell(34.5,0.2,"",1,1,'',false,'',0,true);
            $pdf->SetXY(182,123.25);
            $pdf->Cell(0.2,48.5,"",1,1,'',false,'',0,true);

            //Data into Cells
            //Sender
            $pdf->SetXY(20,30);
            $pdf->SetFont('Helvetica','',12);
            $pdf->Cell(82,6,safeStrReplace("&nbsp"," ",$row['snam']),0,2,''); //Company Name
            $pdf->Cell(82,6,safeStrReplace("&nbsp;"," ",$row['sadd1']),0,2,''); //Add1
            $pdf->SetXY(10,42);
            $pdf->Cell(92,6,safeStrReplace("&nbsp;"," ",$row['sadd2']),0,2,''); //Add2
            $pdf->Cell(69,6,safeStrReplace("&nbsp;"," ",$row['sadd3']),0,0,''); //Add3
            $pdf->Cell(10,6,safeStrReplace("&nbsp;"," ",$row['sst']),0,0,'C',false,'',0,false,'','B');
            $pdf->Cell(13,6,safeStrReplace("&nbsp;"," ",$row['spc']),0,1,'C',false,'',0,false,'','B');
            $pdf->Cell(9,6,'',0,0,'C',false,'',0,false,'','C');
            $pdf->Cell(51,6,safeStrReplace("&nbsp;"," ",$row['sCtc']),0,0,'L',false,'',0,false,'','C');
            $pdf->Cell(3,6,'',0,0,'L',false,'',0,false,'','C');
            $pdf->Cell(29,6,safeStrReplace("&nbsp;"," ",$row['sPh']),0,0,'C',false,'',0,false,'','C');
            //Receiver
            $pdf->SetXY(116,30);
            $pdf->SetFont('Helvetica','',12);
            $pdf->Cell(82,6,safeStrReplace("&nbsp;"," ",$row['rnam']),0,2,''); //Company Name
            $pdf->Cell(82,6,safeStrReplace("&nbsp;"," ",$row['radd1']),0,2,''); //Add1
            $pdf->SetXY(106,42);
            $pdf->Cell(92,6,safeStrReplace("&nbsp;"," ",$row['radd2']),0,2,''); //Add2
            $pdf->Cell(69,6,safeStrReplace("&nbsp;"," ",$row['radd3']),0,0,''); //Add3
            $pdf->Cell(10,6,safeStrReplace("&nbsp;"," ",$row['rst']),0,0,'C',false,'',0,false,'','B');
            $pdf->Cell(13,6,safeStrReplace("&nbsp;"," ",$row['rpc']),0,1,'C',false,'',0,false,'','B');
            $pdf->Cell(105,6,'',0,0,'C',false,'',0,false,'','C');
            $pdf->Cell(51,6,safeStrReplace("&nbsp;"," ",$row['rCtc']),0,0,'L',false,'',0,false,'','C');
            $pdf->Cell(3,6,'',0,0,'L',false,'',0,false,'','C');
            $pdf->Cell(29,6,safeStrReplace("&nbsp;"," ",$row['rPh']),0,0,'C',false,'',0,false,'','C');
            //Other Party
            $pdf->SetXY(101,69);
            $pdf->SetFont('Helvetica','',12);
            $pdf->Cell(97,6,safeStrReplace("&nbsp;"," ",$row['onam']),0,2,''); //Company Name
            $pdf->Cell(97,6,safeStrReplace("&nbsp;"," ",$row['oadd1']),0,2,''); //Add1
            $pdf->Cell(36,6,safeStrReplace("&nbsp;"," ",$row['oCtc']),0,0,'L',false,'',0,false,'','C');
            $pdf->Cell(3,6,'',0,0,'L',false,'',0,false,'','C');
            $pdf->Cell(35,6,safeStrReplace("&nbsp;"," ",$row['oPh']),0,0,'L',false,'',0,false,'','C');
            $pdf->Cell(10,6,safeStrReplace("&nbsp;"," ",$row['ost']),0,0,'C',false,'',0,false,'','B');
            $pdf->Cell(13,6,safeStrReplace("&nbsp;"," ",$row['opc']),0,1,'C',false,'',0,false,'','B');
            //biller tick
            $pdf->SetFont('zapfdingbats','',12);
            if ($row['pAcc']=='s') {
            $pdf->SetXY(35,68);
            $pdf->Cell(5,7,"3",0,0,'C',false,'',0,false,'','C');
            } else if ($row['pAcc']=='r') {
            $pdf->SetXY(50,68);
            $pdf->Cell(5,7,"3",0,0,'C',false,'',0,false,'','C');
            } else if ($row['pAcc']=='o') {
            $pdf->SetXY(65,68);
            $pdf->Cell(5,7,"3",0,0,'C',false,'',0,false,'','C');
            }
            $pdf->SetFont('Helvetica','',14);
            $pdf->SetXY(25,75);
            $pdf->Cell(24,6,safeStrReplace("&nbsp;"," ",$row['pAcc']),0,0,'L',false,'',0,false,'','C');
            $pdf->Cell(13,6,'',0,0,'L',false,'',0,false,'','C');
            $pdf->Cell(26,6,safeStrReplace("&nbsp;"," ",$row['pQuo']),0,0,'L',false,'',0,false,'','C');

            //OSC
            $pdf->SetFont('Helvetica','',14);
            $pdf->MultiCell(152,19.2,safeStrReplace("<br>",'\n',safeStrReplace("&nbsp;"," ",$row['osc'])),0,'L',false,0,91,95.4,true,0,false,true,0,'C');

            $ccnid = $row['cnID'];
            $sql = "SELECT * FROM `conDets` WHERE cnID = $ccnid and frtDie is Null order by class desc LIMIT 5;";

            $rsltDt = mysqli_query($conn,$sql);
            if (mysqli_num_rows($rsltDt) > 0){
                //set up vars
                $lnnum = 0;//row number
                $titm = 0;//item total
                $twgt = 0;//weight total
                $tcub = 0;//cubic total
                $hei = 130;
                while ($frln = mysqli_fetch_assoc($rsltDt)) {
                    $lnnum ++;//row number
                    if ($lnnum > 5) {goto bout;}
            //Freight Table
                    $pdf->SetFont('Helvetica','',11);
                    $pdf->SetXY(10,$hei);
                    $pdf->Cell(30,7,safeStrReplace("&nbsp;"," ",$frln['senRef']),0,0,'C',false,'',0,false,'T','C');
                    $pdf->Cell(13,7,safeStrReplace("&nbsp;"," ",$frln['noItem']),0,0,'C',false,'',0,false,'T','C');
                    $pdf->Cell(64,7,safeStrReplace("&nbsp;"," ",$frln['psn']),0,0,'C',false,'',0,false,'T','C');
                    $pdf->Cell(17,7,safeStrReplace("&nbsp;"," ",$frln['itWgt']),0,0,'C',false,'',0,false,'T','C');
                    $pdf->Cell(12,7,safeStrReplace("&nbsp;"," ",$frln['itLen']),0,0,'C',false,'',0,false,'T','C');
                    $pdf->Cell(12,7,safeStrReplace("&nbsp;"," ",$frln['itWid']),0,0,'C',false,'',0,false,'T','C');
                    $pdf->Cell(12,7,safeStrReplace("&nbsp;"," ",$frln['itHei']),0,0,'C',false,'',0,false,'T','C');
                    $pdf->Cell(12,7,safeStrReplace("&nbsp;"," ",$frln['itQty']),0,0,'C',false,'',0,false,'T','C');
                    $pdf->Cell(12,7,safeStrReplace("&nbsp;"," ",$frln['unNum']),0,0,'C',false,'',0,false,'T','C');
                    $pdf->Cell(12,7,safeStrReplace("&nbsp;"," ",$frln['class']),0,0,'C',false,'',0,false,'T','C');
                    $pdf->Cell(12,7,safeStrReplace("&nbsp;"," ",$frln['sRisk']),0,0,'C',false,'',0,false,'T','C');
                    $pdf->Cell(12,7,safeStrReplace("&nbsp;"," ",$frln['pkGr']),0,0,'C',false,'',0,false,'T','C');
                    $pdf->Cell(13,7,safeStrReplace("&nbsp;"," ",$frln['pkDes']),0,1,'C',false,'',0,false,'T','C');
                    //update vars
                    $titm = $titm + $frln['noItem'];//item total
                    $twgt = $twgt + $frln['itWgt']*$frln['itQty'];//weight total
                    $tcub = $tcub + (($frln['itLen']*$frln['itWid']*$frln['itHei'])/1000000)*$frln['itQty'];//cubic total
                    $hei = $hei + 7;        

                }
            bout:
            //Freight Table Totals
            $pdf->SetXY(10,165);
            $pdf->Cell(30,7,'',0,0,'C',false,'',0,false,'T','C');
            $pdf->Cell(13,7,$titm,0,0,'C',false,'',0,false,'T','C');
            $pdf->Cell(64,7,'',0,0,'C',false,'',0,false,'T','C');
            $pdf->Cell(17,7,$twgt,0,0,'C',false,'',0,false,'T','C');
            $pdf->Cell(42,7,round($tcub,3),0,0,'R',false,'',0,false,'T','C');
            }
        //CN type indicator

        }
}
    //add terms page
    $pdf->AddPage();
    $pdf->SetFont('Helvetica','B',15);
$tac = "TERMS AND CONDITIONS
1. Definitions
“charges” means our quoted charges for services calculated under our rates schedule or other agreed rates, any taxes, duties and government charges levied on the services and
any other amounts under condition 6.3.
“consumer” means an individual who acquires our services wholly or predominately for personal, domestic or household use or consumption.
“contract” means the transport or services contract between you and us including these conditions.
“credit note” means a document entitled “Credit Note” we give you or a person you nominate in writing.
“dangerous goods” means any articles or substances which are, or may become, a risk to health, safety, property or the environment and include, without limitation, articles or
substances so classified, specified or listed in laws or the International Air Transport Association dangerous goods regulations.
“force majeure event” means anything outside our reasonable control, including without limitation, fire, storm, flood, earthquake, lightning, explosion, accident, road or rail
closures, rail derailment, wharf delays, was, terrorism, sabotage, epidemic, quarantine restriction, labour dispute or shortage, act or omission of air traffic control, airline pilot or
any third person or public authority.
“goods” means the goods picked up or received from you or on your behalf.
“laws” means all applicable laws, regulations, guidelines, codes, standards or policies of the Commonwealth of Australia, any state, territory or local authority.
“PPSA” means the Personal Property Securities Act 2009 (Cth).
“services” means the operations we undertake for the goods including our IT systems, processes and software.
“sign” or “signature” includes provision in electronic form.
“subcontractor” means any person we arrange to provide services for the goods and any person who is an employee, agent or subcontractor of that person.
“us”, “we”, “our” means Moorish Transport Pty Ltd ABN 54 157 699 815 and its related bodies corporate within the meaning of that expression in section 9 of the Corporations
Act 2001 (Cth) carrying on business in their own names and any business names and their officers, employees, agents and subcontractors.
“writing” means any representation of words, figures or symbols capable of being rendered in visible form.
“you”, “your” means the person contracting with us.
2. Consumer contract
If you are a consumer:
(a) these conditions do not affect any rights you have under Schedule 2 of the competition and Consumer Act 2010 (Cth);
(b) conditions 6.4 (change in rates), 5.3 (contracting out of certain provisions in the PPSA) and condition 8 (Limitations and exclusion of liability) except for conditions 7.4* and
7.5*, do not apply to the contract unless and only to the extent:
(1) the contract is for the carriage of goods by ship, or
(2) services are supplied outside Australia; and
(c) the laws in force in the place in which the contract is made apply to the contract.
* Condition 7.4 is a list of goods for which we provide services at your risk and won’t pay for any loss or damage.
* Condition 7.5 is a list of causes and loss or damage for which we won’t pay.
3. What you need to know about us and our services
3.1 We are not common carriers, do not accept any liability as common carriers and may refuse to provide services to any person or goods for any reason.
3.2 We rely on the details supplied to us but we do not admit their accuracy or completeness and our signature is only an acknowledgement for the number of items picked up or
received by us.
3.3 Our services commence when we pick up or receive the goods and we earn our charges then.
3.4 We will not exchange any pallets and you must not transfer any pallet to our pallet accounts unless we agree in writing.
3.5 We will not collect any cash on delivery unless we agree in writing.
3.6 We will have delivered the goods if at the delivery address we obtain an acknowledgement of delivery or if delivery occurs under condition 3.7.
3.7 We may at your risk and expense leave the goods at delivery address if you so authorise us, store the goods or return them to the sender (each of which constitutes delivery) if:
(a) the delivery address you or your agent give us is unattended during normal business hours or the prearranged delivery period; or
(b) the receiver fails to take delivery of the goods.
3.8 We can:
(a) deviate from any usual route or method of transport to provide the services;
(b) subcontract the whole or any part of our services;
(c) do anything appropriate including disposing or destroying goods if we think the goods are described incorrectly or you haven’t given us an appropriate declaration about
them, or they may become dangerous goods;
(d) open and inspect the goods at any time without notice to you to determine their nature, condition, ownership or destination;
(e) carry, store, handle, remove, assemble, erect, pack, unpack, load, unload or consolidate the goods with others;
(f) lease, hire or enter into any agreement for, or use, any aircraft, ship, container, pallet or rail wagon to provide the services; and
(g) complete any documents required to comply with any laws.
3.9 If we store the goods:
(a) we can require you to remove them if you don’t pay the charges when due;
(b) we don’t have to make them available until all charges have been paid and you sign, or a person authorised in writing by you signs, a receipt for them; and
(c) we can return them to you at your last known address if you don’t remove them when we require or we give you notice to remove them.
3.10 We may sell or dispose of any uncollected or undelivered goods 30 days after making reasonable efforts to contact you and do not have to account to you for the sale or disposal
unless required by laws.
3.11 We:
(a) claim a general or particular lien over the goods for all charges under the contract and under any other contract between us and whether the subject of a demand or not;
(b) may under the lien sell the goods by public auction or private sale to recoup any overdue charges without any notice to you; and
(c) you agree that the lien arising under these service conditions is a security interest.
(d) the parties agree that the lien attaches to the Goods when the Goods are accepted by us for carriage.
(e) if we ask, you must promptly do anything for the purposes of ensuring that any security interest created under, or provided for by these Service Conditions are enforceable,
perfected (including but not limited to perfection by registration), maintained or otherwise effective. Anything that is required to be done by you under this clause will be
done at your own expense. You agree or reimburse our costs in relation to this clause.
3.12 If a temperature control section is completed on our or your documentation, then:
(a) we will try to provide the services at temperatures within accepted tolerance levels;
(b) you acknowledge temperature variations can occur; and
(c) any temperature record maintained by us will be conclusive of the temperatures during the services.
3.13 We contract as agent and trustee for our employees, agents and subcontractors so they also have the benefit of the contract and these conditions (including any exclusions or
limitations of liability we have) to the same extent as us as if they were parties to it.



4. Your promises
You promise us:
(a) You are either the owner of the authorised agent of the owner of the goods and have authority to enter into the contract;
(b) You or your agent have fully and accurately described the goods and their value; and
(c) You will comply with all laws and the goods can be safely handled and transported and are packed to withstand the ordinary risks of the services.
5. What you must do and not do
5.1 You must, or cause your agent to:
(a) provide us with all necessary documentation for the services and fully, accurately and legibly complete the label on the goods and the sender and receiver panel on the front
of the contract or any of our, or you, documentation;
(b) give us an appropriate declaration about any dangerous goods and notify us if the goods require special handling;
(c) if you are not the receiver, make the goods conform to the receiver’s requirements;
(d) if our services include storage or holding of goods:
(1) give us at least 7 days notice if you intend to collect them or have them collected or redelivered; and
(2) remove the goods within 7 days if we give you notice to remove them; and
(e) If requested by us, do all the things and execute all documents necessary or we require to give full effect to the contract and the transactions contemplated by it.
5.2 You Indemnify us against any cost or liability we incur, pay or have to pay in dealing with any claim against us for loss or damage to property or illness, injury or death, to the
extent caused:
(a) by the goods or your breach of contract or these conditions;
(b) because one of your promises is incorrect; or
(c) by a negligent or unlawful act or omission or wilful misconduct if you or the receiver or any person acting for you or the receiver, and there is no need for us to suffer loss or
damage before enforcing this right of indemnity.
5.3 You irrevocably waive any right you may have to receive notices under sections 121(4) (enforcement of liquid assets – notice to grantor), 130 (notice of disposal), 132(3)(d)
(contents of statement of account after disposal), 132(4) (statement of account f no disposal) and 135 (notice of retention) of the PPSA.
6. Our charges
6.1 You or the person you nominate must pay our charges within 7 days of the date of invoice unless otherwise advised by us.
6.2 You must pay the charges if the person nominated to pay the charges doesn’t do so.
6.3 You must also pay:
(a) an additional charge as reasonably determined by us if condition 3.7 applies, or of there is any delay outside our control in loading or unloading greater than 30 minutes;
(b) our cost to comply with any laws or requirements of any market , harbour, dock, railway, airline, shipping, excise, customs or warehouse authority not included in our
charges;
(c) any excise, customs duty or applicable taxes (including any fine or penalty);
(d) the cost, expense or loss to us of destruction or disposal under condition 3.8(c), of opening or inspecting under condition 3.8(d); redelivery, storage or return under
conditions 3.7 or 3.9; and of sale under conditions 3.10 or 3.11;
(e) the cost of labour or machinery or both to load, unload, maintain or protect the goods.
6.4 We may change our rates schedule or other agreed rates at any time with notice to you.
6.5 You can claim up to the dollar amount of a credit note, or we will provide our services at our GST inclusive charges up to the dollar amount of a credit note, within 12 months of its
date.
6.6 We do not have to repay you any amount you overpay us on an invoice unless you claim that amount within 12 months of the overpayment.
7. Limitations and exclusions on our liability to you
7.1 We so not exclude or limit the application of any laws, including Schedule 2 of the Competition and Consumer Act 2010 (Cth), where to do so would contravene those laws or
cause any part of these conditions to be void.
7.2 We exclude from these conditions all conditions, warranties, terms and consumer guarantees implied by laws, general law or custom except any, the exclusion of which, would
contravene any laws or cause this condition to be void (“Non-Excludable Condition”).
7.3 The goods are at your risk at all times and we exclude all liability to you or any other person for, and you indemnify us against any claim by any person about, any loss, damage,
misdelivery, delay, deterioration, contamination, our failure to deliver the goods or perform the services, and whether arising because of breach of contract, bailment, tort
including negligence, our wilful act or omission or breach of statutory duty.
7.4 We will not pay for any loss or damage to documents, goods in prepaid wallets, satchels or envelopes, appliances with electrical components, computers, jewellery, pictures or
picture frames, porcelain china, ceramic items, crystal, marble or enamel goods, goods the production, sale, import or export of which is prohibited by laws, dangerous goods,
glass (including bottles and their contents), windscreens, car panels, precious stones or metals, currency or negotiable instruments, produce, liquids, perishable goods, floor or
wall tiles, fragile goods, regulated waste, cigarettes or goods under bond.
7.5 We will not pay for any loss or damage to goods if it is caused by ordinary loss in weight or volume, shrinkage, ordinary leakage, ordinary wear and tear, insufficient and/or
unsuitable packing or preparation, delay, inherent vice, a force majeure event, electrical or mechanical derangement or you or your agent overload or incorrectly load the
transport vehicle.
7.6 Our liability to you for any breach of a Non-Excludable Condition is limited, at our option, to supplying the services again, or the cost of supplying the services again.
7.7 We will not pay any indirect, economic, special or consequential loss or damage including but not limited to loss of revenue, profit, production, business, anticipated savings or
claims by your customer, even if we know they are possible or otherwise foreseeable.
7.8 These conditions apply even in circumstances arising from a fundamental breach of contract or breach of a fundamental term.
7.9 These Service Conditions contain the entire understanding of the parties as to its subject matter. There is no other understanding, agreement, warranty or representation
whether express or implied in any way defining or extending or otherwise relating to these provisions or binding on you and us with respect to matters to which this contract
relates. We will not be bound by any agreement purporting to vary these terms unless such an agreement is in writing and signed on our behalf by an authorised officer of
Moorish Transport Pty Ltd.
8. Force majeure
If we cannot carry out an obligation under the contract either in whole or in part because of a force majeure event, then our obligations under the contract will be suspended for
the duration of the event or waived to the extent applicable.
9. Other matters which affect the contract
9.1 The laws of Western Australia apply to the contract and you must bring any proceedings against us in a court of Western Australia.
9.2 If a condition or a part of a condition is unenforceable, it must be severed from and does not affect the rest of the contract.
9.3 We are not bound by any waiver, discharge or release of a condition or any agreement which changes the contract unless it is in writing and signed by or for us.
9.4 Conditions 3, 5, 6, 7 and 8 are essential conditions of the contract.
9.5 A reference to any law includes any statutory modification, substitution or re-enactment of it.";
$pdf->SetFont('Helvetica','',5.8);
/*$pdf->cell(6,6,"1.",1,0,'L');
$pdf->SetFont('Helvetica','B',6.5);
$pdf->cell(112,6,"Definitions",1,0,'L');
$pdf->cell(6,6,"4.",1,0,'L');
$pdf->cell(112,6,"Your promises",1,1,'L');
//$pdf->MultiCell(135,150,$col1,0,'L',false,0,'','',true,0,true);*/

$col1 = '1.&nbsp; &nbsp; &nbsp; &nbsp; <b>Definitions</b><br>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <b>“charges”</b> means our quoted charges for services calculated under our rates schedule or other agreed rates, any taxes, duties and government charges levied on the services and
any other amounts under condition 6.3.<br>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <b>“consumer”</b> means an individual who acquires our services wholly or predominately for personal, domestic or household use or consumption.<br>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <b>“contract”</b> means the transport or services contract between you and us including these conditions.<br>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <b>“credit note”</b> means a document entitled “Credit Note” we give you or a person you nominate in writing.<br>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <b>“dangerous goods”</b> means any articles or substances which are, or may become, a risk to health, safety, property or the environment and include, without limitation, articles or
substances so classified, specified or listed in laws or the International Air Transport Association dangerous goods regulations.<br>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <b>“force majeure event”</b> means anything outside our reasonable control, including without limitation, fire, storm, flood, earthquake, lightning, explosion, accident, road or rail
closures, rail derailment, wharf delays, was, terrorism, sabotage, epidemic, quarantine restriction, labour dispute or shortage, act or omission of air traffic control, airline pilot or
any third person or public authority.<br>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <b>“goods”</b> means the goods picked up or received from you or on your behalf.<br>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <b>“laws”</b> means all applicable laws, regulations, guidelines, codes, standards or policies of the Commonwealth of Australia, any state, territory or local authority.<br>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <b>“PPSA”</b> means the Personal Property Securities Act 2009 (Cth).<br>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <b>“services”</b> means the operations we undertake for the goods including our IT systems, processes and software.<br>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <b>“sign” or “signature”</b> includes provision in electronic form.<br>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <b>“subcontractor”</b> means any person we arrange to provide services for the goods and any person who is an employee, agent or subcontractor of that person.<br>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <b>“us”, “we”, “our”</b> means Moorish Transport Pty Ltd ABN 54 157 699 815 and its related bodies corporate within the meaning of that expression in section 9 of the Corporations
Act 2001 (Cth) carrying on business in their own names and any business names and their officers, employees, agents and subcontractors.<br>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <b>“writing”</b> means any representation of words, figures or symbols capable of being rendered in visible form.<br>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <b>“you”, “your”</b> means the person contracting with us.<br>
<b>2.&nbsp; &nbsp; &nbsp; &nbsp;Consumer contract</b><br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
If you are a consumer:<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(a) &nbsp; &nbsp; these conditions do not affect any rights you have under Schedule 2 of the competition and Consumer Act 2010 (Cth);<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(b) &nbsp; &nbsp; conditions 6.4 (change in rates), 5.3 (contracting out of certain provisions in the PPSA) and condition 8 (Limitations and exclusion of liability) except for conditions 7.4* and
7.5*, do not apply to the contract unless and only to the extent:<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
&nbsp; &nbsp; &nbsp;  &nbsp; (1) &nbsp; &nbsp; the contract is for the carriage of goods by ship, or<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
&nbsp; &nbsp; &nbsp;  &nbsp; (2) &nbsp; &nbsp; services are supplied outside Australia; and<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(c) &nbsp; &nbsp; the laws in force in the place in which the contract is made apply to the contract.<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
* Condition 7.4 is a list of goods for which we provide services at your risk and won’t pay for any loss or damage.<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
* Condition 7.5 is a list of causes and loss or damage for which we won’t pay.<br>
<b>3.&nbsp; &nbsp; &nbsp; &nbsp;What you need to know about us and our services</b><br>
<b>3.1</b>&nbsp; &nbsp; &nbsp;We are not common carriers, do not accept any liability as common carriers and may refuse to provide services to any person or goods for any reason.<br>
<b>3.2</b>&nbsp; &nbsp; &nbsp;We rely on the details supplied to us but we do not admit their accuracy or completeness and our signature is only an acknowledgement for the number of items picked up or
received by us.<br>
<b>3.3</b>&nbsp; &nbsp; &nbsp;Our services commence when we pick up or receive the goods and we earn our charges then.<br>
<b>3.4</b>&nbsp; &nbsp; &nbsp;We will not exchange any pallets and you must not transfer any pallet to our pallet accounts unless we agree in writing.<br>
<b>3.5</b>&nbsp; &nbsp; &nbsp;We will not collect any cash on delivery unless we agree in writing.<br>
<b>3.6</b>&nbsp; &nbsp; &nbsp;We will have delivered the goods if at the delivery address we obtain an acknowledgement of delivery or if delivery occurs under condition 3.7.<br>
<b>3.7</b>&nbsp; &nbsp; &nbsp;We may at your risk and expense leave the goods at delivery address if you so authorise us, store the goods or return them to the sender (each of which constitutes delivery) if:<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(a) &nbsp; &nbsp; the delivery address you or your agent give us is unattended during normal business hours or the prearranged delivery period; or<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(b) &nbsp; &nbsp; the receiver fails to take delivery of the goods.<br>
<b>3.8&nbsp; &nbsp; &nbsp;We can:</b><br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(a) &nbsp; &nbsp; deviate from any usual route or method of transport to provide the services;<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(b) &nbsp; &nbsp; subcontract the whole or any part of our services;<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(c) &nbsp; &nbsp; do anything appropriate including disposing or destroying goods if we think the goods are described incorrectly or you haven’t given us an appropriate declaration about<br>
them, or they may become dangerous goods;<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(d) &nbsp; &nbsp; open and inspect the goods at any time without notice to you to determine their nature, condition, ownership or destination;<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(e) &nbsp; &nbsp; carry, store, handle, remove, assemble, erect, pack, unpack, load, unload or consolidate the goods with others;<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(f) &nbsp; &nbsp; lease, hire or enter into any agreement for, or use, any aircraft, ship, container, pallet or rail wagon to provide the services; and<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(g) &nbsp; &nbsp; complete any documents required to comply with any laws.<br>
<b>3.9&nbsp; &nbsp; &nbsp;If we store the goods:</b><br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(a) &nbsp; &nbsp; we can require you to remove them if you don’t pay the charges when due;<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(b) &nbsp; &nbsp; we don’t have to make them available until all charges have been paid and you sign, or a person authorised in writing by you signs, a receipt for them;<br>and<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(c) &nbsp; &nbsp; we can return them to you at your last known address if you don’t remove them when we require or we give you notice to remove them.<br>
<b>3.10</b>&nbsp; &nbsp;We may sell or dispose of any uncollected or undelivered goods 30 days after making reasonable efforts to contact you and do not have to account to you for the sale or disposal
unless required by laws.<br>
<b>3.11</b>&nbsp; &nbsp;We:<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(a) &nbsp; &nbsp; claim a general or particular lien over the goods for all charges under the contract and under any other contract between us and whether the subject of a demand or not;<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(b) &nbsp; &nbsp; may under the lien sell the goods by public auction or private sale to recoup any overdue charges without any notice to you; and<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(c) &nbsp; &nbsp; you agree that the lien arising under these service conditions is a security interest.<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(d) &nbsp; &nbsp; the parties agree that the lien attaches to the Goods when the Goods are accepted by us for carriage.<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(e) &nbsp; &nbsp; if we ask, you must promptly do anything for the purposes of ensuring that any security interest created under, or provided for by these Service Conditions are enforceable,
perfected (including but not limited to perfection by registration), maintained or otherwise effective. Anything that is required to be done by you under this clause will be
done at your own expense. You agree or reimburse our costs in relation to this clause.<br>
<b>3.12</b></b>&nbsp; &nbsp;If a temperature control section is completed on our or your documentation, then:<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(a) we will try to provide the services at temperatures within accepted tolerance levels;<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(b) you acknowledge temperature variations can occur; and<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(c) any temperature record maintained by us will be conclusive of the temperatures during the services.<br>
<b>3.13</b>&nbsp; &nbsp;We contract as agent and trustee for our employees, agents and subcontractors so they also have the benefit of the contract and these conditions (including any exclusions or
limitations of liability we have) to the same extent as us as if they were parties to it.';



$col2 = '<b>4.&nbsp; &nbsp; &nbsp; &nbsp;Your promises</b><br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
You promise us:<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(a) &nbsp; &nbsp; You are either the owner of the authorised agent of the owner of the goods and have authority to enter into the contract;<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(b) &nbsp; &nbsp; You or your agent have fully and accurately described the goods and their value; and<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(c) &nbsp; &nbsp; You will comply with all laws and the goods can be safely handled and transported and are packed to withstand the ordinary risks of the services.<br>
<b>5.&nbsp; &nbsp; &nbsp; &nbsp;What you must do and not do</b><br>
<b>5.1</b>&nbsp; &nbsp; &nbsp;You must, or cause your agent to:<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(a) &nbsp; &nbsp; provide us with all necessary documentation for the services and fully, accurately and legibly complete the label on the goods and the sender and receiver panel on the front
of the contract or any of our, or you, documentation;<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(b) &nbsp; &nbsp; give us an appropriate declaration about any dangerous goods and notify us if the goods require special handling;<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(c) &nbsp; &nbsp; if you are not the receiver, make the goods conform to the receiver’s requirements;<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(d) &nbsp; &nbsp; if our services include storage or holding of goods:<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (1) &nbsp; &nbsp; give us at least 7 days notice if you intend to collect them or have them collected or redelivered; and<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (2) &nbsp; &nbsp; remove the goods within 7 days if we give you notice to remove them; and<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(e) &nbsp; &nbsp; If requested by us, do all the things and execute all documents necessary or we require to give full effect to the contract and the transactions contemplated by it.<br>
<b>5.2</b>&nbsp; &nbsp; &nbsp;You Indemnify us against any cost or liability we incur, pay or have to pay in dealing with any claim against us for loss or damage to property or illness, injury or death, to the
extent caused:<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(a) &nbsp; &nbsp; by the goods or your breach of contract or these conditions;<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(b) &nbsp; &nbsp; because one of your promises is incorrect; or<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(c) &nbsp; &nbsp; by a negligent or unlawful act or omission or wilful misconduct if you or the receiver or any person acting for you or the receiver, and there is no need for us to suffer loss or
damage before enforcing this right of indemnity.<br>
<b>5.3</b>&nbsp; &nbsp; &nbsp;You irrevocably waive any right you may have to receive notices under sections 121(4) (enforcement of liquid assets – notice to grantor), 130 (notice of disposal), 132(3)(d)
(contents of statement of account after disposal), 132(4) (statement of account f no disposal) and 135 (notice of retention) of the PPSA.<br>
<b>6.&nbsp; &nbsp; &nbsp;Our charges</b><br>
<b>6.1</b>&nbsp; &nbsp;You or the person you nominate must pay our charges within 7 days of the date of invoice unless otherwise advised by us.<br>
<b>6.2</b>&nbsp; &nbsp;You must pay the charges if the person nominated to pay the charges doesn’t do so.<br>
<b>6.3</b>&nbsp; &nbsp;You must also pay:<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(a) &nbsp; &nbsp; an additional charge as reasonably determined by us if condition 3.7 applies, or of there is any delay outside our control in loading or unloading greater than 30 minutes;<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(b) &nbsp; &nbsp; our cost to comply with any laws or requirements of any market , harbour, dock, railway, airline, shipping, excise, customs or warehouse authority not included in our
charges;<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(c) &nbsp; &nbsp; any excise, customs duty or applicable taxes (including any fine or penalty);<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(d) &nbsp; &nbsp; the cost, expense or loss to us of destruction or disposal under condition 3.8(c), of opening or inspecting under condition 3.8(d); redelivery, storage or return under
conditions 3.7 or 3.9; and of sale under conditions 3.10 or 3.11;<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
(e) &nbsp; &nbsp; the cost of labour or machinery or both to load, unload, maintain or protect the goods.<br>
<b>6.4</b>&nbsp; &nbsp;We may change our rates schedule or other agreed rates at any time with notice to you.<br>
<b>6.5</b>&nbsp; &nbsp;You can claim up to the dollar amount of a credit note, or we will provide our services at our GST inclusive charges up to the dollar amount of a credit note, within 12 months of its
date.<br>
<b>6.6</b>&nbsp; &nbsp;We do not have to repay you any amount you overpay us on an invoice unless you claim that amount within 12 months of the overpayment.<br>
<b>7.&nbsp; &nbsp; &nbsp;Limitations and exclusions on our liability to you</b><br>
<b>7.1</b>&nbsp; &nbsp;We so not exclude or limit the application of any laws, including Schedule 2 of the Competition and Consumer Act 2010 (Cth), where to do so would contravene those laws or
cause any part of these conditions to be void.<br>
<b>7.2</b>&nbsp; &nbsp;We exclude from these conditions all conditions, warranties, terms and consumer guarantees implied by laws, general law or custom except any, the exclusion of which, would
contravene any laws or cause this condition to be void (“Non-Excludable Condition”).<br>
<b>7.3</b>&nbsp; &nbsp;The goods are at your risk at all times and we exclude all liability to you or any other person for, and you indemnify us against any claim by any person about, any loss, damage,
misdelivery, delay, deterioration, contamination, our failure to deliver the goods or perform the services, and whether arising because of breach of contract, bailment, tort
including negligence, our wilful act or omission or breach of statutory duty.<br>
<b>7.4</b>&nbsp; &nbsp;We will not pay for any loss or damage to documents, goods in prepaid wallets, satchels or envelopes, appliances with electrical components, computers, jewellery, pictures or
picture frames, porcelain china, ceramic items, crystal, marble or enamel goods, goods the production, sale, import or export of which is prohibited by laws, dangerous goods,
glass (including bottles and their contents), windscreens, car panels, precious stones or metals, currency or negotiable instruments, produce, liquids, perishable goods, floor or
wall tiles, fragile goods, regulated waste, cigarettes or goods under bond.<br>
<b>7.5</b>&nbsp; &nbsp;We will not pay for any loss or damage to goods if it is caused by ordinary loss in weight or volume, shrinkage, ordinary leakage, ordinary wear and tear, insufficient and/or
unsuitable packing or preparation, delay, inherent vice, a force majeure event, electrical or mechanical derangement or you or your agent overload or incorrectly load the
transport vehicle.<br>
<b>7.6</b>&nbsp; &nbsp;Our liability to you for any breach of a Non-Excludable Condition is limited, at our option, to supplying the services again, or the cost of supplying the services again.<br>
<b>7.7</b>&nbsp; &nbsp;We will not pay any indirect, economic, special or consequential loss or damage including but not limited to loss of revenue, profit, production, business, anticipated savings or
claims by your customer, even if we know they are possible or otherwise foreseeable.<br>
<b>7.8</b>&nbsp; &nbsp;These conditions apply even in circumstances arising from a fundamental breach of contract or breach of a fundamental term.<br>
<b>7.9</b>&nbsp; &nbsp;These Service Conditions contain the entire understanding of the parties as to its subject matter. There is no other understanding, agreement, warranty or representation
whether express or implied in any way defining or extending or otherwise relating to these provisions or binding on you and us with respect to matters to which this contract
relates. We will not be bound by any agreement purporting to vary these terms unless such an agreement is in writing and signed on our behalf by an authorised officer of
Moorish Transport Pty Ltd.<br>
<b>8.&nbsp; &nbsp; &nbsp;Force majeure</b><br>
If we cannot carry out an obligation under the contract either in whole or in part because of a force majeure event, then our obligations under the contract will be suspended for
the duration of the event or waived to the extent applicable.
<b>9.&nbsp; &nbsp; &nbsp;Other matters which affect the contract</b><br>
<b>9.1</b>&nbsp; &nbsp;The laws of Western Australia apply to the contract and you must bring any proceedings against us in a court of Western Australia.<br>
<b>9.2</b>&nbsp; &nbsp;If a condition or a part of a condition is unenforceable, it must be severed from and does not affect the rest of the contract.<br>
<b>9.3</b>&nbsp; &nbsp;We are not bound by any waiver, discharge or release of a condition or any agreement which changes the contract unless it is in writing and signed by or for us.<br>
<b>9.4</b>&nbsp; &nbsp;Conditions 3, 5, 6, 7 and 8 are essential conditions of the contract.<br>
<b>9.5</b>&nbsp; &nbsp;A reference to any law includes any statutory modification, substitution or re-enactment of it.';


    //$pdf->Cell(277,150,$tac,1,1,'C',false,'',0,true);
    //$pdf->Cell(280,10,'',1,1,'C',false,'',0,true);
    $pdf->MultiCell(145,150,$col1,0,'L',false,0,'','',true,0,true);
    $pdf->MultiCell(135,150,$col2,0,'L',false,0,'','',true,0,true);
    //output file
    $pdf->Output($fnam.'.pdf','I');
} else {exit();}
?>