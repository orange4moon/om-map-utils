/**
 * 地图坐标转换工具函数
 * 支持 WGS-84、GCJ-02、BD-09 三种坐标系之间的相互转换
 */

/**
 * 判断坐标是否在中国境外
 * @param {number} lng 经度
 * @param {number} lat 纬度
 * @returns {boolean}
 */
function outOfChina(lng, lat) {
  return lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271
}

/**
 * 纬度转换辅助函数
 * @param {number} lng 经度
 * @param {number} lat 纬度
 * @returns {number}
 */
function transformLat(lng, lat) {
  const pi = 3.1415926535897932384626
  let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng))
  ret += ((20.0 * Math.sin(6.0 * lng * pi) + 20.0 * Math.sin(2.0 * lng * pi)) * 2.0) / 3.0
  ret += ((20.0 * Math.sin(lat * pi) + 40.0 * Math.sin((lat / 3.0) * pi)) * 2.0) / 3.0
  ret += ((160.0 * Math.sin((lat / 12.0) * pi) + 320 * Math.sin((lat * pi) / 30.0)) * 2.0) / 3.0
  return ret
}

/**
 * 经度转换辅助函数
 * @param {number} lng 经度
 * @param {number} lat 纬度
 * @returns {number}
 */
function transformLng(lng, lat) {
  const pi = 3.1415926535897932384626
  let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng))
  ret += ((20.0 * Math.sin(6.0 * lng * pi) + 20.0 * Math.sin(2.0 * lng * pi)) * 2.0) / 3.0
  ret += ((20.0 * Math.sin(lng * pi) + 40.0 * Math.sin((lng / 3.0) * pi)) * 2.0) / 3.0
  ret += ((150.0 * Math.sin((lng / 12.0) * pi) + 300.0 * Math.sin((lng / 30.0) * pi)) * 2.0) / 3.0
  return ret
}

/**
 * WGS-84 坐标转 GCJ-02 坐标（火星坐标系）
 * GPS坐标系 -> 高德/腾讯地图坐标系
 * @param {number} lng WGS-84 经度
 * @param {number} lat WGS-84 纬度
 * @returns {{lng: number, lat: number}} GCJ-02 坐标对象
 * @example
 * const gcj = wgs84ToGcj02(116.397428, 39.90923)
 * console.log(gcj) // { lng: 116.40384825949647, lat: 39.91640428150164 }
 */
export function wgs84ToGcj02(lng, lat) {
  const pi = 3.1415926535897932384626
  const a = 6378245.0 // 长半轴
  const ee = 0.00669342162296594323 // 偏心率平方

  // 如果在中国境外，不做偏移
  if (outOfChina(lng, lat)) {
    return { lng: lng, lat: lat }
  }

  let dLat = transformLat(lng - 105.0, lat - 35.0)
  let dLng = transformLng(lng - 105.0, lat - 35.0)
  const radLat = (lat / 180.0) * pi
  let magic = Math.sin(radLat)
  magic = 1 - ee * magic * magic
  const sqrtMagic = Math.sqrt(magic)
  dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * pi)
  dLng = (dLng * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * pi)

  const mgLat = lat + dLat
  const mgLng = lng + dLng

  return {
    lng: mgLng,
    lat: mgLat
  }
}

/**
 * GCJ-02 坐标转 BD-09 坐标（百度坐标系）
 * 高德/腾讯地图坐标系 -> 百度地图坐标系
 * @param {number} lng GCJ-02 经度
 * @param {number} lat GCJ-02 纬度
 * @returns {{lng: number, lat: number}} BD-09 坐标对象
 * @example
 * const bd = gcj02ToBd09(116.40384825949647, 39.91640428150164)
 * console.log(bd) // { lng: 116.41024449916938, lat: 39.92265661860669 }
 */
export function gcj02ToBd09(lng, lat) {
  const xPi = (3.14159265358979324 * 3000.0) / 180.0
  const z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * xPi)
  const theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * xPi)
  const bdLng = z * Math.cos(theta) + 0.0065
  const bdLat = z * Math.sin(theta) + 0.006

  return {
    lng: bdLng,
    lat: bdLat
  }
}

