# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-11-19

### Added
- 初始版本发布
- 支持 WGS-84、GCJ-02、BD-09 三种坐标系之间的相互转换
- 提供 `wgs84ToGcj02` 函数：WGS-84 转 GCJ-02
- 提供 `gcj02ToWgs84` 函数：GCJ-02 转 WGS-84（高精度迭代法）
- 提供 `gcj02ToBd09` 函数：GCJ-02 转 BD-09
- 提供 `bd09ToGcj02` 函数：BD-09 转 GCJ-02
- 提供 `wgs84ToBd09` 函数：WGS-84 直接转 BD-09
- 提供 `bd09ToWgs84` 函数：BD-09 直接转 WGS-84
- 提供 `batchConvert` 函数：批量转换坐标
- 支持多种模块格式：UMD、ES Module、CommonJS
- 提供 TypeScript 类型定义文件
- 在线演示页面
- 完整的文档和示例

