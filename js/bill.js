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



        const response = await fetch(url);



        const text = await response.text();



        console.log("GAS RESPONSE =", text);



        const result = JSON.parse(text);



        if(result.status !== "success"){


            alert(
                "ไม่พบข้อมูลบิล : " +
                result.message
            );


            return;

        }



        const bill = result.bill;



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





        // QR เริ่มต้น = 1 ตัว

        if(bill.QRFileID){


            qrImage.src =

            "https://drive.google.com/thumbnail?id="

            + bill.QRFileID

            + "&sz=w1000";


            qrImage.alt =
            "QR Code";


        }






        // เปลี่ยนตามจำนวนที่เลือก

        const packs =
        document.querySelectorAll(
            'input[name="pack"]'
        );



        packs.forEach(pack => {


            pack.addEventListener(
                "change",
                function(){



                    // เลือก 1 ตัว

                    if(this.value === "1"){


                        amount.innerText =
                        bill.Amount;



                        qrImage.src =

                        "https://drive.google.com/thumbnail?id="

                        + bill.QRFileID

                        + "&sz=w1000";


                    }




                    // เลือก 2 ตัว

                    if(this.value === "2"){


                        amount.innerText =
                        bill.Amount2;



                        qrImage.src =

                        "https://drive.google.com/thumbnail?id="

                        + bill.QRFileID2

                        + "&sz=w1000";


                    }



                }
            );


        });



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
