# 测试示例

这个目录包含了各种模块格式的测试示例。

## 运行测试

### ES Module 测试
```bash
node test-esm.mjs
```

### CommonJS 测试
```bash
node test-cjs.cjs
```

### 浏览器 UMD 测试
在浏览器中打开 `test-browser.html` 文件。

## 预期结果

所有测试应该显示：
- 坐标转换正常工作
- 精度误差小于 0.00001（约 1 米）
- 往返转换后坐标基本一致

