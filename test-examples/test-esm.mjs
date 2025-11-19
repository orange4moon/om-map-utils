/**
 * ES Module 格式测试示例
 */
import { wgs84ToGcj02, gcj02ToBd09, bd09ToWgs84 } from '../dist/om-map-utils.esm.js'

console.log('=== ES Module 测试 ===\n')

// 测试北京天安门坐标
const wgs84Coord = { lng: 116.397428, lat: 39.90923 }
console.log('原始坐标 (WGS-84):', wgs84Coord)

// WGS-84 转 GCJ-02
const gcj02Coord = wgs84ToGcj02(wgs84Coord.lng, wgs84Coord.lat)
console.log('转换为 GCJ-02:', gcj02Coord)

// GCJ-02 转 BD-09
const bd09Coord = gcj02ToBd09(gcj02Coord.lng, gcj02Coord.lat)
console.log('转换为 BD-09:', bd09Coord)

// BD-09 转回 WGS-84
const wgs84Result = bd09ToWgs84(bd09Coord.lng, bd09Coord.lat)
console.log('转换回 WGS-84:', wgs84Result)

// 验证精度
const lngDiff = Math.abs(wgs84Result.lng - wgs84Coord.lng)
const latDiff = Math.abs(wgs84Result.lat - wgs84Coord.lat)
console.log('\n精度验证:')
console.log('经度误差:', lngDiff.toFixed(8))
console.log('纬度误差:', latDiff.toFixed(8))
console.log('转换', (lngDiff < 0.00001 && latDiff < 0.00001) ? '✓ 成功' : '✗ 失败')

