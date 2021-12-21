/*
 * @Author: your name
 * @Date: 2021-12-08 16:02:30
 * @LastEditTime: 2021-12-20 16:27:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ccit-webe:\创正2021年\创正11月\拼音小游戏\js\main.js
 */
// document.addEventListener('DOMContentLoaded', musicInWeixinHandler);

// function musicInWeixinHandler() {
//     musicPlay(true);
//     document.addEventListener("WeixinJSBridgeReady", function () {
//         musicPlay(true);
//     }, false);
//     document.removeEventListener('DOMContentLoaded', musicInWeixinHandler);
// }

// function musicPlay(isPlay) {
//     var media = document.querySelector('#bg-music');
//     if (isPlay && media.paused) {
//         media.play();
//     }
//     if (!isPlay && !media.paused) {
//         media.pause();
//     }
// }
    // 获取画布的宽和高，后面计算使用



    function handleComplete() {
        document.querySelector('#canvas').style.display  = 'block';
        // document.querySelector('.start-game').style.opacity  = '1';
        document.querySelector('table').style.display = 'none';
        var canvas = document.getElementById('canvas')
        canvas.width = window.innerWidth;

        canvas.height = window.innerHeight;
        //创建舞台
        // var container = new createjs.Container(); //绘制外部容器
        // // stage.addChild(container);
        // var stage = new createjs.Stage(canvas);
        // //创建一个Shape对象，此处也可以创建文字Text,创建图片Bitmap
        // var rect = new createjs.Shape();
        // //用画笔设置颜色，调用方法画矩形，矩形参数：x,y,w,h
        // rect.graphics.beginFill("#f00").drawRect(0, 0, 100, 105);
        // //添加到舞台
        // stage.addChild(rect);
        // //刷新舞台
        // stage.update();
        // bg = new createjs.Bitmap("./images/btn.png");
        // bg.x = 11;
        // bg.y = 0;
        // //遮罩图形

        // stage.addChild(bg);
        // stage.update();
        console.log('完成');
    };

    var queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);

    // 加载资源
    queue.loadManifest(manifestList);
    queue.on("fileload", function (e) {
        // console.log(manifestList[0].src);
        document.getElementById('aas').innerHTML = window.proNum + '%';
    });
    //监听进度事件
    queue.on("progress", function (e) {
        window.proNum = Math.ceil(e.progress * 100);
        $("#progress").html(proNum + "%");
        // console.log(proNum);
    });
    // 添加"资源加载完成"事件
    queue.on("complete", handleComplete, this);

    $(function () {


        var main = document.getElementById('main'); //取到小球父元素
        var circles = main.getElementsByTagName('div'); //取到小球
        var st = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
        var json = [],
            arr = [],
            color = [];
        var maxW = 0;
        var maxH = 0;
        var cwidth = circles[0].offsetWidth; //对象可见宽度
        var cheight = circles[0].offsetHeight; //对象可见高度

        //根据浏览器窗口的大小自动调节小球的运动空间
        window.onresize = function () {
            var main = document.getElementById('main');
            maxW = window.innerWidth - circles[0].clientWidth; //小球运动的最大宽度
            maxH = window.innerHeight - circles[0].clientHeight; //小球运动的最大高度
            main.style.width = window.innerWidth + 'px';
            main.style.height = window.innerHeight + 'px';

        }
        onresize();
        //数组对象的初始化
        for (var i = 0; i < circles.length; i++) {
            arr = [];
            for (var j = 0; j < 6; j++) {
                color[j] = st[Math.floor(Math.random() * 16)]; //随机颜色
            }
            arr.x = Math.floor(Math.random() * (maxW + 1)); //初始x坐标
            arr.y = Math.floor(Math.random() * (maxH + 1)); //初始y坐标
            arr.cx = arr.x + circles[0].offsetWidth / 2; //圆心x坐标
            arr.cy = arr.y + circles[0].offsetHeight / 2; //圆心y坐标
            arr.movex = Math.floor(Math.random() * 2); //x轴移动方向
            arr.movey = Math.floor(Math.random() * 2); //y轴移动方向
            arr.bgolor = '#' + color.join(''); //随机生成一个6位字符串
            arr.speed = 2 + Math.floor(Math.random() * 5);
            //随机生成一个2~6之间的移动速度，也可以设为一个固定值（如果设置的改变速度太大，容易造成小球碰撞时两个小球之间有重合，也有可能小球会出界）
            arr.timer = null; //计时器
            arr.index = i; //索引值
            json.push(arr);
            circles[i].style.left = arr.x + 'px'; //小球位置初始化
            circles[i].style.top = arr.y + 'px'; //小球位置初始化
            circles[i].style.backgroundColor = arr.bgolor; //小球背景颜色初始化
        }
        //碰撞函数
        function crash(a) {
            var ball1x = json[a].cx;
            var ball1y = json[a].cy;
            for (var i = 0; i < json.length; i++) {
                if (i != a) {
                    var ball2x = json[i].cx;
                    var ball2y = json[i].cy;
                    //圆心距离的平方
                    var len = (ball1x - ball2x) * (ball1x - ball2x) + (ball1y - ball2y) * (ball1y - ball2y);
                    if (len <= cwidth * cwidth) {
                        //小球位置的判断，发生碰撞反应
                        if (ball1x > ball2x) {
                            if (ball1y > ball2y) {
                                json[a].movex = 1;
                                json[a].movey = 1;
                            } else if (ball1y < ball2y) {
                                json[a].movex = 1;
                                json[a].movey = 0;
                            } else {
                                json[a].movex = 1;
                            }
                        } else if (ball1x < ball2x) {
                            if (ball1y > ball2y) {
                                json[a].movex = 0;
                                json[a].movey = 0;
                            } else if (ball1y < ball2y) {
                                json[a].movex = 0;
                                json[a].movey = 1;
                            } else {
                                json[a].movex = 0;
                            }
                        } else {
                            if (ball1y > ball2y) {
                                json[a].movey = 1;
                            } else if (ball1y < ball2y) {
                                json[a].movey = 0;
                            }
                        }
                    }
                }

            }
        }
        //移动函数
        function move(circle) {
            circle.timer = setInterval(function () {
                if (circle.movex == 1) {
                    circle.x += circle.speed;
                    if (circle.x + circle.speed >= maxW) { //防止小球出界
                        circle.x = maxW;
                        circle.movex = 0; //小球运动方向发生改变
                    }
                } else {
                    circle.x -= circle.speed;
                    if (circle.x - circle.speed <= 0) {
                        circle.x = 0;
                        circle.movex = 1;
                    }
                }
                if (circle.movey == 1) {
                    circle.y += circle.speed;
                    if (circle.y + circle.speed >= maxH) {
                        circle.y = maxH;
                        circle.movey = 0;
                    }
                } else {
                    circle.y -= circle.speed;
                    if (circle.y - circle.speed <= 0) {
                        circle.y = 0;
                        circle.movey = 1;
                    }
                }
                circle.cx = circle.x + circles[0].offsetWidth / 2; //小球每一次运动圆心都会发生改变
                circle.cy = circle.y + circles[0].offsetHeight / 2;
                circles[circle.index].style.left = circle.x + 'px'; //小球位置重定位
                circles[circle.index].style.top = circle.y + 'px';
                crash(circle.index);
            }, 80);
        }
        //对每一个小球绑定计时器，让小球动起来
        for (var i = 0; i < circles.length; i++) {
            move(json[i]);
        }
    })