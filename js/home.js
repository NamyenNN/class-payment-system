async function loadBills() {

    try {

        const res = await fetch(
            CONFIG.GAS_URL +
            "?action=getBills"
        );


        const result = await res.json();


        const billList =
        document.getElementById("billList");


        billList.innerHTML = "";


        if(result.status !== "success"){

            billList.innerHTML =
            "<p>ไม่พบข้อมูล</p>";

            return;

        }



        result.bills.forEach(bill => {


            billList.innerHTML += `

            <div class="bill-card">

                <h3>${bill.Title}</h3>

                <p>
                จำนวนเงิน :
                ${bill.Amount} บาท
                </p>


                <p>
                ครบกำหนด :
                ${bill.DueDate}
                </p>


                <button onclick="openBill('${bill.BillID}')">
                    ชำระเงิน
                </button>


            </div>

            `;


        });


    }
    catch(err){

        console.error(err);

        document.getElementById("billList").innerHTML =
        "<p>load failed</p>";

    }

}
