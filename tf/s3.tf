resource "aws_s3_bucket" "pandator_assets" {
  bucket = "pandator-assets"
}

# パブリックアクセスブロック設定を無効化（公開するため）
resource "aws_s3_bucket_public_access_block" "public_images" {
  bucket = aws_s3_bucket.pandator_assets.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# バケットポリシーで公開読み取りアクセスを許可
resource "aws_s3_bucket_policy" "public_read" {
  bucket = aws_s3_bucket.pandator_assets.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.pandator_assets.arn}/*"
      }
    ]
  })

  # パブリックアクセスブロック設定が適用された後に実行
  depends_on = [aws_s3_bucket_public_access_block.public_images]
}