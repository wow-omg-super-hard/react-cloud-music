/**
  重写fetch
  1. 解决fetch不能超时的问题
  2. 解决fetch对4xx、5xx等异常还是返回resolve状态
  3. 解决fetch在跨域情况默认不会发送cookie
  4. 对errCode非0的逻辑处理
**/
const originFetch = fetch;

function checkHTTPStatus (resp) {
    if (resp.status >= 200 && resp.status < 300) {
        return resp.json();
    }   

    throw new Error(resp.statusText);
}

function checkBusiness (data) {
    if (!data.errCode) {
        return data.data;
    }

    // errCode非0情况下
    throw new Error(data.message);
}

export default function fetch (url, options) {
    // 在跨域情况下也能发送cookie
    options.credentials == null && (options.credentials = true);

    return new Promise((resolve, reject) => {
        // 超时处理(30s)
        setTimeout(() => {
            reject('与服务端连接超时!!!');
        }, 30000);

        originFetch(url, options)
            // 断网
            .catch((error) => { throw new Error('网络连接失败，请检查网络!!!') })
            // 4xx,5xx返回reject
            .then(checkHTTPStatus)
            // errCode非0逻辑处理
            .then(checkBusiness)
            .catch((error) => {
                reject(error.message)
            });
    });
}