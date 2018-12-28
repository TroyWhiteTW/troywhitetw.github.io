window.onload = () => {
    /**
     * 將獎號字串處理成陣列後傳出
     * @param {string} sData
     * @returns {string[]}
     */
    function compareLottoResult(sData) {
        let aCompareData = sData.split(',');

        aCompareData.splice(0, 1);
        aCompareData.sort((a, b) => a - b);

        return Array.from(new Set(aCompareData));
    }

    /**
     * 驗證輸入的資料是否為正確的 JSON
     * @param {string} sText
     * @returns {boolean}
     */
    function isValidJSON(sText) {
        try {
            const oJSONData = JSON.parse(sText);

            // 判斷輸入的資料是否為 JSON 物件
            if (typeof oJSONData !== 'object') return false;

            // 判斷輸入的資料是否存在 .history
            if (typeof oJSONData.history === 'undefined') return false;

            for (let sKey in oJSONData.history) {
                // 判斷期號格式是否正確
                if (!sKey.match(/^[A]\d{9}$/)) return false;

                // 解析某一期的獎號資料
                const aCompareData = compareLottoResult(oJSONData.history[sKey]);
                // 判斷獎號是否為 20 個
                if (aCompareData.length !== 20) return false;

                for (let sValue of aCompareData) {
                    // 判斷獎號是否為數字
                    if (!sValue.match(/^\d?\d$/)) return false;

                    // 判斷獎號是否在 1 ~ 80 的範圍內
                    const iValue = Number.parseInt(sValue);
                    if (iValue <= 0 || iValue > 80) return false;
                }
            }

            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * 清除 號碼畫面
     */
    function clearNumbers() {
        document.getElementById('numbers').innerHTML = '';
    }

    /**
     * 將資料用動畫方式 render 到畫面上
     * @param {string[]} aNumberData
     */
    function renderData(aNumberData) {
        clearNumbers();

        // 宣告動畫陣列/隊列
        let aAnimates = [];
        // 當前動畫是否完成的旗標
        let bAnimateFinishFlag = false;

        // 尋訪資料陣列中每個獎號 並處理相關 render 所需之參數 及 動畫狀態處理
        for (let [iIndex, sElem] of aNumberData.entries()) {
            const iNumber = Number.parseInt(sElem);
            const oDiv = document.createElement('div');

            let sRunBackground;
            let sStopBackground;

            if (iNumber > 40) {
                sRunBackground = 'url("Images/icon_kenoBtmRR.gif")';
                sStopBackground = 'url("Images/icon_kenoRed.png")';
            } else {
                sRunBackground = 'url("Images/icon_kenoBtmRB.gif")';
                sStopBackground = 'url("Images/icon_kenoBlue.png")';
            }

            oDiv.style.width = '38px';
            oDiv.style.height = '38px';
            oDiv.style.left = '400px';
            oDiv.style.top = `${Math.floor(iIndex / 10) * 40 + 1}px`;
            oDiv.style.borderRadius = '38px';
            oDiv.style.position = 'absolute';
            oDiv.style.background = sRunBackground;
            oDiv.style.backgroundRepeat = 'no-repeat';

            document.getElementById('numbers').appendChild(oDiv);

            // 宣告動畫事件
            const fAnimate = function animate() {
                const oTimer = requestAnimationFrame(animate);

                let iSpeed = ((iIndex % 10 * 40 + 1) - oDiv.offsetLeft) / 10;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                oDiv.style.left = oDiv.offsetLeft + iSpeed + 'px';

                if (iSpeed === 0) {
                    const oInnerDiv = document.createElement('div');
                    if (iNumber < 10) {
                        oInnerDiv.style.left = '15px';
                    } else {
                        oInnerDiv.style.left = '11px';
                    }
                    oInnerDiv.style.top = '10px';
                    oInnerDiv.style.color = '#ffffff';
                    oInnerDiv.style.position = 'absolute';
                    oInnerDiv.innerText = iNumber.toString();

                    oDiv.appendChild(oInnerDiv);

                    if (iNumber > 40) {
                        oDiv.style.top = `${Math.floor(iIndex / 10) * 40}px`;
                    }

                    oDiv.style.background = sStopBackground;

                    cancelAnimationFrame(oTimer);

                    bAnimateFinishFlag = true;
                }

            };

            // 將動畫事件加入動畫陣列/隊列
            aAnimates.push(fAnimate);

        }

        // 尋訪取得所有動畫事件的動畫陣列/隊列 並執行每個獎號的動畫事件
        let iAnimateTarget = 0;
        aAnimates[iAnimateTarget]();

        let oTimer = null;
        oTimer = setInterval(() => {
            if (iAnimateTarget >= 19) {
                clearInterval(oTimer);
                return;
            }

            if (bAnimateFinishFlag) {
                iAnimateTarget++;
                aAnimates[iAnimateTarget]();
                bAnimateFinishFlag = false;
            }
        }, 1000);

    }

    // 宣告一些會用到的節點
    const oInputText = document.getElementById('inputJSON');
    const oBtnRead = document.getElementById('readJSONBtn');
    const oBtnPrevVol = document.getElementById('prevVolBtn');
    const oDivVolText = document.getElementById('volumeText');
    const oBtnNextVol = document.getElementById('nextVolBtn');

    // 宣告資料容器 以便處理資料
    let bIsInputJSON = true;
    let oJSONData = null;
    let aVolumes = [];
    let iVolIndex = 0;

    // 綁定節點相關事件
    oInputText.addEventListener('keyup', ev => {
        ev.preventDefault();

        // 驗證輸入的字串是否為正確格式 是的話會將顯示開獎結果按鈕解開鎖定狀態
        bIsInputJSON = isValidJSON(oInputText.value);
        if (!bIsInputJSON) {
            oDivVolText.innerText = '----------';

            clearNumbers();

            oJSONData = null;
            aVolumes = [];
            iVolIndex = 0;
        }
    });

    // 點擊後依輸入的資料顯示最新一期的開獎結果
    oBtnRead.addEventListener('click', ev => {
        ev.preventDefault();

        if (!bIsInputJSON) {
            alert('輸入的格式或資料有誤！');

            clearNumbers();

            oJSONData = null;
            aVolumes = [];
            iVolIndex = 0;

            return;
        }

        oJSONData = JSON.parse(oInputText.value).history;
        aVolumes = [];

        for (let sKey in oJSONData) {
            aVolumes.push(sKey);
        }

        iVolIndex = aVolumes.length - 1;

        aVolumes.sort();
        oDivVolText.innerText = aVolumes[iVolIndex];

        renderData(compareLottoResult(oJSONData[aVolumes[iVolIndex]]));
    });

    // 點即顯示前一期開獎結果
    oBtnPrevVol.addEventListener('click', ev => {
        ev.preventDefault();

        if (!bIsInputJSON) return;

        iVolIndex--;

        if (iVolIndex < 0) {
            iVolIndex = 0;

            alert('已無更前一期資料');
        } else {
            oDivVolText.innerText = aVolumes[iVolIndex];
            renderData(compareLottoResult(oJSONData[aVolumes[iVolIndex]]));
        }
    });

    // 點擊顯示後一期開獎結果
    oBtnNextVol.addEventListener('click', ev => {
        ev.preventDefault();

        if (!bIsInputJSON) return;

        iVolIndex++;

        if (iVolIndex > aVolumes.length - 1) {
            iVolIndex = aVolumes.length - 1;

            alert('已無更後一期資料');
        } else {
            oDivVolText.innerText = aVolumes[iVolIndex];
            renderData(compareLottoResult(oJSONData[aVolumes[iVolIndex]]));
        }
    });
};