window.onload = async function () {

    // โหลดข้อมูล LINE
    const user = JSON.parse(localStorage.getItem("lineUser"));

    if (user) {

        document.getElementById("username").innerText =
            user.displayName;

        // ถ้ามีรูปโปรไฟล์
        if (user.pictureUrl) {
            document.getElementById("avatar").src =
                user.pictureUrl;
        }

    }

    // โหลดรายการบิล
    loadBills();

};


async function loadBills() {

    try {

        const res = await fetch(
            CONFIG.GAS_URL + "?action=getBills"
        );

        const result = await res.json();

        const billList =
            document.getElementById("billList");

        billList.innerHTML = "";


        if (result.status !== "success") {

            billList.innerHTML =
                "<p>ไม่พบข้อมูล</p>";

            return;

        }


        result.bills.forEach(bill => {

            billList.innerHTML += `

            <div class="bill-card">

                <h3>${bill.Title}</h3>

                <p><b>ยอดเงิน :</b> ${bill.Amount} บาท</p>

                <p><b>ครบกำหนด :</b> ${bill.DueDate}</p>

                <button onclick="openBill('${bill.BillID}')">

                    ชำระเงิน

                </button>

            </div>

            `;

        });

    } catch (err) {

        document.getElementById("billList").innerHTML =
            "<p>โหลดข้อมูลไม่สำเร็จ</p>";

        console.error(err);

    }

}


function openBill(billId) {

    localStorage.setItem(
        "billId",
        billId
    );

    window.location.href =
        "bill.html";

}
