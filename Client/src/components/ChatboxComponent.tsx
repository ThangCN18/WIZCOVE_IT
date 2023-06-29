import React, { useEffect } from "react";

function KommunicateChat() {
    useEffect(() => {
        // var cssChanges = ".mck-msg-right .mck-msg-box{background-color: blue!important;color:yellow!important;}";
        (function (d, m) {
            var kommunicateSettings = {
                "appId": "3cce81c86f7d6c4e31dcf6db7d6acfb2d", "popupWidget": true, "automaticChatOpenOnNavigation": true,
                "onInit": function () {
                    KommunicateGlobal.document.querySelector("#kommunicate-widget-iframe").style.height = "375px";
                }
            };
            var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
            window.kommunicate = m; m._globals = kommunicateSettings;
        })(document, window.kommunicate || {});

    }, [])

    return (
        <div></div>
    );
}

export default KommunicateChat;