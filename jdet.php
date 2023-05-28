<?php 
#page setup
    $pName = "jdet";
    include_once 'header.php';
    $pName = "";    
    if (!defined("FS_ROOT")) {
        define("FS_ROOT", realpath(dirname(__FILE__)));
    }
    include FS_ROOT.'/inc/dbh.inc.php';

?>


<div id="updcheck"></div>
<div id="dd" class="dropd hideme">
    <div id="ddbarh">
        <div class="ddbrtxt">Addresses Book Suggestions</div>
        <div class="load-3">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
        </div>
    </div>
    <div id="slist">

    </div>
</div>
<div id="boscr" class="hideme">
    <div id="cn-frame">
        <div id="cn_ind" class="cnblock">
            <div class="cntitle">
                <p>Con Notes details</p>
            </div>
            <div class="ind_r">
                <div class="ind_labs">Con-note ID# </div>
                <div class='ind_inp'><input class="cndd" id="cnID" type="text" placeholder="Connote ID" readonly></div>
            </div>
            <div class="ind_r">
                <div class="ind_labs">Con-note No.</div>
                <div class='ind_inp'><input class="cndd" id="cnNum" type="text" placeholder="Connote No."></div>
            </div>
            <div class="spacer"></div>
            <div class="cntitle">
                <p>Billable info</p>
            </div>
            <div id="paysels">
                <!--<div id="bill_p">Who will pay for freight?</div> -->
                <div id="bill_r">
                    <input type="radio" id="s" name="bill" value="s" class="radios cndd">
                    <label for="s" class="radios">Sender </label>
                    <input type="radio" id="r" name="bill" value="r" class="radios cndd">
                    <label for="r" class="radios">Receiver </label>
                    <input type="radio" id="o" name="bill" value="o" class="radios cndd">
                    <label for="o" class="radios">Other</label>
                </div>
            </div>
            <div class="ind_r">
                <div class="ind_labs">Account No.</div>
                <div class='ind_inp'><input class="cndd" id="pAcc" type="text" placeholder="Account No."></div>
            </div>
            <div class="ind_r">
                <div class="ind_labs">Quote No.</div>
                <div class='ind_inp'><input class="cndd" id="pQuo" type="text" placeholder="Quote No."></div>
            </div>
        </div>
        <div id="cn_Sender" class="cnblock addframe">
            <div class="cntitle">
                <p>SENDER</p>
            </div>
            <div class="cn_cname"><input class="cndd" id="snam" type="text" placeholder="Company Name"
                    autocomplete="false"></div>
            <div class="cn_add1"><input class="cndd" id="sadd1" type="text" placeholder="Address Line 1"></div>
            <div class="cn_add2"><input class="cndd" id="sadd2" type="text" placeholder="Address Line 2"></div>
            <div class="cn_add3"><input class="cndd" id="sadd3" type="text" placeholder="Address Line 3"></div>
            <div class="cn_stat"><input class="cndd" id="sst" type="text" placeholder="State"></div>
            <div class="cn_pc"><input class="cndd" id="spc" type="text" placeholder="pcode"></div>
            <div class="cn_cn"><input class="cndd" id="sCtc" type="text" placeholder="Contact Name"
                    autocomplete="false">
            </div>
            <div class="cn_scph"><input class="cndd" id="sPh" type="text" placeholder="Phone#"></div>

        </div>

        <div id="cn_Rec" class="addframe cnblock">
            <div class="cntitle">
                <p>RECEIVER</p>
            </div>
            <div class="cn_cname"><input class="cndd" id="rnam" type="text" placeholder="Company Name"
                    autocomplete="false"></div>
            <div class="cn_add1"><input class="cndd" id="radd1" type="text" placeholder="Address Line 1"></div>
            <div class="cn_add2"><input class="cndd" id="radd2" type="text" placeholder="Address Line 2"></div>
            <div class="cn_add3"><input class="cndd" id="radd3" type="text" placeholder="Address Line 3"></div>
            <div class="cn_stat"><input class="cndd" id="rst" type="text" placeholder="State"></div>
            <div class="cn_pc"><input class="cndd" id="rpc" type="text" placeholder="pcode"></div>
            <div class="cn_cn"><input class="cndd" id="rCtc" type="text" placeholder="Contact Name"
                    autocomplete="false">
            </div>
            <div class="cn_scph"><input class="cndd" id="rPh" type="text" placeholder="Phone#"></div>

        </div>

        <div id="cn_oth" class="addframe cnblock">
            <div class="cntitle">
                <p>OTHER PARTY</p>
            </div>
            <div class="cn_cname"><input class="cndd" id="onam" type="text" placeholder="Company Name"
                    autocomplete="false"></div>
            <div class="cn_add1"><input class="cndd" id="oadd1" type="text" placeholder="Address Line 1"></div>
            <div class="cn_add2"><input class="cndd" id="oadd2" type="text" placeholder="Address Line 2"></div>
            <div class="cn_add3"><input class="cndd" id="oadd3" type="text" placeholder="Address Line 3"></div>
            <div class="cn_stat"><input class="cndd" id="ost" type="text" placeholder="State"></div>
            <div class="cn_pc"><input class="cndd" id="opc" type="text" placeholder="pcode"></div>
            <div class="cn_cn"><input class="cndd" id="oCtc" type="text" placeholder="Contact Name"
                    autocomplete="false">
            </div>
            <div class="cn_scph"><input class="cndd" id="oPh" type="text" placeholder="Phone#"></div>

        </div>

        <div id="onspco" class="cnblock">
            <div class="cntitle">
                <p>Onforwarding / Special Instructions / Comments (Delay)</p>
            </div>
            <textarea class="cndd" name="osc" id="osc" cols="45" rows="4"></textarea>

        </div>

        <div id="cnadmin" class="cnblock">
            <div class="cntitle">
                <p>Con Note Actions</p>
            </div>
            <div class='bg_box'>

                <div id="scnprt" class="cnac">
                    <div class="cnal">
                        P
                    </div>
                    <div class="cnaw">
                        Pdf
                    </div>
                </div>
                <div id="cncopy" class="cnac">
                    <div class="cnal">
                        C
                    </div>
                    <div class="cnaw">
                        Copy
                    </div>
                </div>
                <div id="cnmove" class="cnac">
                    <div class="cnal">
                        M
                    </div>
                    <div class="cnaw">
                        Move
                    </div>
                </div>
                <div id="cndel" class="cnac">
                    <div class="cnal">
                        R
                    </div>
                    <div class="cnaw">
                        Remove
                    </div>
                </div>
            </div>

        </div>

        <div id="frtdet" class="cnblock">
            <div id="frt_ctnr">
                <table id="cnTbl" class="cnt_frt_tbl">
                    <thead id="cnt_head">
                        <tr id="frt_head">
                            <th class="senRef">Senders Ref No.</th>
                            <th class="noItem">No. Of Items</th>
                            <th class="psn">Freight Description</th>
                            <th class="itWgt">Weight (KG)</th>
                            <th class="itLen">Length (CM)</th>
                            <th class="itWid">Width (CM)</th>
                            <th class="itHei">Height (CM)</th>
                            <th class="itQty">QTY</th>
                            <th class="unNum">UN no</th>
                            <th class="class">Class</th>
                            <th class="sRisk">Sub Risk</th>
                            <th class="pkGr">Packing Group</th>
                            <th class="pkDes">Packing Desc</th>
                            <th class="cn_ctrls">Cmds</th>
                        </tr>
                    </thead>
                    <tbody id="cnt_body">

                    </tbody>
                </table>
                </table>
            </div>
            <table id="cn_tots" class="cnt_frt_tblout">
                <thead id="cnt_head">
                    <tr>
                        <th class="senRef"></th>
                        <th class="noItem"></th>
                        <th class="psn"></th>
                        <th class="itWgt"></th>
                        <th class="itLen"></th>
                        <th class="itWid"></th>
                        <th class="itHei"></th>
                        <th class="itQty"></th>
                        <th class="unNum"></th>
                        <th class="class"></th>
                        <th class="sRisk"></th>
                        <th class="pkGr"></th>
                        <th class="pkDes"></th>
                        <th class="cn_ctrls"></th>
                    </tr>
                </thead>
                <tbody id="cn_rows">
                    <tr data-id="no" id="sttr">
                        <td class="senRef sttr">TOTALS</td>
                        <td id="cn_titm" class="noItem sttrl"></td>
                        <td class="psn sttr"></td>
                        <td id="cn_twgt" class="itWgt sttrl" colspan="2"></td>
                        <td id="cn_m3" class="itLen sttrm" colspan="3">m3</td>
                        <td class="unNum sttrd"></td>
                        <td class="class sttrd"></td>
                        <td class="sRisk sttrd"></td>
                        <td class="pkGr sttrd"></td>
                        <td class="pkDes sttrd"></td>
                        <td class="cn_ctrls sttrs"></td>
                    </tr>
                </tbody>

                <table id="cnt_add" class="cnt_frt_tblout">
                    <tbody id="cn_add">
                        <tr data-id="new" id="ncn">
                            <td contenteditable="true" id="addsenRef" data-col="senRef" class="senRef"></td>
                            <td contenteditable="true" id="addnoItem" data-col="noItem" class="noItem"></td>
                            <td contenteditable="true" id="addpsn" data-col="psn" class="psn"></td>
                            <td contenteditable="true" id="additWgt" data-col="itWgt" class="itWgt"></td>
                            <td contenteditable="true" id="additLen" data-col="itLen" class="itLen"></td>
                            <td contenteditable="true" id="additWid" data-col="itWid" class="itWid"></td>
                            <td contenteditable="true" id="additHei" data-col="itHei" class="itHei"></td>
                            <td contenteditable="true" id="additQty" data-col="itQty" class="itQty"></td>
                            <td contenteditable="true" id="addunNum" data-col="unNum" class="unNum"></td>
                            <td contenteditable="true" id="addclass" data-col="class" class="class"></td>
                            <td contenteditable="true" id="addsRisk" data-col="sRisk" class="sRisk"></td>
                            <td contenteditable="true" id="addpkGr" data-col="pkGr" class="pkGr"></td>
                            <td contenteditable="true" id="addpkDes" data-col="pkDes" class="pkDes"></td>
                            <td class="cn_ctrls" data-col="cmd">
                                <div class="cmd_img"><img id="ncl" class="nbut" alt="New CN Detail"
                                        src="/img/addnew.png">
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
        </div>
        <div id="cnspacer" class="cnblock"></div>
    </div>
