alert("โหลด bill.js แล้ว");


loadBill();



async function loadBill() {


    try {


        const billId = localStorage.getItem("billId");


        console.log("BILL ID =", billId);



        if (!billId) {


            alert("ไม่พบ Bill ID");


            window.location.href = "home.html";


            return;

        }



        const url =

            CONFIG.GAS_URL +

            "?action=getBill&billId=" +

            encodeURIComponent(billId);



        console.log("REQUEST =", url);



        const response = await fetch(url);



        const text = await response.text();



        console.log("GAS RESPONSE =", text);



        const result = JSON.parse(text);



        console.log("RESULT =", result);



        if(result.status !== "success"){


            alert(
                "ไม่พบข้อมูลบิล : " +
                result.message
            );


            return;

        }



        const bill = result.bill;



        console.log("BILL DATA =", bill);



        const title =
        document.getElementById("title");


        const amount =
        document.getElementById("amount");


        const dueDate =
        document.getElementById("dueDate");


        const qrImage =
        document.getElementById("qrImage");



        title.innerText =
        bill.Title || "-";



        amount.innerText =
        bill.Amount || "0";



        dueDate.innerText =
        formatDate(bill.DueDate);



        if(bill.QRFileID){


            qrImage.src =

            "https://drive.google.com/thumbnail?id="

            + bill.QRFileID

            + "&sz=w1000";



            qrImage.alt =
            "QR Code";


        }
        else{


            qrImage.alt =
            "ไม่มี QR Code";


        }



    }
    catch(error){


        console.error(
            "ERROR LOAD BILL",
            error
        );


        alert(
            "Error : " +
            error.message
        );


    }


}




function formatDate(date){


    if(!date){

        return "-";

    }


    const d = new Date(date);


    if(isNaN(d)){

        return date;

    }


    return d.toLocaleDateString(
        "th-TH"
    );


}
