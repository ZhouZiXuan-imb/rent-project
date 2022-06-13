// 声明轮播图数据请求地址
// export const carouselDataApi = () => '/home/swiper';
// // 声明导航数据请求地址;   写的死数据。。。不需要API
// // export const NavDataApi = () => "";
// // 声明租房小组数据请求地址
// export const rentalTeamDataApi = () => "/home/groups";
// // 声明资讯数据请求地址
// export const NewsDataApi = () => "/home/news"

interface HomeUseApiInterface {
    carouselDataApi: string
    rentalTeamDataApi: string
    NewsDataApi: string
}

interface AreaUseApiInterface {
    cityNameDataApi: string
    // 获取城市列表数据
    cityDataApi: string
    hotCityDataApi: string
    currentCityHouse: string
    map: string
}

interface HouseUseApiInterface {
    houseListApi: string
    houseCondition: string
}

// 配置首页需要的API
export const homeUseAPI: HomeUseApiInterface = {
    carouselDataApi: '/home/swiper',
    rentalTeamDataApi: "/home/groups",
    NewsDataApi: "/home/news",
}

export const areaUseApi: AreaUseApiInterface = {
    cityNameDataApi: "/area/info",
    // 获取城市列表数据
    cityDataApi: "/area/city",
    // 获取热门城市列表数据
    hotCityDataApi: "/area/hot",
    map: '/area/map',
    currentCityHouse: "/area/map"
}

export const houseUseApi: HouseUseApiInterface = {
    // 根据房屋信息查询房屋
    houseListApi: "/houses",
    // 获取当前城市房屋信息
    houseCondition: "/houses/condition",
}