</div>
<div id="refs" class="hideme">
    <div id="jbnum" class="hideme">

    </div>
    <div id="coll"></div>
</div>
<div id="jd-notes">
    <div class="title">
        <p> Job Description </p>
    </div>
    <div class="cont cnotes">
        <div id="noteTbl">
            <div class="thead" id="nothead">
                <div class="tr">
                    <div id="nhead" class="ncol th"></div>
                    <div id="ahead" class="namt th">Amount</div>
                    <div id="thead" class="ntra th">Add/Del</div>
                </div>
            </div>
            <div id="noteadd">

                <div id="add">
                    <div data-id="new" id="nnote">
                        <div contenteditable="true" data-col="jnot" class="ncol addtd" id="nnt"></div>
                        <div contenteditable="true" data-col="jamt" class="namt addtd" id="nna"></div>
                        <div id="nnb" class="ntra addtd">
                            <div class="cmd_img"><img id="newn" class="nbut" alt="New Note" src="/img/addnew.png">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tbody" id="notebody">

            </div>
        </div>

    </div>
</div>
<!--<section class="section" id="jdet-head">-->
<div id="jdet-prim">
    <div class="title">
    <span id="jobnum">New Job</span>
    </div>

    <div id="pri_dets" class="cont">
        <div class="div_client pdd">
            <div class="group">
                <input id="client" class="inputMaterial" name="clientName" type="text" required />
                <span id="client_span" class="highlight"></span>
                <span class="bar"></span>
                <label class="pri_lab"> Client </label>
            </div>
        </div>
        <div class="div_jobRef pdd">
            <div class="group">
                <input id="jobRef" class="inputMaterial  j_det_info" name="jobRef" type="text" required />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label class="pri_lab">Refernce/PO#</label>
            </div>
        </div>
        <div class="div_cliContact pdd">
            <div class="group">
                <input id="cliContact" class="inputMaterial  j_det_info" name="contd" type="text" required />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label class="pri_lab"> Contact </label>
            </div>
        </div>
        <div class="div_cliContPh pdd">
            <div class="group">
                <input id="cliContPh" class="inputMaterial  j_det_info" name="contPh" type="text" required />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label class="pri_lab"> Contact Phone </label>
            </div>
        </div>
        <div class="div_cliContEm pdd">
            <div class="group">
                <input id="cliContEm" class="inputMaterial  j_det_info" name="contEm" type="text" required />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label class="pri_lab"> Contact Email </label>
            </div>
        </div>
        <div class="div_cliContEm2 pdd">
            <div class="group">
                <input id="cliContEm2" class="inputMaterial  j_det_info" name="contEm2" type="text" required />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label class="pri_lab"> 2nd Contact Email </label>
            </div>
        </div>
        <div class="div_puDate pdd">
            <div class="group">
                <input id="puDate" class="inputMaterial  j_det_info" name="jobDate" type="date" required />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label class="pri_lab">Pick Up Date</label>
            </div>
        </div>
        <div class="div_doDate pdd">
            <div class="group">
                <input id="doDate" class="inputMaterial  j_det_info" name="jobFin" type="date" required />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label class="pri_lab">Drop Off Date</label>
            </div>
        </div>
        <div id="j_c_cont">
            <div class="j_chk">
                <label for="ac_cb" id="ac_lab">
                    <input type="checkbox" class="chkbx" name="act_comp" data-par="jobComp" id="ac_cb">
                    <span id="ac_sp"><i id="ac_i"></i></span>
                </label>
            </div>
            <div class="j_chk">
                <label for="inv_c" id="ic_lab">
                    <input type="checkbox" class="chkbx" name="inv_comp" data-par="jobInv" id="inv_c">
                    <span id="ic_sp"><i id="ic_i"></i></span>
                </label>
            </div>
        </div>
        <div class="div_invNum pdd">
            <div class="group">
                <input id="InvNum" class="inputMaterial  j_det_info" name="invNum" type="text" required />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label class="pri_lab"> Invoice Number </label>
            </div>
        </div>
    </div>
