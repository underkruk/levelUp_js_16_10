;(function () {
    "use strict";

    let user = {},
        imageList = [],
        limit_image = 6,
        url = 'http://api.giphy.com/v1/gifs/trending?rating=y&limit=' + limit_image + '&api_key=dc6zaTOxFJmzC';

    let $validationForm     = document.getElementById('form_validation'),
        $messagesContainer  = document.getElementById("message_container"),
        $chartForm          = document.getElementById('chart-form'),
        $chatMessageInput   = document.getElementById('chart-message'),
        $giphyContainer     = document.getElementById('giphy-container');

    const ws                = io('http://178.62.203.188:8888');

    $validationForm.addEventListener('submit', onValidation);

    $chartForm.addEventListener("submit", onSendMessage);


    function onValidation(ev) {

        ev.preventDefault();

        let username = document.getElementById('username').value.trim();

        if (username.length <= 2) {

            let $error = document.getElementById('error');

            $error.textContent = '*Username must be included more than 2 symbols!';

        } else {

            let $wrapValidation = document.getElementById('wrap_validation'),
                $chartPage      = document.getElementById('chart-page'),
                $alert          = document.getElementById('messageHi');

            user.name = `@${username}`;

            $wrapValidation.setAttribute('style', 'display:none');

            $chartPage.setAttribute('style', 'dispaly:show');

            $alert.innerHTML = `Wellcom to chart <b>${user.name}</b>!`;

            //Загрузка сообщений

            ws.on("chat message", data => {

                console.log(data);

            let $p = document.createElement("p");

            if (data.name) {
                $p.textContent = `${data.name}: ${data.message}`;
                $messagesContainer.appendChild($p);
                if (data.img) {
                    imageList.find(el => {
                        if( el.id === data.img ) {
                            let $img_chat = document.createElement('img');
                            $img_chat.setAttribute('src', el.url);
                            $img_chat.setAttribute('id', el.id);
                            $messagesContainer.appendChild($img_chat);
                        }
                    });
                }
            }
        });

            //загрузка giphy-картинок

            fetch(url)
                .then( res => res.json() )
                .then(res => {
                    let giphyList = res.data;
                console.log(giphyList);
                return giphyList.map(el => {
                        return {
                            id: el.id,
                            url: el['images']['fixed_height_small']['url']
                        }
                    });
                })
                .then(res => {
                    imageList = res;
                    imageList.forEach(function (el, iter) {
                        let $div = document.createElement('div');
                        $div.className = 'col-md-2';
                        let $img = document.createElement('img');
                        $img.setAttribute('src', el.url);
                        $img.setAttribute('id', el.id);
                        $div.appendChild($img);
                        $giphyContainer.appendChild($div);
                });
                $giphyContainer.addEventListener("click", function (ev) {
                if (ev.target['id'] != 'giphy-container')
                    ws.emit("chat message", {name: user.name, message: '', img: ev.target['id']})

                });
            })
            .catch(function (e) {
                console.log(e);
            })
        }
    }


    function onSendMessage(ev) {

        ev.preventDefault();

        let message = $chatMessageInput.value.trim();

        if (!message) return;

        ws.emit("chat message", {name: user.name, message: message});

        $chatMessageInput.value = "";
    }


})();