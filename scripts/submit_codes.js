/*
只支持nodejs

#格式化提交互助码
55 23 * * * https://raw.githubusercontent.com/qq34347476/js_script/master/scripts/submit_codes.js, tag=格式化提交互助码, img-url=https://raw.githubusercontent.com/yogayyy/task/master/huzhucode.png, enabled=true

 */
const $ = new Env("格式化提交互助码");

const notify = $.isNode() ? require("./sendNotify") : "";
const fs = require("fs");
const path = require("path");
$.shareCodeObj = {};
$.exportStr = "";


if (!$.isNode()) {
  console.log("不是nodejs环境");
} else {
  let filePath = path.resolve(__dirname, "../log/jcode");
  let readDir = fs.readdirSync(filePath).reverse();
  let fileName;

  if (readDir && readDir.length > 0) {
    fileName = readDir[0];
  } else {
    console.log("没有生成日志，请手动运行 jcode");
  }

  let file = path.resolve(__dirname, filePath, fileName);
  // 读取日志
  fs.readFile(file, "utf-8", function (err, data) {
    if (err) {
      console.error(err);
    } else {
      console.log("读取成功");
      $.shareCodeObj.Bean = getCodes("MyBean", data);
      $.shareCodeObj.Fruit = getCodes("MyFruit", data);
      $.shareCodeObj.Pet = getCodes("MyPet", data);
      $.shareCodeObj.DreamFactory = getCodes("MyDreamFactory", data);
      $.shareCodeObj.JdFactory = getCodes("MyJdFactory", data);
      $.shareCodeObj.Sgmh = getCodes("MySgmh", data);
      $.shareCodeObj.Cash = getCodes("MyCash", data);
      $.shareCodeObj.Joy = getCodes("MyJoy", data);
      $.shareCodeObj.Jdzz = getCodes("MyJdzz", data);

      $.shareCodeObj.Cfd = getCodes("MyCfd", data);
      $.shareCodeObj.Jxnc = getCodes("MyJxnc", data);
      $.shareCodeObj.Health = getCodes("MyHealth", data);

      showFormatMsg($.shareCodeObj);

    }
  });

  // 不再 jcode 中的 短期活动 互助码
  temporaryActivitie('jd_city','city');
  temporaryActivitie("jd_carnivalcity", "carnivalcity");
}
//@Turing Lab Bot 临时活动
function temporaryActivitie (dir, zhName)  {
  let filePath = path.resolve(__dirname, `../log/${dir}`);
  let readDir = fs.readdirSync(filePath).reverse();
  let fileName;

  if (readDir && readDir.length > 0) {
    fileName = readDir[0];
  } else {
    console.log(`没有生成日志，请手动运行 ${dir}`);
  }
  let file = path.resolve(__dirname, filePath, fileName);
  fs.readFile(file, "utf-8", function (err, data) {
    if (err) {
      console.error(err);
    } else {
      console.log("提交机器人 @Turing Lab Bot");
      $.shareCodeObj[zhName] = logShareCodes(data, zhName);

      $.shareCodeObj[zhName] &&
        console.log(
          `/submit_activity_codes ${zhName} ${getRandomArrayElements(
            $.shareCodeObj[zhName]
          ).join("&")}\n`
        );
    }
  });
}

// 通用格式化
const logShareCodes = (data, zhName) => {
  const reg = new RegExp(`(互助码】)([A-Za-z0-9=\\-_{}:"',]+)`, "gim");
  let arr = data.match(reg);
  if (!arr) {
    return;
  }
  arr = arr.join("★");
  arr = arr.replace(reg, "$2");
  arr = arr.split("★");
  return arr
};

const getCodes = (name,data) => {
      const reg = new RegExp(`(${name}\\d+=)([A-Za-z0-9=\\-_{}:"',]+)`, "gim");
      let arr = data.match(reg)
      if(!arr) {
        return
      }
      let str = arr.join("★");
      str = str.replace(reg, "$2");
      arr = str.split("★");
      return arr.map(item => {
        return item.slice(1,-1)
      })
}

function showFormatMsg(shareCodeObj) {
  console.log(
    `\n========== 【格式化互助码只留随机4-5个(一定有第一个)】 ==========`
  );
  console.log(`\n提交机器人 @Turing Lab Bot\n`);
  shareCodeObj.Bean &&
    console.log(
      `/submit_activity_codes bean ${getRandomArrayElements(
        shareCodeObj.Bean
      ).join("&")}\n`
    );
  shareCodeObj.Fruit &&
    console.log(
      `/submit_activity_codes farm ${getRandomArrayElements(
        shareCodeObj.Fruit
      ).join("&")}\n`
    );
  shareCodeObj.Pet &&
    console.log(
      `/submit_activity_codes pet ${getRandomArrayElements(
        shareCodeObj.Pet
      ).join("&")}\n`
    );
  shareCodeObj.DreamFactory &&
    console.log(
      `/submit_activity_codes jxfactory ${getRandomArrayElements(
        shareCodeObj.DreamFactory
      ).join("&")}\n`
    );
  shareCodeObj.JdFactory &&
    console.log(
      `/submit_activity_codes ddfactory ${getRandomArrayElements(
        shareCodeObj.JdFactory
      ).join("&")}\n`
    );
  // 临时活动
  shareCodeObj.Sgmh &&
    console.log(
      `/submit_activity_codes sgmh ${getRandomArrayElements(
        shareCodeObj.Sgmh
      ).join("&")}\n`
    );
  shareCodeObj.Cfd &&
    console.log(
      `/submit_activity_codes jxcfd ${getRandomArrayElements(
        shareCodeObj.Cfd
      ).join("&")}\n`
    );
  shareCodeObj.Health &&
    console.log(
      `/submit_activity_codes health ${getRandomArrayElements(
        shareCodeObj.Health
      ).join("&")}\n`
    );

  console.log(`\n提交机器人 @Commit Code Bot\n`);
  shareCodeObj.Cash &&
    console.log(
      `/jdcash ${getRandomArrayElements(shareCodeObj.Cash).join("&")}\n`
    );
  shareCodeObj.Joy &&
    console.log(
      `/jdcrazyjoy ${getRandomArrayElements(shareCodeObj.Joy).join("&")}\n`
    );

  shareCodeObj.Jdzz &&
    console.log(
      `/jdzz ${getRandomArrayElements(shareCodeObj.Jdzz).join("&")}\n`
    );
}

// 随机区 数组中的 几个元素， 必有 第一个元素
function getRandomArrayElements(arr = [], count = 4) {
  if (arr.length <= 5) {
    return arr;
  } else {
    let shuffled = arr.slice(0),
      i = arr.length,
      min = i - count,
      temp,
      index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    const res = [arr[0], ...shuffled.slice(min)];
    return [...new Set(res)];
  }
}

// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
