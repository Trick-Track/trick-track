def sign_s3(request):
    S3_BUCKET = config('S3_BUCKET')

    file_name = request.GET['file_name']
    file_type = request.GET['file_type']

    s3 = boto3.client('s3',  aws_access_key_id=config('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=config('AWS_SECRET_ACCESS_KEY'))

    presigned_post = s3.generate_presigned_post(
    Bucket = S3_BUCKET,
    Key = file_name,
    Fields = {"acl": "public-read", "Content-Type": file_type},
    Conditions = [
      {"acl": "public-read"},
      {"Content-Type": file_type}
    ],
    ExpiresIn = 3600
    )

    return JsonResponse({
                        'data': presigned_post,
                        'url': 'https://%s.s3.amazonaws.com/%s' % (S3_BUCKET, file_name)
                        }, safe=False)