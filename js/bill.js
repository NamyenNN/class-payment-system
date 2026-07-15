window.onload = function () {

    loadBill();

};



async function loadBill() {

    const billId = localStorage.getItem("billId");


    console.log("BILL ID =", billId);



    if (!billId) {

        alert("ไม่พบรายการบิล");

        window.location.href = "home.html";

        return;

    }



    try {


        const url =
            CONFIG.GAS_URL +
            "?action=getBill&billId=" +
            encodeURIComponent(billId);



        console.log("REQUEST =", url);



        const response = await fetch(url);



        const text = await response.text();



        console.log("GAS RESPONSE =", text);



        const result = JSON.parse(text);



        if (result.status !== "success") {


            alert(
                result.message ||
                "ไม่พบข้อมูลบิล"
            );


            return;

        }



        const bill = result.bill;



        document.getElementById("title").innerText =
            bill.Title || "-";



        document.getElementById("amount").innerText =
            bill.Amount || "0";



        document.getElementById("dueDate").innerText =
            bill.DueDate || "-";




        if (bill.QRFileID) {


            document.getElementById("qrImage").src =

                "https://drive.google.com/thumbnail?id=" +
                bill.QRFileID +
                "&sz=w1000";


        }
        else {


            document.getElementById("qrImage").alt =
                "ไม่มี QR Code";


        }



    }
    catch(err) {


        console.error(
            "LOAD BILL ERROR",
            err
        );


        alert(
            "โหลดข้อมูลบิลไม่สำเร็จ"
        );


    }


}
