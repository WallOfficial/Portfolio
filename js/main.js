function asideVisibl(){
    var aside = document.getElementById('leftaside');
    var asidestyle = window.getComputedStyle(aside);

    if (asidestyle.display === "none"){
        aside.style.display = "block";
    } else{
        aside.style.display = "none";
    }
}

function createSite(){
    var form = document.getElementById('siteSettings');
    var formData = new FormData(form);
    var siteData = Object.fromEntries(formData.entries());

    var textcolor = "black";

    var zip = JSZip();

    if (siteData.sitetopic === "black"){
        textcolor = "white";
    }

    var htmlContent = `

    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>${siteData.siteName}</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <div class="text" style="">

            <h1>${siteData.title1}</h1>
            <p>${siteData.text1}</p>

            <h1>${siteData.title2}</h1>
            <p>${siteData.text2}</p>

            <h1>${siteData.title3}</h1>
            <p>${siteData.text3}</p>

            <h1>${siteData.title4}</h1>
            <p>${siteData.text4}</p>

            <h1>${siteData.title5}</h1>
            <p>${siteData.text5}</p>

        </div>
    </body>
    </html>

    `;

    var cssContent = `

    body{
        background: ${siteData.sitetopic}
    }

    .text{

        color: ${textcolor};
        width: 100%;
        height: 100%;
    }

    `
    if (siteData.template === "portfolio"){
        var cssContent = `

        body{
            background: #999999;
        }

        .text{
            display: block;
            background: ${siteData.sitetopic};
            max-width: 600px;
            width: 600px;
            min-height: 100vh;
            margin-left: auto;
            margin-right: auto;
            padding: 20px;
            overflow-wrap: break-word;
            color: ${textcolor};
        }
        `
    }


    zip.file("index.html", htmlContent);
    zip.file("style.css", cssContent);

    // 4. Генерируем архив и скачиваем его
    zip.generateAsync({ type: "blob" }).then(function(content) {
        const url = URL.createObjectURL(content);
        const link = document.createElement("a");
        link.href = url;
        link.download = "WallWebConstructor.zip"; // Имя архива
        link.click();
        URL.revokeObjectURL(url);
    });

}
