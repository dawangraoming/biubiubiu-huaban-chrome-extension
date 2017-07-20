/*!
 * @author xueyangchu
 * @date 2017/7/17
 */
"use strict";

(function () {
    if (!(/个人主页$/.test(document.title))) return;

    // var docFragment = document.createDocumentFragment();

    const DOWNLOAD_PATH = 'http://127.0.0.1:13888/download/';

    console.log('%c欢迎使用大王的超级无敌下下下!', 'color:red; font-size:48px;');

    function fetchDownload() {
        let XML = new XMLHttpRequest();
        if (!XML) return alert('你的浏览器不支持AJAX');
        XML.onreadystatechange = function () {
            if (XML.readyState === 4) {
                if (XML.status === 200) {
                    let result = JSON.parse(XML.responseText);
                    alert(result.msg);
                } else {
                    alert('服务端出现异常！');
                }
            }
        };
        let id = this.parentNode.getAttribute('data-id');
        let url = encodeURIComponent('http://huaban.com/boards/' + id);
        XML.open('GET', DOWNLOAD_PATH + url);
        XML.send()
    }

    function createBtn() {
        let btnEle = document.createElement('a');
        btnEle.href = 'javascript:;';
        btnEle.className = '__xyc_download_btn__';
        btnEle.innerText = '去吧！皮卡丘！';
        btnEle.addEventListener('click', fetchDownload);

        return btnEle;
    }


    function insert() {
        let domList = document.querySelectorAll('#waterfall .Board[data-id]');

        for (let i = 0; i < domList.length; i++) {
            let dom = domList[i];
            dom.appendChild(createBtn());
        }
    }

    insert();
})();