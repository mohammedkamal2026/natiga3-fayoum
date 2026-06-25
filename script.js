let students = [];

// تحميل البيانات عند فتح الصفحة
window.addEventListener("DOMContentLoaded", async () => {

    try {

        const response = await fetch("data.json");

        students = await response.json();

        console.log("تم تحميل", students.length, "طالب");

    } catch (error) {

        console.error(error);

        alert("تعذر تحميل قاعدة البيانات (data.json)");

    }

});

// زر البحث
document.getElementById("searchBtn").addEventListener("click", searchResult);

// البحث بزر Enter
document.getElementById("seatNumber").addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        searchResult();

    }

});

function searchResult() {

    const seat = document.getElementById("seatNumber").value.trim();

    if (seat === "") {

        alert("من فضلك أدخل رقم الجلوس");

        return;

    }

    const loading = document.getElementById("loading");
    const resultCard = document.getElementById("resultCard");

    loading.style.display = "block";
    resultCard.classList.remove("active");

    setTimeout(() => {

        loading.style.display = "none";

        const student = students.find(s => String(s.seat) === seat);

        if (!student) {

            resultCard.classList.add("active");

            resultCard.innerHTML = `

                <div class="not-found">

                    رقم الجلوس غير موجود

                </div>

            `;

            return;

        }

        resultCard.classList.add("active");

        resultCard.innerHTML = `

            <h2 class="student-name">

                ${student.name}

            </h2>

            <table>

                <tr>

                    <td>رقم الجلوس</td>

                    <td>${student.seat}</td>

                </tr>

                <tr>

                    <td>المدرسة</td>

                    <td>${student.school}</td>

                </tr>

                <tr>

                    <td>الإدارة التعليمية</td>

                    <td>${student.adara}</td>

                </tr>

                <tr>

                    <td>اللغة العربية</td>

                    <td>${student.arabic}</td>

                </tr>

                <tr>

                    <td>اللغة الإنجليزية</td>

                    <td>${student.english}</td>

                </tr>

                <tr>

                    <td>الدراسات الاجتماعية</td>

                    <td>${student.derasat}</td>

                </tr>

                <tr>
<td>الجبر</td>
<td>${student.gabr}</td>
</tr>

<tr>
<td>الهندسة</td>
<td>${student.handasa}</td>
</tr>

<tr>
<td><strong>الرياضيات</strong></td>
<td><strong>${student.math}</strong></td>
</tr>

                <tr>

                    <td>العلوم</td>

                    <td>${student.science}</td>

                </tr>

                <tr>

                    <td>المجموع</td>

                    <td><strong>${student.total}</strong></td>

                </tr>

                
                </tr>

            </table>

        `;

    }, 300);

}