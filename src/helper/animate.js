// 通过requestAnimateFrame频率函数来实现js动画
// 优点：
// setTimeout/setInterval的callback是在上一次的callback执行完成开始计时的也就是time = 设定的value + prev callback的时间，而raf是从callback开始执行时计时
// 当浏览器最小化的时候，raf是不会运行的，而setTimeout会运行
// 缺点：
// 需要手动书写函数控制FPS(时间间隔)

export default function animate (FPS = 60, cb, ...args) {
    let interval = 1000 / 60, // 间隔时间，多少毫秒刷新一次
        prevTime, currTime, delta, animateId;

    function createAnimateStart () {
        if (!prevTime) {
            prevTime = Date.now();
        }

        currTime = Date.now();
        // 当前时间-上次执行的时间 >= interval
        delta = currTime - prevTime;

        if (delta >= interval) {
            // 因为raf每13.64毫秒执行1次，也就是说currTime与prevTime的差可能大于0
            // 所以重新设置prevTime应该去掉多出的时间
            prevTime = currTime - (delta % interval);
            cb(...args);
        }

        animateId = requestAnimateFrame(createAnimateStart);
    }

    return {
        start() {
            animateId = requestAnimateFrame(createAnimateStart);
        },

        stop() {
            cancelAnimateFrame(animateId);
        }
    };
}