window.onload = function () {
    loadBill();
};

async function loadBill() {

    const billId = localStorage.getItem("billId");

    if (!billId) {
        alert("ไม่พบรายการ");
        window.location.href = "home.html";
        return;
    }

    try {

        const response = await fetch(
            CONFIG.GAS_URL +
            "?action=getBill&billId=" +
            encodeURIComponent(billId)
        );

        const result = await response.json();

        if (result.status !== "success") {
            alert(result.message);
            return;
        }

        const bill = result.bill;

        document.getElementById("title").innerText =
            bill.Title;

        document.getElementById("amount").innerText =
            bill.Amount;

        document.getElementById("dueDate").innerText =
            bill.DueDate;

        // แสดง QR จาก Google Drive
        document.getElementById("qrImage").src =
            "https://drive.google.com/thumbnail?id=" +
            bill.QRFileID +
            "&sz=w1000";

    } catch (err) {

        console.error(err);

        alert("เกิดข้อผิดพลาดในการโหลดข้อมูล");

    }

}
