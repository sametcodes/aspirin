var checkedState = true;

browser.menus.create({
  id: "retweeted",
  type: "checkbox",
  title: "Retweet",
  contexts: ["all"],
  checked: checkedState
});

browser.menus.create({
  id: "heartBadge",
  type: "checkbox",
  title: "Likes",
  contexts: ["all"],
  checked: checkedState
});

browser.menus.create({
  id: "followings",
  type: "checkbox",
  title: "Followings",
  contexts: ["all"],
  checked: checkedState
});

function execute(tabId, itemId, checked){
    browser.tabs.executeScript(tabId, {
        code: `var blockings = JSON.parse(localStorage.getItem("blockings") || "{}");
            localStorage.setItem("blockings", JSON.stringify({...blockings, ${itemId}: ${checked}}));`
    }).then(() => {
        console.log("Executed!")
    }).catch(err=>{
        console.error("Not executed:")
        console.error(err)
    })
}
browser.menus.onClicked.addListener(({menuItemId, checked}, tab) => {
    execute(tab.id, menuItemId, checked)
});

