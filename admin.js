let students = [];

const fileInput = document.getElementById("excelFile");
const uploadBtn = document.getElementById("uploadBtn");
const tableBody = document.querySelector("#previewTable tbody");

const studentCount = document.getElementById("studentCount");
const successCount = document.getElementById("successCount");
const failCount = document.getElementById("failCount");

const downloadBtn = document.getElementById("downloadBtn");
const deleteBtn = document.getElementById("deleteBtn");
const refreshBtn = document.getElementById("refreshBtn");
const searchInput = document.getElementById("searchInput");

uploadBtn.onclick = function () {

    if (!fileInput.files.length) {
        alert("اختر ملف Excel أولاً");
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {

        const data = new Uint8Array(e.target.result);

        const workbook = XLSX.read(data, {
            type: "array"
        });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        students = XLSX.utils.sheet_to_json(sheet);

        updateStatistics();

        drawTable(students);

        alert("تم تحميل الملف بنجاح");

    };

    reader.readAsArrayBuffer(fileInput.files[0]);

};


function updateStatistics() {

    studentCount.innerHTML = students.length;

    let success = 0;
    let fail = 0;

    students.forEach(s => {

        if (
            s.status == "ناجح" ||
            s.Status == "ناجح"
        ) {

            success++;

        } else {

            fail++;

        }

    });

    successCount.innerHTML = success;

    failCount.innerHTML = fail;

}


function drawTable(data) {

    tableBody.innerHTML = "";

    data.slice(0,50).forEach(student => {

        tableBody.innerHTML += `

<tr>

<td>${student.seat || student.Seat || ""}</td>

<td>${student.name || student.Name || ""}</td>

<td>${student.school || student.School || ""}</td>

<td>${student.total || student.Total || ""}</td>

<td>${student.status || student.Status || ""}</td>

</tr>

`;

    });

}



downloadBtn.onclick = function(){

    if(students.length===0){

        alert("لا توجد بيانات");

        return;

    }

    const blob = new Blob(

        [JSON.stringify(students,null,2)],

        {

            type:"application/json"

        }

    );

    const a=document.createElement("a");

    a.href=URL.createObjectURL(blob);

    a.download="data.json";

    a.click();

};



deleteBtn.onclick=function(){

students=[];

tableBody.innerHTML="";

studentCount.innerHTML=0;

successCount.innerHTML=0;

failCount.innerHTML=0;

alert("تم حذف البيانات");

};



refreshBtn.onclick=function(){

location.reload();

};



searchInput.onkeyup=function(){

const keyword=this.value.toLowerCase();

const filtered=students.filter(s=>{

return JSON.stringify(s).toLowerCase().includes(keyword);

});

drawTable(filtered);

};