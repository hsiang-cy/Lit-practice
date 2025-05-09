/*
 * @Author:Kerwin
 * @Date:2023-10-27 17:07:48
 * LastEditors: Mike Huang
 * LastEditTime: 2025-01-21 15:09:23
 * @Description:
 */

import * as crypto from 'crypto'
import {
  Injectable
} from '@nestjs/common'

import * as bcrypt from 'bcrypt'

import {
  Config
} from './config'

type CipherGCMTypes = 'aes-128-gcm' | 'aes-192-gcm' | 'aes-256-gcm'

interface EncryptionOption {
  bcryptSalt: number
  secret: string
  iv: string
  aes: CipherGCMTypes
}

@Injectable()
export class Encryption {
  private readonly encryptionOption: EncryptionOption

  constructor (
    private readonly appConfig: Config
  ) {
    const config = this.appConfig.appConfig.encryption
    this.encryptionOption = { ...config }
  }

  encryption (str: string): string {
    return bcrypt.hashSync(str, this.encryptionOption.bcryptSalt)
  }

  compare (encrypted: string, plain: string): boolean {
    return bcrypt.compareSync(encrypted, plain)
  }

  AESencode (text: string): string {
    const cipher = crypto.createCipheriv(
      this.encryptionOption.aes,
      this.encryptionOption.secret,
      this.encryptionOption.iv
    )

    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()])
    const tag = cipher.getAuthTag()

    return Buffer.concat([tag, encrypted]).toString('base64')
  }

  AESdecode (text: string): string {
    const b = Buffer.from(text, 'base64')
    const tag = b.slice(0, 16)
    const encrypted = b.slice(16)

    const decipher = crypto.createDecipheriv(
      this.encryptionOption.aes,
      this.encryptionOption.secret,
      this.encryptionOption.iv
    )
    decipher.setAuthTag(tag)

    const decoded = decipher.update(encrypted, undefined, 'utf8')

    return decoded + decipher.final('utf8')
  }
}
