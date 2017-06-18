// coolHue Script

document.addEventListener("DOMContentLoaded", function () {
    // Dataset
    var gradientData = [
        ["#FDEB71", "#F8D800"],
        ["#ABDCFF", "#0396FF"],
        ["#FEB692", "#EA5455"],
        ["#CE9FFC", "#7367F0"],
        ["#90F7EC", "#32CCBC"],
        ["#FFF6B7", "#F6416C"],
        ["#81FBB8", "#28C76F"],
        ["#E2B0FF", "#9F44D3"],
        ["#F97794", "#623AA2"],
        ["#FCCF31", "#F55555"],
        ["#F761A1", "#8C1BAB"],
        ["#43CBFF", "#9708CC"],
        ["#5EFCE8", "#736EFE"],
        ["#FAD7A1", "#E96D71"],
        ["#FFD26F", "#3677FF"],
        ["#A0FE65", "#FA016D"],
        ["#FFDB01", "#0E197D"],
        ["#FEC163", "#DE4313"],
        ["#92FFC0", "#002661"],
        ["#EEAD92", "#6018DC"],
        ["#F6CEEC", "#D939CD"],
        ["#52E5E7", "#130CB7"],
        ["#F1CA74", "#A64DB6"],
        ["#E8D07A", "#5312D6"],
        ["#EECE13", "#B210FF"],
        ["#79F1A4", "#0E5CAD"],
        ["#FDD819", "#E80505"],
        ["#FFF3B0", "#CA26FF"],
        ["#FFF5C3", "#9452A5"],
        ["#F05F57", "#360940"]
    ];

    // Globals
    var notifyPlank = document.querySelector(".ch-notify-plank");
    var backgroundImage = "background-image: ";
    var gradientType = "linear-gradient( 135deg, ";
    var gradientStart = " 0%, ";
    var gradientEnd = " 100%)";
    var chPaper = document.querySelector(".ch-paper");

    Element.prototype.withClass = function(className) {
        this.classList.add(className);
        return this;
    };

    function addBrick(colorFrom, colorTo) {
        var chGradientBrick = document.createElement("div").withClass("ch-gradient-brick");
        var chGradient = document.createElement("div").withClass("ch-gradient");
        var chActions = document.createElement("div").withClass("ch-actions");
        var chCode = document.createElement("div").withClass("ch-code");
        var chGrab = document.createElement("div").withClass("ch-grab");
        var chColors = document.createElement("div").withClass("ch-colors");
        var chColorFrom = document.createElement("div").withClass("ch-color-from");
        var chColorTo = document.createElement("div").withClass("ch-color-to");
        var tempImage = gradientType + colorFrom + gradientStart + colorTo + gradientEnd;

        chGradient.style.backgroundImage = tempImage;
        chGradient.dataset = {};
        chColorFrom.style.color = chColorFrom.innerText = chGradient.dataset.colorFrom = colorFrom;
        chColorTo.style.color = chColorTo.innerText = chGradient.dataset.colorTo = colorTo;
        chCode.onclick = copyHandler;
        chGrab.onclick = grabHandler;

        chActions.appendChild(chCode);
        chActions.appendChild(chGrab);
        chGradient.appendChild(chActions);
        chGradientBrick.appendChild(chGradient);
        chColors.appendChild(chColorFrom);
        chColors.appendChild(chColorTo);
        chGradientBrick.appendChild(chColors);
        chPaper.appendChild(chGradientBrick)
    }

    gradientData.forEach(function(colors){
        addBrick(colors[0], colors[1]);
    });

    function copyHandler(event) {
        var dataset = event.target.parentNode.parentNode.dataset;
        var eventColorFrom = dataset.colorFrom;
        var eventColorTo = dataset.colorTo;
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

    function grabHandler(event) {
        var dataset = event.target.parentNode.parentNode.dataset;
        var eventColorFrom = dataset.colorFrom;
        var eventColorTo = dataset.colorTo;
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

});