</div>
<div id="jd-adds">
    <div class="title"><p> Addresses </p></div>
    <div class="cont">
        <div id="job_signor" class="job_add_main">
            <div id="j_signor_head" class="job_add_title">Consignor</div>
            <div id="j_signor_body" class="j_add_body">
                <div class="jac ja_name">
                    <input id="cnam" class="jadd" name="cnam" type="text" placeholder=" Location Name" required />
                </div>
                <div class="jac ja_add1">
                    <input id="cadd1" class="jadd" name="cadd1" type="text" placeholder=" Address" required />
                </div>
                <div class="jac ja_add2">
                    <input id="cadd2" class="jadd" name="cadd2" type="text" required />
                </div>
                <div class="jac ja_add3">
                    <input id="cadd3" class="jadd" name="cadd3" type="text" required />
                </div>
                <div class="jac ja_st">
                    <input id="cst" class="jadd" name="cst" type="text" placeholder="State" required />
                </div>
                <div class="jac ja_pc">
                    <input id="cpc" class="jadd" name="cpc" type="text" placeholder=" P/C" required />
                </div>
                <div class="jac ja_ct">
                    <input id="cCtc" class="jadd" name="cCtc" type="text" placeholder=" Name" required />
                </div>
                <div class="jac ja_ph">
                    <input id="cPh" class="jadd" name="cPh" type="text" placeholder=" Phone" required />
                </div>
                <div class="jac ja_em">
                    <input id="cEm" class="jadd" name="cEm" type="text" placeholder=" Email" required />
                </div>
                <div class="jac ja_ct">
                    <input id="j_r_ct2" class="jadd" name="cCtc2" type="text" placeholder=" Name" required />
                </div>
                <div class="jac ja_ph">
                    <input id="j_r_ph2" class="jadd" name="cPh2" type="text" placeholder=" Phone" required />
                </div>
                <div class="jac ja_em">
                    <input id="j_r_em2" class="jadd" name="cEm2" type="text" placeholder=" Email" required />
                </div>
            </div>
        </div>
        <div id="job_signee" class="job_add_main">
            <div id="j_signee_head" class="job_add_title">Consignee</div>
            <div id="j_signee_body" class="j_add_body">
                <div class="jac ja_name">
                    <input id="dnam" class="jadd" name="dnam" type="text" placeholder=" Location Name" required />
                </div>
                <div class="jac ja_add1">
                    <input id="dadd1" class="jadd" name="dadd1" type="text" placeholder=" Address" required />
                </div>
                <div class="jac ja_add2">
                    <input id="dadd2" class="jadd" name="dadd2" type="text" required />
                </div>
                <div class="jac ja_add3">
                    <input id="dadd3" class="jadd" name="dadd3" type="text" required />
                </div>
                <div class="jac ja_st">
                    <input id="dst" class="jadd" name="dst" type="text" placeholder="State" required />
                </div>
                <div class="jac ja_pc">
                    <input id="dpc" class="jadd" name="dpc" type="text" placeholder=" P/C" required />
                </div>
                <div class="jac ja_ct">
                    <input id="dCtc" class="jadd" name="dCtc" type="text" placeholder=" Name" required />
                </div>
                <div class="jac ja_ph">
                    <input id="dPh" class="jadd" name="dPh" type="text" placeholder=" Phone" required />
                </div>
                <div class="jac ja_em">
                    <input id="dEm" class="jadd" name="dEm" type="text" placeholder=" Email" required />
                </div>
                <div class="jac ja_ct">
                    <input id="j_e_ct2" class="jadd" name="dCtc2" type="text" placeholder=" Name" required />
                </div>
                <div class="jac ja_ph">
                    <input id="j_e_ph2" class="jadd" name="dPh2" type="text" placeholder=" Phone" required />
                </div>
                <div class="jac ja_em">
                    <input id="j_e_em2" class="jadd" name="dEm2" type="text" placeholder=" Email" required />
                </div>
            </div>
        </div>
    </div>
