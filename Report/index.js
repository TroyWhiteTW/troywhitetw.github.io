// 宣告需要用到的資料容器 以便整理使用資料 (全域變數或常數)
const SORT_RESULT = ['DEFAULT', 'DESC', 'ASC'];

// document 載入完成後執行的 JS
window.onload = () => {
    /**
     * 格式化數字格式
     * @param {string} sNumber
     * @returns {string}
     */
    function formatString(sNumber) {
        return Number.parseFloat(sNumber).toFixed(2);
    }

    /**
     * 檢查轉換 IP 的格式
     * @param {string} sIP
     * @returns {string}
     */
    function formatIP(sIP) {
        if (sIP.match(/\d{1,3}[.]\d{1,3}[.]\d{1,3}[.]\d{1,3}/) === null) {
            const sIP16 = parseInt(sIP).toString(16);

            return `${parseInt(`0x${sIP16[0]}${sIP16[1]}`)}.${parseInt(`0x${sIP16[2]}${sIP16[3]}`)}.${parseInt(`0x${sIP16[4]}${sIP16[5]}`)}.${parseInt(`0x${sIP16[6]}${sIP16[7]}`)}`;
        } else {
            return sIP;
        }
    }

    /**
     * 封裝產生 td 節點的方法便於使用
     * @param {function} settingAttribute
     * @returns {HTMLElement}
     */
    function createTd(settingAttribute) {
        const oTd = document.createElement('td');

        settingAttribute(oTd);

        return oTd;
    }

    /**
     * 封裝產生 span 節點的方法便於使用
     * @param {function} settingAttribute
     * @returns {HTMLElement}
     */
    function createSpan(settingAttribute) {
        const oSpan = document.createElement('span');

        settingAttribute(oSpan);

        return oSpan;
    }

    /**
     * 產生 data row 的節點給 table 新增到頁面上
     * @param {Node} oTrParentNode
     * @param {object} oRowData
     * @param {string} sKeyName
     */
    function createDataRow(oTrParentNode, oRowData, sKeyName) {
        const oTr = document.createElement('tr');

        // 時間
        oTr.appendChild(createTd(oTd => {
            oTd.style.textAlign = 'center';

            oTd.appendChild(createSpan(oSpan => {
                oSpan.style.color = 'blue';
                oSpan.innerText = `[${oRowData.a}]`;
            }));

            oTd.appendChild(document.createElement('br'));

            oTd.appendChild(createSpan(oSpan => {
                oSpan.innerText = oRowData.b.split(' ')[0];
            }));

            oTd.appendChild(document.createElement('br'));

            oTd.appendChild(createSpan(oSpan => {
                oSpan.innerText = oRowData.b.split(' ')[1];
            }));

            oTd.appendChild(document.createElement('br'));

            oTd.appendChild(createSpan(oSpan => {
                oSpan.style.color = 'red';
                oSpan.innerText = oRowData.c;
            }));
        }));

        // 單號
        oTr.appendChild(createTd(oTd => {
            oTd.style.textAlign = 'center';

            oTd.appendChild(createSpan(oSpan => {
                oSpan.innerText = `${oRowData.d} 班`;
            }));

            oTd.appendChild(document.createElement('br'));

            oTd.appendChild(createSpan(oSpan => {
                oSpan.innerText = sKeyName;
            }));

            oTd.appendChild(document.createElement('br'));

            oTd.appendChild(createSpan(oSpan => {
                oSpan.innerText = `[${formatIP(oRowData.e)}]`;
            }));
        }));

        // 內容
        oTr.appendChild(createTd(oTd => {
            oTd.appendChild(createSpan(oSpan => {
                oSpan.innerText = `[${oRowData.f}類 第 ${oRowData.g} 班]`;
            }));

            oTd.appendChild(document.createElement('br'));

            oTd.appendChild(createSpan(oSpan => {
                oSpan.style.color = 'green';
                oSpan.innerText = `[${oRowData.h}]`;
            }));

            oTd.appendChild(document.createElement('br'));

            oTd.appendChild(createSpan(oSpan => {
                oSpan.innerText = `${oRowData.i} - ${oRowData.j}位數`;
            }));

            oTd.appendChild(document.createElement('br'));

            oTd.appendChild(createSpan(oSpan => {
                if (parseFloat(oRowData.p) >= 0) {
                    oSpan.style.color = 'green';
                } else {
                    oSpan.style.color = 'red';
                }

                oSpan.innerText = oRowData.k;
            }));

            oTd.appendChild(createSpan(oSpan => {
                oSpan.style.color = 'red';
                oSpan.innerText = ` @ ${oRowData.l}`;
            }));
        }));

        // 金額
        oTr.appendChild(createTd(oTd => {
            oTd.style.textAlign = 'right';
            oTd.style.verticalAlign = 'top';

            oTd.appendChild(createSpan(oSpan => {
                oSpan.innerText = formatString(oRowData.m);
            }));
        }));

        // 有效金額
        oTr.appendChild(createTd(oTd => {
            oTd.style.textAlign = 'right';
            oTd.style.verticalAlign = 'top';

            oTd.appendChild(createSpan(oSpan => {
                oSpan.innerText = formatString(oRowData.n);
            }));
        }));

        // 會員 近
        oTr.appendChild(createTd(oTd => {
            oTd.style.textAlign = 'right';
            oTd.style.verticalAlign = 'top';

            oTd.appendChild(createSpan(oSpan => {
                if (parseFloat(oRowData.p) >= 0) {
                    oSpan.style.color = 'green';
                } else {
                    oSpan.style.color = 'red';
                }

                oSpan.innerText = formatString(oRowData.o);
            }));
        }));

        // 會員 結果
        oTr.appendChild(createTd(oTd => {
            oTd.style.textAlign = 'right';
            oTd.style.verticalAlign = 'top';

            oTd.appendChild(createSpan(oSpan => {
                if (parseFloat(oRowData.p) >= 0) {
                    oSpan.style.color = 'green';
                } else {
                    oSpan.style.color = 'red';
                }

                oSpan.innerText = formatString(oRowData.p);
            }));
        }));

        // 代理商 近
        oTr.appendChild(createTd(oTd => {
            oTd.style.textAlign = 'right';
            oTd.style.verticalAlign = 'top';

            oTd.appendChild(createSpan(oSpan => {
                if (parseFloat(oRowData.p) >= 0) {
                    oSpan.style.color = 'green';
                } else {
                    oSpan.style.color = 'red';
                }

                oSpan.innerText = formatString(oRowData.q);
            }));
        }));

        // 代理商 上交
        oTr.appendChild(createTd(oTd => {
            oTd.style.textAlign = 'right';
            oTd.style.verticalAlign = 'top';

            oTd.appendChild(createSpan(oSpan => {
                if (parseFloat(oRowData.p) >= 0) {
                    oSpan.style.color = 'green';
                } else {
                    oSpan.style.color = 'red';
                }

                oSpan.innerText = formatString(oRowData.r);
            }));

            oTd.appendChild(document.createElement('br'));

            oTd.appendChild(createSpan(oSpan => {
                oSpan.innerText = oRowData.s;
            }));
        }));

        // 總公司 結果
        oTr.appendChild(createTd(oTd => {
            oTd.style.textAlign = 'right';
            oTd.style.verticalAlign = 'top';

            oTd.appendChild(createSpan(oSpan => {
                if (parseFloat(oRowData.p) >= 0) {
                    oSpan.style.color = 'green';
                } else {
                    oSpan.style.color = 'red';
                }

                oSpan.innerText = formatString(oRowData.t);
            }));
        }));

        oTrParentNode.appendChild(oTr);
    }

    /**
     * 產生 table footer 的節點給 table 新增到頁面上
     * @param {Node} oTrParentNode
     * @param {object} oJSONData
     */
    function createTableFooter(oTrParentNode, oJSONData) {
        const oTr = document.createElement('tr');

        // 時間
        oTr.appendChild(createTd(oTd => {
            oTd.classList.add('tableFooter');
            oTd.innerText = '總計：';
        }));

        // 單號
        oTr.appendChild(createTd(oTd => {
            oTd.classList.add('tableFooter');
        }));

        // 內容
        oTr.appendChild(createTd(oTd => {
            oTd.classList.add('tableFooter');
        }));

        // 金額
        oTr.appendChild(createTd(oTd => {
            oTd.classList.add('tableFooter');

            let fSum = 0;

            for (let sKey in oJSONData) {
                fSum += parseInt(oJSONData[sKey].m);
            }

            if (fSum >= 0) {
                oTd.style.color = 'green';
            } else {
                oTd.style.color = 'red';
            }

            oTd.innerText = formatString(fSum.toString());
        }));

        // 有效金額
        oTr.appendChild(createTd(oTd => {
            oTd.classList.add('tableFooter');

            let fSum = 0;

            for (let sKey in oJSONData) {
                fSum += parseInt(oJSONData[sKey].n);
            }

            if (fSum >= 0) {
                oTd.style.color = 'green';
            } else {
                oTd.style.color = 'red';
            }

            oTd.innerText = formatString(fSum.toString());
        }));

        // 會員 近
        oTr.appendChild(createTd(oTd => {
            oTd.classList.add('tableFooter');

            let fSum = 0;

            for (let sKey in oJSONData) {
                fSum += parseFloat(oJSONData[sKey].o);
            }

            if (fSum >= 0) {
                oTd.style.color = 'green';
            } else {
                oTd.style.color = 'red';
            }

            oTd.innerText = formatString(fSum.toString());
        }));

        // 會員 結果
        oTr.appendChild(createTd(oTd => {
            oTd.classList.add('tableFooter');

            let fSum = 0;

            for (let sKey in oJSONData) {
                fSum += parseFloat(oJSONData[sKey].p);
            }

            if (fSum >= 0) {
                oTd.style.color = 'green';
            } else {
                oTd.style.color = 'red';
            }

            oTd.innerText = formatString(fSum.toString());
        }));

        // 代理商 近
        oTr.appendChild(createTd(oTd => {
            oTd.classList.add('tableFooter');

            let fSum = 0;

            for (let sKey in oJSONData) {
                fSum += parseFloat(oJSONData[sKey].q);
            }

            if (fSum >= 0) {
                oTd.style.color = 'green';
            } else {
                oTd.style.color = 'red';
            }

            oTd.innerText = formatString(fSum.toString());
        }));

        // 代理商 上交
        oTr.appendChild(createTd(oTd => {
            oTd.classList.add('tableFooter');

            let fSum = 0;

            for (let sKey in oJSONData) {
                fSum += parseFloat(oJSONData[sKey].r);
            }

            if (fSum >= 0) {
                oTd.style.color = 'green';
            } else {
                oTd.style.color = 'red';
            }

            oTd.innerText = formatString(fSum.toString());
        }));

        // 總公司 結果
        oTr.appendChild(createTd(oTd => {
            oTd.classList.add('tableFooter');

            let fSum = 0;

            for (let sKey in oJSONData) {
                fSum += parseFloat(oJSONData[sKey].t);
            }

            if (fSum >= 0) {
                oTd.style.color = 'green';
            } else {
                oTd.style.color = 'red';
            }

            oTd.innerText = formatString(fSum.toString());
        }));

        oTrParentNode.appendChild(oTr);
    }

    /**
     * 依取得的 JSON 資料 及 排序狀態 將資料 render 到頁面上
     * @param {object} oJSONData
     * @param {int} iSortNumber
     */
    function renderReport(oJSONData, iSortNumber) {
        const aTr = document.getElementsByTagName('tr');
        const oTrParentNode = aTr[0].parentNode;
        const oTdResult = document.getElementById('tdResult');
        const oSortMap = new Map();

        let aSortMap;

        // 清除 table tr 節點
        if (aTr.length > 2) {
            for (let i = aTr.length - 1; i > 1; i--) {
                oTrParentNode.removeChild(aTr[i]);
            }
        }

        for (let sKey in oJSONData) {
            oSortMap.set(sKey, oJSONData[sKey].p);
        }

        aSortMap = [...oSortMap];

        // 排序資料
        switch (SORT_RESULT[iSortNumber]) {
            case 'DEFAULT':
                oTdResult.style.background = 'darkgreen';

                aSortMap = [...oSortMap];

                break;
            case 'DESC':
                oTdResult.style.background = 'lightblue';

                aSortMap.sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]));

                break;
            case 'ASC':
                oTdResult.style.background = 'lightcoral';

                aSortMap.sort((a, b) => parseFloat(a[1]) - parseFloat(b[1]));

                break;
        }

        // 產生 data row 到 table
        for (let aValue of aSortMap.values()) {
            createDataRow(oTrParentNode, oJSONData[aValue[0]], aValue[0]);
        }

        // 產生 table footer
        createTableFooter(oTrParentNode, oJSONData);
    }

    // 宣告需要用到的節點
    const oInputBtnReadJSON = document.getElementById('inputBtnReadJSON');
    const oTdResult = document.getElementById('tdResult');

    // 宣告需要用到的資料容器 以便整理使用資料
    let oJSONData = null;
    let iSortNumber = 0;

    // 綁定節點監聽事件
    oInputBtnReadJSON.addEventListener('click', ev => {
        ev.preventDefault();

        oJSONData = JSON.parse(document.getElementById('textareaInputJSON').value);

        iSortNumber = 0;

        renderReport(oJSONData, iSortNumber);
    });

    oTdResult.addEventListener('click', ev => {
        ev.preventDefault();

        if (oJSONData === null) return;

        iSortNumber++;

        renderReport(oJSONData, (iSortNumber % SORT_RESULT.length));
    });
};