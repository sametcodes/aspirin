(function(){
    function delete_tweet(tweets){
        if(tweets.length > 0){
            for(var i = 0; i <= tweets.length; i++){
                let context = tweets[i].querySelector('.context');
                if(context.innerText){
                    let h = context.querySelector('.tweet-context>span')
                    let act = h.className.split("--").splice(-1)[0]
                    if(act !== "retweeted"){
                        tweets[i].remove();
                    }
                }
            }
        }
    }

    const target = document.querySelector('.stream-items');
    var observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            let tweets = [...mutation.addedNodes].map(node => node.childNodes[1])
            delete_tweet(tweets);
        })
    });
    var config = {
        attributes: true, childList: true, characterData: true
    };
    observer.observe(target, config) 

    delete_tweet([...document.querySelectorAll('.tweet')])
})
