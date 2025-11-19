# om-map-utils

JS 地图坐标转换工具库，支持 WGS-84、GCJ-02、BD-09 三种坐标系之间的相互转换。

## 🌐 在线演示

访问 [在线演示页面](https://orange4moon.github.io/om-map-utils/) 查看实时转换效果。

## 📦 安装

```bash
npm install om-map-utils
```

或使用 yarn：

```bash
yarn add om-map-utils
```

或通过 CDN 直接引入：

```html
<!-- 使用 unpkg -->
<script src="https://unpkg.com/om-map-utils/dist/om-map-utils.min.js"></script>

<!-- 使用 jsdelivr -->
<script src="https://cdn.jsdelivr.net/npm/om-map-utils/dist/om-map-utils.min.js"></script>
```

## 🚀 快速开始

### ES Module

```javascript
import { wgs84ToGcj02, gcj02ToBd09, bd09ToWgs84 } from 'om-map-utils'

// WGS-84 转 GCJ-02（GPS坐标 -> 高德/腾讯地图）
const gcj = wgs84ToGcj02(116.397428, 39.90923)
console.log(gcj) // { lng: 116.40384825949647, lat: 39.91640428150164 }

// GCJ-02 转 BD-09（高德/腾讯地图 -> 百度地图）
const bd = gcj02ToBd09(116.40384825949647, 39.91640428150164)
console.log(bd) // { lng: 116.41024449916938, lat: 39.92265661860669 }

// BD-09 转 WGS-84（百度地图 -> GPS坐标）
const wgs = bd09ToWgs84(116.41024449916938, 39.92265661860669)
console.log(wgs) // { lng: 116.397428, lat: 39.90923 }
```

### CommonJS

```javascript
const { wgs84ToGcj02, gcj02ToBd09 } = require('om-map-utils')

const gcj = wgs84ToGcj02(116.397428, 39.90923)
console.log(gcj)
```

### <script> 标签

```html
<script src="https://unpkg.com/om-map-utils/dist/om-map-utils.min.js"></script>
<script>
  // 全局变量 MapUtils
  const gcj = MapUtils.wgs84ToGcj02(116.397428, 39.90923)
  console.log(gcj)
  
  const bd = MapUtils.wgs84ToBd09(116.397428, 39.90923)
  console.log(bd)
</script>
```

## 📖 API 文档

### 坐标系说明

| 坐标系 | 说明 | 使用场景 |
|---------|------|----------|
| **WGS-84** | 国际标准坐标系，GPS 原始坐标 | GPS 设备、国际地图（如 Google Maps 国际版、OpenStreetMap） |
| **GCJ-02** | 中国国家测绘局制定的加密坐标系，俗称"火星坐标" | 高德地图、腾讯地图、Google Maps 中国版 |
| **BD-09** | 百度公司在 GCJ-02 基础上进行二次加密的坐标系 | 百度地图 |

### 核心方法

#### `wgs84ToGcj02(lng, lat)`

WGS-84 坐标转 GCJ-02 坐标（火星坐标系）

- **参数：**
  - `lng` {number} - WGS-84 经度
  - `lat` {number} - WGS-84 纬度
- **返回：** `{lng: number, lat: number}` - GCJ-02 坐标对象

```javascript
const gcj = wgs84ToGcj02(116.397428, 39.90923)
// => { lng: 116.40384825949647, lat: 39.91640428150164 }
```

#### `gcj02ToWgs84(lng, lat)`

GCJ-02 坐标转 WGS-84 坐标（高精度二分迭代法）

- **参数：**
  - `lng` {number} - GCJ-02 经度
  - `lat` {number} - GCJ-02 纬度
- **返回：** `{lng: number, lat: number}` - WGS-84 坐标对象

```javascript
const wgs = gcj02ToWgs84(116.40384825949647, 39.91640428150164)
// => { lng: 116.397428, lat: 39.90923 }
```

#### `gcj02ToBd09(lng, lat)`

GCJ-02 坐标转 BD-09 坐标（百度坐标系）

- **参数：**
  - `lng` {number} - GCJ-02 经度
  - `lat` {number} - GCJ-02 纬度
- **返回：** `{lng: number, lat: number}` - BD-09 坐标对象

```javascript
const bd = gcj02ToBd09(116.40384825949647, 39.91640428150164)
// => { lng: 116.41024449916938, lat: 39.92265661860669 }
```

#### `bd09ToGcj02(lng, lat)`

BD-09 坐标转 GCJ-02 坐标

- **参数：**
  - `lng` {number} - BD-09 经度
  - `lat` {number} - BD-09 纬度
- **返回：** `{lng: number, lat: number}` - GCJ-02 坐标对象

```javascript
const gcj = bd09ToGcj02(116.41024449916938, 39.92265661860669)
// => { lng: 116.40384825949647, lat: 39.91640428150164 }
```

#### `wgs84ToBd09(lng, lat)`

WGS-84 坐标直接转 BD-09 坐标

- **参数：**
  - `lng` {number} - WGS-84 经度
  - `lat` {number} - WGS-84 纬度
- **返回：** `{lng: number, lat: number}` - BD-09 坐标对象

```javascript
const bd = wgs84ToBd09(116.397428, 39.90923)
// => { lng: 116.41024449916938, lat: 39.92265661860669 }
```

#### `bd09ToWgs84(lng, lat)`

BD-09 坐标转 WGS-84 坐标

- **参数：**
  - `lng` {number} - BD-09 经度
  - `lat` {number} - BD-09 纬度
- **返回：** `{lng: number, lat: number}` - WGS-84 坐标对象

```javascript
const wgs = bd09ToWgs84(116.41024449916938, 39.92265661860669)
// => { lng: 116.397428, lat: 39.90923 }
```

#### `batchConvert(points, convertFunc)`

批量转换坐标

- **参数：**
  - `points` {Array<{lng: number, lat: number}>} - 坐标点数组
  - `convertFunc` {Function} - 转换函数
- **返回：** `Array<{lng: number, lat: number}>` - 转换后的坐标数组

```javascript
const wgs84Points = [
  { lng: 116.397428, lat: 39.90923 },
  { lng: 116.398428, lat: 39.91023 }
]
const gcj02Points = batchConvert(wgs84Points, wgs84ToGcj02)
// => [
//   { lng: 116.40384825949647, lat: 39.91640428150164 },
//   { lng: 116.40484925949647, lat: 39.91740528150164 }
// ]
```

## 📊 转换关系图

```
       wgs84ToGcj02         gcj02ToBd09
WGS-84 ============> GCJ-02 ============> BD-09
  ▲                    ▲                    |
  |                    |                    |
  |   gcj02ToWgs84     |    bd09ToGcj02    |
  +===================<+===================<+
              
           wgs84ToBd09 (直接转换)
  WGS-84 ==============================> BD-09
    ▲                                      |
    |         bd09ToWgs84 (直接转换)      |
    +======================================+
```

## 📄 License

MIT License