</div>

<div id="jdet-cns">
    <div class="title">
        <div class="cnmulti"><img id="mcn" src="img/book-2.svg" alt="Con Note Book"></div>
        <div class="cnt">
            <span>Con Notes</span>
        </div>

        <div class="cnadd"><img id="acn" src="img/add-lines.png" alt="Add a Con Note"></div>
    </div>
    <div id="contlst" class="cont">

    </div>
</div>

<div id="jdet-supp">
    <div class="title">
        <p>Suppliers</p>
    </div>
    <div class="cont">
        <div id="suplTbl">
            <div id="suphead">
                <div id="suptr">
                    <div class="supSu th">Supplier</div>
                    <div class="supTy th">Trailer Types | Qty's</div>
                    <div class="supDe th">Description</div>
                    <div class="supEc th">Est Cost</div>
                    <div class="supIr th">Inv Rec</div>
                    <div class="supNo th">Notes</div>
                    <div class="supSp th"></div>
                </div>
            </div>
            <div data-id="new" id="asup" class="asupln suptr">
                <div contenteditable="true" data-col="jsName" class="supSu asup"></div>
                <div contenteditable="true" data-col="jsType" class="supTy asup"></div>
                <div contenteditable="true" data-col="jsDesc" class="supDe asup"></div>
                <div contenteditable="true" data-col="jsEst" class="supEc asup"></div>
                <div contenteditable="true" data-col="jsInvRec" class="supIr asup"></div>
                <div contenteditable="true" data-col="jsNotes" class="supNo asup"></div>
                <div id="addsup" class="supSp asup">Add Supplier</div>
            </div>
            <div class="tbody" id="supbody">
            </div>
        </div>

    </div>
</div>
<!--<div id="jdet-polish">
    <div class="title">
        <p> Milestones </p>
    </div>
    <div class="cont">

    </div>
</div>-->
<!--</section>-->
<script src="/js/jdet.js?ver=0423"></script>
<?php 

include_once 'footer.php'
?>