/**
 * WGS-84 坐标直接转 BD-09 坐标（百度坐标系）
 * GPS坐标系 -> 百度地图坐标系
 * @param {number} lng WGS-84 经度
 * @param {number} lat WGS-84 纬度
 * @returns {{lng: number, lat: number}} BD-09 坐标对象
 * @example
 * const bd = wgs84ToBd09(116.397428, 39.90923)
 * console.log(bd) // { lng: 116.41024449916938, lat: 39.92265661860669 }
 */
export function wgs84ToBd09(lng, lat) {
  // 先转换为 GCJ-02
  const gcj = wgs84ToGcj02(lng, lat)
  // 再转换为 BD-09
  return gcj02ToBd09(gcj.lng, gcj.lat)
}

/**
 * BD-09 坐标转 GCJ-02 坐标
 * 百度地图坐标系 -> 高德/腾讯地图坐标系
 * @param {number} lng BD-09 经度
 * @param {number} lat BD-09 纬度
 * @returns {{lng: number, lat: number}} GCJ-02 坐标对象
 */
export function bd09ToGcj02(lng, lat) {
  const xPi = (3.14159265358979324 * 3000.0) / 180.0
  const x = lng - 0.0065
  const y = lat - 0.006
  const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * xPi)
  const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * xPi)
  const gcjLng = z * Math.cos(theta)
  const gcjLat = z * Math.sin(theta)

  return {
    lng: gcjLng,
    lat: gcjLat
  }
}

/**
 * GCJ-02 坐标转 WGS-84 坐标（高精度二分迭代法）
 * 高德/腾讯地图坐标系 -> GPS坐标系
 * @param {number} lng GCJ-02 经度
 * @param {number} lat GCJ-02 纬度
 * @returns {{lng: number, lat: number}} WGS-84 坐标对象
 */
export function gcj02ToWgs84(lng, lat) {
  if (outOfChina(lng, lat)) {
    return { lng: lng, lat: lat }
  }

  // 使用二分迭代法进行精确转换
  // 这个方法通过多次迭代逼近，确保误差在1米以内
  const threshold = 0.00001 // 约1米的精度
  let wgsLng = lng
  let wgsLat = lat

  // 初始估算（镜像法作为起点）
  const tmpGcj = wgs84ToGcj02(lng, lat)
  wgsLng = lng * 2 - tmpGcj.lng
  wgsLat = lat * 2 - tmpGcj.lat

  // 迭代优化，最多10次
  for (let i = 0; i < 10; i++) {
    const gcj = wgs84ToGcj02(wgsLng, wgsLat)
    const dLng = gcj.lng - lng
    const dLat = gcj.lat - lat

    // 如果误差足够小，退出迭代
    if (Math.abs(dLng) < threshold && Math.abs(dLat) < threshold) {
      break
    }

    // 调整WGS-84坐标
    wgsLng -= dLng
    wgsLat -= dLat
  }

  return {
    lng: wgsLng,
    lat: wgsLat
  }
}

/**
 * BD-09 坐标转 WGS-84 坐标
 * 百度地图坐标系 -> GPS坐标系
 * @param {number} lng BD-09 经度
 * @param {number} lat BD-09 纬度
 * @returns {{lng: number, lat: number}} WGS-84 坐标对象
 */
export function bd09ToWgs84(lng, lat) {
  // 先转换为 GCJ-02
  const gcj = bd09ToGcj02(lng, lat)
  // 再转换为 WGS-84
  return gcj02ToWgs84(gcj.lng, gcj.lat)
}

/**
 * 批量转换坐标
 * @param {Array<{lng: number, lat: number}>} points 坐标点数组
 * @param {Function} convertFunc 转换函数
 * @returns {Array<{lng: number, lat: number}>} 转换后的坐标数组
 * @example
 * const wgs84Points = [{ lng: 116.397428, lat: 39.90923 }, { lng: 116.398428, lat: 39.91023 }]
 * const gcj02Points = batchConvert(wgs84Points, wgs84ToGcj02)
 */
export function batchConvert(points, convertFunc) {
  return points.map((point) => convertFunc(point.lng, point.lat))
}

