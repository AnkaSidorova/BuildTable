/**
 * Created by DimoH4uk on 26.02.2017.
 */


;(function () {
    var timeoutOpenModal;

    var buttonsModal = document.querySelectorAll('[data-open-modal]');
    buttonsModal.forEach(function (button) {
        button.addEventListener('click', function () {
            var modal = document.querySelector('#' + button.getAttribute('data-open-modal') + '[data-modal]');
            openModal(modal);
        })
    });

    document.querySelectorAll('[data-modal]').forEach(function (item) {
        addOverlay(item, 'div');
    });

    function closeModal(modal) {
        clearTimeout(timeoutOpenModal);
        if (!modal) {
            var modals = document.querySelectorAll('[data-modal]');
            modals.forEach(function (item) {
                item.classList.remove('open');
                item.parentNode.classList.remove('open');
                item.parentNode.querySelector('#loader').remove();
            });
            document.querySelectorAll('.overlay').forEach(function (item) {
                item.classList.remove('open');
            })
        } else {
            var loader = modal.parentNode.querySelector('#loader');
            modal.classList.remove('open');
            modal.parentNode.classList.remove('open');
            if (loader) {
                loader.remove();
            }
        }
    }

    function openModal(modal) {
        modal.parentNode.classList.add('open');
        modal.classList.add('down');
        if (!modal.parentNode.querySelector('#loader')) {
            modal.parentNode.appendChild(addLoader());
        }

        timeoutOpenModal = setTimeout(function () {
            modal.classList.toggle('open');
            positionModal(modal);
            modal.parentNode.querySelector('#loader').remove();
        }, 3000);


        modal.querySelectorAll('[data-close]').forEach(function (item) {
            item.addEventListener('click', function () {
                closeModal(modal);
                modal.classList.add('down_2');
                modal.remove('down');
            });
        });

    }


    function addOverlay(element, selector) {
        var wrapper = document.createElement(selector);
        wrapper.classList.add('overlay');
        wrapper.innerHTML = element.outerHTML;
        element.parentNode.replaceChild(wrapper, element);
        wrapper.addEventListener('click', function (event) {
            if (event.target == this) {
                closeModal();
                this.classList.remove('open');
            }
        });
    }

    function positionModal(modal) {
        var params = modal.getBoundingClientRect(),
            heightWind = modal.parentNode.clientHeight, top;
        top = (parseInt(heightWind) / 2) - (params.height / 2);
        modal.style.top = top + 'px';
    }

    window.addEventListener('resize', function () {
        var modal = document.querySelector('[data-modal].open');
        if (modal) {
            positionModal(modal);
        }
    });

    var newTdStyle = {'background': '#000', 'text-align': 'center'};
    var tableTR;
    var tableTD;


    document.querySelector('#button-event').addEventListener('click', function () {
        tableTR = document.querySelector('#tableTR').value;
        tableTD = document.querySelector('#tableTD').value;
        newTable(tableTR, tableTD, newTdStyle);
    });

    document.querySelector('#button-add').addEventListener('click', function () {
        appendTd(tableTR, tableTD, newTdStyle);
    });

    document.querySelector('#button-remove').addEventListener('click', function () {
        removeTd();
    });


    function generateTable(n, m, styleTd) {
        var table = document.createElement('table');
        for (var i = 0; i < n; i++) {
            var tr = document.createElement('tr');
            for (var j = 0; j < m; j++) {
                tr.appendChild(generateTd(styleTd))
            }
            table.appendChild(tr);
        }
        return table;
    }

    function generateTd(style) {
        var td = document.createElement('td');
        var color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        setStyles(td, style);
        td.style.background = color;
        td.innerHTML = color;
        td.style.color = 'white';
        return td;
    }

    function setStyles(el, style) {
        for (var key in style) {
            el.style[key] = style[key]
        }
    }


    function newTable(tr, td, style) {
        if (tr && td) {
            var table = generateTable(tr, td, style);
            setStyles(table, {'width': '100%'});
            if (document.querySelector('#table-wrapper table')) {
                document.querySelector('#table-wrapper table').remove();
            }
            document.querySelector('#table-wrapper').appendChild(table);
        }
        else alert('вы указали не все значения');
    }

    function appendTd(tr, td, style) {
        var table = document.querySelector('#table-wrapper table');
        if (table) {
            var tableLastTD = table.lastChild.querySelectorAll('td').length;
            if (tableLastTD == td) {
                var newTr = document.createElement('tr');
                newTr.appendChild(generateTd(style));
                table.appendChild(newTr);
            } else if (tableLastTD < td) {
                table.lastChild.appendChild(generateTd(style));
            }
        } else {
            newTable(tr, td, style);
        }
    }


    function removeTd() {
        var table = document.querySelector('#table-wrapper table');
        var str = table ? table.lastChild : false;
        var tableLastTD = str ? str.querySelectorAll('td').length : false;
        if (!str) {
            table ? table.remove() : false;
            return;
        }
        tableLastTD && tableLastTD == 1 ? str.remove() : str.lastChild.remove();
        tableLastTD == 1 && table.querySelectorAll('tr').length <= 1 ? table.remove() : false;
    }

    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function addLoader() {
        var loader = document.createElement('div');
        loader.setAttribute('id', 'loader');
        for (var i = 1; i <= 8; i++) {
            var div = document.createElement('div');
            div.setAttribute('id', 'square_' + i);
            div.classList.add('square');
            loader.appendChild(div);
        }
        return loader;
    }
})();


/*
 <div id="loader">
 <div id="square">
 <div id="square_1" class="square"></div>
 <div id="square_2" class="square"></div>
 <div id="square_3" class="square"></div>
 <div id="square_4" class="square"></div>
 <div id="square_5" class="square"></div>
 <div id="square_6" class="square"></div>
 <div id="square_7" class="square"></div>
 <div id="square_8" class="square"></div>
 </div>
 </div>
 */