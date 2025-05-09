/*
 * @Author:Kerwin
 * @Date:2024-03-29 13:51:59
 * @LastEditors:Kerwin
 * @LastEditTime:2024-03-29 14:05:37
 * @Description:
 */

const { execSync } = require('child_process')
const { existsSync } = require('fs')
const { join } = require('path')

// 定義需要檢測的包前綴
const prefixes = ['@zuellig-pharma-2']

const packageJsonPath = join(__dirname, 'package.json')
const packageJson = require(packageJsonPath)
const dependencies = { ...packageJson.dependencies }

const dependencyNames = Object.keys(dependencies)

for (const packageName of dependencyNames) {
  if (prefixes.some(prefix => packageName.startsWith(prefix))) {
    // 若packageJsonPath包含node_modules => 代表是在node_modules中，要使用packageJsonPath取到nodules_modules的路徑，再加上packageName
    const packagePath = packageJsonPath.includes('node_modules')
      ? join(packageJsonPath.substring(0, packageJsonPath.indexOf('node_modules')), 'node_modules', packageName)
      : join(__dirname, 'node_modules', packageName)
    const prismaPath = join(packagePath, 'prisma')
    const prismaClientPath = join(packagePath, 'client')

    // 檢查 prisma 資料夾是否存在
    if (existsSync(prismaPath)) {
      // 檢查 client 是否不存在 => 要運行 prisma generate
      if (!existsSync(prismaClientPath)) {
        try {
          execSync('npx prisma generate', { stdio: 'inherit', cwd: packagePath })
          console.log(`在 ${packageName} 中成功運行 npx prisma generate。`)
        } catch (error) {
          console.error(`在 ${packageName} 中運行 npx prisma generate 失敗:`, error)
        }
      }
    }
  }
}

console.log('postInstall.js 執行完成。')