// 声明方法获取城市列表数据
export const cityListFormat = async (list) => {
    // 声明变量存储获取到的城市列表数据
    const cityList = {};

    // 要把每个城市的首字母当作对象的键添加到对象中，forEach循环遍历获取到的数据
    for (const key in list) {
        // 声明变量每一次存储当前遍历到的城市的首字母
        let firstLetter = list[key].short.slice(0, 1)

        // 循环遍历到每一个元素的时候都要判断当前的这个键是否已经存在数组中了，如果存在数组中，那么就把当前这个元素添加到数组中
        if (firstLetter in cityList) {
            cityList[firstLetter].push(list[key]);
        } else {
            cityList[firstLetter] = [list[key]]
        }
    }

    // 把每一个城市的首字母添加到cityIndex数组中
    const cityIndex = Object.keys(cityList).sort();

    // 声明变量存储每一个
    return {cityList, cityIndex}
}