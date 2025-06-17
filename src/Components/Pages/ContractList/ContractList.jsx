import React from "react";
import Layouts from "../Layouts/Layouts";
import './contractlist.css'

import maximize from "../../../images/icons/maximize.svg";

function ContractList() {
  return (
    <Layouts>
        <div class="container-fluid contract-list">
      <div class="contract-search-box">

      </div>
      <div class="contract-details-box">
        <div className="details-head">
            <h3>Contract Details</h3>
            <div>
                <img src={maximize}/>
            </div>
        </div>
      </div>
      <div class="tier-details-box">3</div>
      <div class="pricing-table-box">4</div>
    </div>
    </Layouts>
  );
}

export default ContractList;
