export const baseUrl = process.env.API_BASE_URL;

export default ({
    // 推荐模块下
    recommend: {
        // 广告
        advert: {
            url: '/advert',
            method: 'GET'
        },
        // 歌单
        playlist: {
            url: '/playlist',
            method: 'GET'
        }
    }    
});