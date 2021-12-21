/*
 * @Author: your name
 * @Date: 2021-12-10 14:02:10
 * @LastEditTime: 2021-12-20 18:38:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ccit-webe:\创正2021年\创正11月\拼音小游戏\js\comment.js
 */
Vue.prototype.$wx = wx
var pagetUrl = window.location.href;
//var wx = require("http://res.wx.qq.com/open/js/jweixin-1.0.0.js");
    //--微信JS配置
    // if (wx != null && wx != undefined) {
        // if (pagetUrl.indexOf("#") > 0) {
        //     pagetUrl = str.substring(0, pagetUrl.indexOf("#"));
        // }
        $.ajax({
            url: "https://www.csnbgsh.cn/cszkyy/aa/taken_post",
            type: "post",
            data: {
                purl: pagetUrl
            },
            dataType: "json",
            success: function(data) {
                // alert(data)
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.appid, // 必填，公众号的唯一标识
                    timestamp: data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.nonceStr, // 必填，生成签名的随机串
                    signature: data.signature, // 必填，签名，见附录1
                    jsApiList: [
                    'updateAppMessageShareData',
                    'updateTimelineShareData',
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'onMenuShareQZone',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    'translateVoice',
                    'startRecord',
                    'stopRecord',
                    'onVoiceRecordEnd',
                    'playVoice',
                    'onVoicePlayEnd',
                    'pauseVoice',
                    'stopVoice',
                    'uploadVoice',
                    'downloadVoice',
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage',
                    'getNetworkType',
                    'openLocation',
                    'getLocation',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'closeWindow',
                    'scanQRCode',
                    'chooseWXPay',
                    'openProductSpecificView',
                    'addCard',
                    'chooseCard',
                    'openCard'
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });

            }
        });

        wx.ready(function() {
            //自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
                wx.updateAppMessageShareData({
                    title: '辰山植物专科医院', // 分享标题
                    desc: '辰山植物专科医院', // 分享描述
                    link: 'https://www.csnbgsh.cn/cszkyy/ZwHome/user_aouth', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'https://www.csnbgsh.cn/cszkyy/Scripts/logo1.png', // 分享图标
                    success: function() {
                        // 设置成功
                    }
                })
            //自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
                wx.updateTimelineShareData({
                    title: '辰山植物专科医院', // 分享标题
                    link: 'https://www.csnbgsh.cn/cszkyy/ZwHome/user_aouth', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'https://www.csnbgsh.cn/cszkyy/Scripts/logo1.png', // 分享图标
                    success: function() {
                        // 设置成功
                    }
                })
                // 3 智能接口
            // var voice = {
            //     localId: '',
            //     serverId: ''
            // };

            // document.getElementById('dom').ontouchstart=function () {
            //     $('#startRecord').hide()
            //     wx.startRecord({
            //         cancel: function () {
            //             alert('用户拒绝授权录音');
            //         }
            //     });
            //  }

            //  document.getElementById('dom').ontouchend=function () {
            //     $('#startRecord').show()
            //     // event.preventDefault();
            //     // btnRecord.removeClass('hold');
            //     var sendDate = (new Date()).getTime();
            //     // 间隔太短
            //     wx.stopRecord({

            //         success: function (res) {
            //             voice.localId = res.localId;

            //             wx.translateVoice({
            //                 localId: voice.localId,
            //                 isShowProgressTips: 0, // 默认为1，显示进度提示
            //                 complete: function (res) {
            //                   if (res.hasOwnProperty('translateResult')) {
            //                     var receiveDate = (new Date()).getTime();
            //                     var responseTimeMs = receiveDate - sendDate;
            //                     alert(responseTimeMs)
            //                     alert( res.translateResult.replace(
            //                         /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?|\。|\，|\？]/g,
            //                         ""));



            //                     $('.words .list').html(res.translateResult)
            //                   } else {
            //                     alert('无法识别');
            //                   }
            //                 }
            //               });
            //         },
            //         fail: function (res) {
            //             alert(JSON.stringify(res));
            //         }
            //     });


            // };
            //  // 3.1 识别音频并返回识别结果
            // document.querySelector('#translateVoice').onclick = function () {
            //   if (voice.localId == '') {
            //     alert('请先使用 startRecord 接口录制一段声音');
            //     return;
            //   }
            //   wx.translateVoice({
            //     localId: voice.localId,
            //     complete: function (res) {
            //       if (res.hasOwnProperty('translateResult')) {
            //         alert('识别结果：' + res.translateResult);
            //       } else {
            //         alert('无法识别');
            //       }
            //     }
            //   });
            // };
            //  // 4 音频接口
            // // 4.2 开始录音
            // document.querySelector('#startRecord').onclick = function () {
            //     wx.startRecord({
            //         cancel: function () {
            //             alert('用户拒绝授权录音');
            //         }
            //     });
            // };
            // // 4.3 停止录音
            // document.querySelector('#stopRecord').onclick = function () {
            //     wx.stopRecord({
            //         success: function (res) {
            //             voice.localId = res.localId;
            //             alert(voice.localId)
            //         },
            //         fail: function (res) {
            //             alert(JSON.stringify(res));
            //         }
            //     });
            // };

            // // 4.4 监听录音自动停止
            // wx.onVoiceRecordEnd({
            //     complete: function (res) {
            //         voice.localId = res.localId;
            //         alert('录音时间已超过一分钟');
            //     }
            // });

            //  // 4.5 播放音频
            // document.querySelector('#playVoice').onclick = function () {

            //     if (voice.localId == '') {
            //         alert('请先使用 startRecord 接口录制一段声音');
            //         return;
            //     }
            //     wx.playVoice({
            //         localId: voice.localId
            //     });
            // };

        });



