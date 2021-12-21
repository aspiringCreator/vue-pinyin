/*
 * @Author: your name
 * @Date: 2021-12-10 14:02:10
 * @LastEditTime: 2021-12-14 11:04:05
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ccit-webe:\创正2021年\创正11月\拼音小游戏\js\comment.js
 */
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
                    jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData','startRecord','stopRecord','onVoiceRecordEnd','playVoice','pauseVoice','stopVoice','onVoicePlayEnd','uploadVoice','downloadVoice','translateVoice'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });

            }
        });
        wx.ready(function() {
            //自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
            wx.ready(function() { //需在用户可能点击分享按钮前就先调用
                wx.updateAppMessageShareData({
                    title: '辰山植物专科医院', // 分享标题
                    desc: '辰山植物专科医院', // 分享描述
                    link: 'https://www.csnbgsh.cn/cszkyy/ZwHome/user_aouth', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'https://www.csnbgsh.cn/cszkyy/Scripts/logo1.png', // 分享图标
                    success: function() {
                        // 设置成功
                    }
                })
            });

            //自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
            wx.ready(function() { //需在用户可能点击分享按钮前就先调用
                wx.updateTimelineShareData({
                    title: '辰山植物专科医院', // 分享标题
                    link: 'https://www.csnbgsh.cn/cszkyy/ZwHome/user_aouth', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'https://www.csnbgsh.cn/cszkyy/Scripts/logo1.png', // 分享图标
                    success: function() {
                        // 设置成功
                    }
                })
            });
            // wx.ready(function() { //需在用户可能点击分享按钮前就先调用
            //     wx.startRecord({
            //         success: function () {
            //             localStorage.allowRecord = 'true';
            //             // 仅仅为了授权，所以立刻停掉
            //             wx.stopRecord();
            //             console.log('成功');
            //         },
            //         cancel: function () {
            //             alert('用户拒绝授权录音');
            //         }

            //     });
            // });
            document.querySelector('#startRecord').onclick = function () {
                wx.startRecord({
                    cancel: function () {
                        alert('鐢ㄦ埛鎷掔粷鎺堟潈褰曢煶');
                    }
                });
            };

            // 4.3 鍋滄褰曢煶
            document.querySelector('#stopRecord').onclick = function () {
                wx.stopRecord({
                    success: function (res) {
                        voice.localId = res.localId;
                    },
                    fail: function (res) {
                        alert(JSON.stringify(res));
                    }
                });
            };

            // 4.4 鐩戝惉褰曢煶鑷姩鍋滄
            wx.onVoiceRecordEnd({
                complete: function (res) {
                    voice.localId = res.localId;
                    alert('褰曢煶鏃堕棿宸茶秴杩囦竴鍒嗛挓');
                }
            });

            // 4.5 鎾斁闊抽
            document.querySelector('#playVoice').onclick = function () {
                if (voice.localId == '') {
                    alert('璇峰厛浣跨敤 startRecord 鎺ュ彛褰曞埗涓€娈靛０闊�');
                    return;
                }
                wx.playVoice({
                    localId: voice.localId
                });
            };
            // if (!localStorage.allowRecord || localStorage.allowRecord !== 'true') {
            // wx.ready(function(){
            //     var btnRecord = $('.voice');

            //     btnRecord.on('touchstart', function(event) {
            //         event.preventDefault();
            //         console.log('开始');
            //         // btnRecord.addClass('hold');
            //         startTime = new Date().getTime();
            //         // 延时后录音，避免误操作
            //         recordTimer = setTimeout(function() {
            //             wx.startRecord({
            //                 success: function() {
            //                     // localStorage.allowRecord = 'true';
            //                 },
            //                 cancel: function() {
            //                     alert('用户拒绝授权录音');
            //                 }
            //             });
            //         }, 300);
            //     }).on('touchend', function(event) {
            //         event.preventDefault();
            //         // btnRecord.removeClass('hold');
            //         console.log('结束');
            //         // 间隔太短
            //         if (new Date().getTime() - startTime < 300) {
            //             startTime = 0;
            //             // 不录音
            //             clearTimeout(recordTimer);
            //         } else { // 松手结束录音
            //             wx.stopRecord({
            //                 success: function(res) {
            //                     localId = res.localId;
            //                     // 上传到服务器
            //                     uploadVoice();
            //                 },
            //                 fail: function(res) {
            //                     alert(JSON.stringify(res));
            //                 }
            //             });
            //         }
            //     });

            //     //上传录音
            //     function uploadVoice(){
            // //调用微信的上传录音接口把本地录音先上传到微信的服务器
            // //不过，微信只保留3天，而我们需要长期保存，我们需要把资源从微信服务器下载到自己的服务器
            //      wx.uploadVoice({
            //         localId: voice.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
            //         isShowProgressTips: 1, // 默认为1，显示进度提示
            //         success: function (res) {
            //         console.log(res);
            //         //把录音在微信服务器上的id（res.serverId）发送到自己的服务器供下载。
            //         // $.ajax({
            //         //     url: '后端处理上传录音的接口',
            //         //     type: 'post',
            //         //     data: JSON.stringify(res),
            //         //     dataType: "json",
            //         //     success: function (data) {
            //         //         alert('文件已经保存到自己的服务器');
            //         //     },
            //         //     error: function (xhr, errorType, error) {
            //         //         console.log(error);
            //         //     }
            //         // });
            //          }
            //      });
            //     }
            // })

            // }
        });


    // }
