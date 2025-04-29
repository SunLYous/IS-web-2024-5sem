import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { ManagedUpload } from 'aws-sdk/clients/s3';

@Injectable()
export class StorageService {
  private readonly s3: S3;
  private readonly bucket: string;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      endpoint: this.configService.get<string>('S3_ENDPOINT'),
      region: this.configService.get<string>('S3_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('S3_SECRET_KEY_ID') || '',
        secretAccessKey: this.configService.get<string>('S3_SECRET_KEY') || '',
      },
    });

    this.bucket = this.configService.get<string>('S3_BUCKET') || '';
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileExtension = extname(file.originalname);
    const key = `products/${uuidv4()}${fileExtension}`;
    const uploadResult: ManagedUpload.SendData = await this.s3
      .upload({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      })
      .promise();

    return uploadResult.Location;
  }
}
