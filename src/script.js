/*!
 * @author xueyangchu
 * @date 2017/7/17
 */
"use strict";

(function () {
    //若非个人主页与搜索画板，则不注入
    if (!(/个人主页$/.test(document.title) || /search\/boards/.test(location.href))) return;


    const DOWNLOAD_PATH = 'http://127.0.0.1:13888/download/';

    console.log('%c欢迎使用大王的超级无敌下下下!', 'color:red; font-size:48px;');

    function fetchDownload(type, id) {
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
        //设置内容类型
        // XML.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        XML.open('post', `${DOWNLOAD_PATH}${encodeURIComponent(type)}/${encodeURIComponent(id)}`, true);
        XML.send();
    }

    function createBtn(pEle) {
        let btnEle = document.createElement('a');
        btnEle.href = 'javascript:;';
        btnEle.className = '__xyc_download_btn__';
        btnEle.innerText = '去吧！皮卡丘！';
        let id = pEle.parentNode.getAttribute('data-id');
        btnEle.addEventListener('click', fetchDownload.bind(this, 'board', id));

        return btnEle;
    }


    function insert() {
        let domList = document.querySelectorAll('#waterfall .Board[data-id]');

        for (let i = 0; i < domList.length; i++) {
            let dom = domList[i];
            //判断是否已插入下载按钮
            if (!dom.querySelector('.__xyc_download_btn__')) {
                dom.appendChild(createBtn(dom));
            }
        }
    }

    insert();

    let waterfall = document.querySelector('#waterfall');
    //对列表进行DOM监听，发生DOM变化时重新注入下载按钮
    waterfall && waterfall.addEventListener('DOMSubtreeModified', function () {
        insert();
    });

})();