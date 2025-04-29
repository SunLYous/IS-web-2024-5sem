import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

@Injectable()
export class S3Service {
  private s3: S3Client;
  private bucket: string;

  constructor() {
    const region = process.env.S3_REGION ?? '';
    const endpoint = process.env.S3_ENDPOINT ?? '';
    const accessKeyId = process.env.S3_SECRET_KEY_ID ?? '';
    const secretAccessKey = process.env.S3_SECRET_KEY ?? '';
    const bucket = process.env.S3_BUCKET ?? '';

    if (!region || !endpoint || !accessKeyId || !secretAccessKey || !bucket) {
      throw new Error(
        'S3 configuration is incomplete. Please check environment variables.',
      );
    }

    this.s3 = new S3Client({
      region,
      endpoint,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      forcePathStyle: true,
    });

    this.bucket = bucket;
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileKey = `${randomUUID()}-${file.originalname}`;

    try {
      await this.s3.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: fileKey,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw new Error('Failed to upload file to S3');
    }

    return `${process.env.S3_ENDPOINT}/${this.bucket}/${fileKey}`;
  }
}
