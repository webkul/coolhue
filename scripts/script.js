// coolHue Script

document.addEventListener("DOMContentLoaded", function () {
    //Globals
    var chColorFrom = document.querySelectorAll(".ch-color-from");
    var chColorTo = document.querySelectorAll(".ch-color-to");
    var chGradient = document.querySelectorAll(".ch-gradient");
    var chCode = document.querySelectorAll(".ch-code");
    var chGrab = document.querySelectorAll(".ch-grab");
    var notifyPlank = document.querySelector(".ch-notify-plank");
    var backgroundImage = "background-image: ";
    var gradientType = "linear-gradient( 135deg, ";
    var gradientStart = " 0%, ";
    var gradientEnd = " 100%)";

    for (var i = 0; i < chGradient.length; i++) {
        tempColorFrom = chColorFrom[i].innerText;
        tempColorTo = chColorTo[i].innerText;
        var tempImage = gradientType + tempColorFrom + gradientStart + tempColorTo + gradientEnd;
        chGradient[i].style.backgroundImage = tempImage;
        chColorTo[i].style.color = tempColorTo;
        chCode[i].dataset.colorFrom = tempColorFrom;
        chCode[i].dataset.colorTo = tempColorTo;
        chGrab[i].dataset.colorFrom = tempColorFrom;
        chGrab[i].dataset.colorTo = tempColorTo;
    }


    window.onclick = function (event) {
        //Copy Code
        if (event.target.matches(".ch-code")) {
            var eventColorFrom = event.target.dataset.colorFrom;
            var eventColorTo = event.target.dataset.colorTo;
            var eventResult = backgroundImage + gradientType + eventColorFrom + gradientStart + eventColorTo + gradientEnd + ";";

            function dynamicNode() {
                var node = document.createElement("pre");
                node.style.position = "fixed";
                node.style.fontSize = "0px";
                node.textContent = eventResult;
                return node;
            };

            var node = dynamicNode();
            document.body.appendChild(node);

            var selection = getSelection();
            selection.removeAllRanges();
            var range = document.createRange();
            range.selectNodeContents(node);
            selection.addRange(range);

            document.execCommand('copy');
            selection.removeAllRanges();
            document.body.removeChild(node);

            function notifyClient() {
                notifyPlank.classList.add("ch-notify-plank");
                var notify = document.createElement("span");
                notify.classList.add("ch-notify", "ch-notify-animate");
                var notifyText = document.createTextNode("CSS3 Code Copied 👍");
                notify.appendChild(notifyText);
                notifyPlank.appendChild(notify);
            }
            notifyClient();

            setTimeout(function () {
                var notify = document.querySelectorAll(".ch-notify");
                var notify = notify[0];
                notifyPlank.removeChild(notify);
            }, 5000);
        }
        //Grab Palette
        if (event.target.matches(".ch-grab")) {
            var eventColorFrom = event.target.dataset.colorFrom;
            var eventColorTo = event.target.dataset.colorTo;
            var canvas = document.createElement("canvas");
            canvas.width = "500";
            canvas.height = "500";
            var ctx = canvas.getContext("2d");
            var tempGradient = ctx.createLinearGradient(0, 0, 500, 500);
            tempGradient.addColorStop(0, eventColorFrom);
            tempGradient.addColorStop(1, eventColorTo);
            ctx.fillStyle = tempGradient;
            ctx.fillRect(0, 0, 500, 500);
            window.open(canvas.toDataURL());
        }
    }
});