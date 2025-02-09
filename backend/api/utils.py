import boto3
import json
from botocore.exceptions import ClientError

def generate_ai_response(messages,system):
    # AWS credentials
    aws_access_key = "AKIAUTJ7AYWXNHD2644N"
    aws_secret_key = "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"

    client = boto3.client(
        "bedrock-runtime",
        region_name="us-west-2",
        aws_access_key_id=aws_access_key,
        aws_secret_access_key=aws_secret_key
    )

    model_id = "anthropic.claude-3-5-sonnet-20241022-v2:0"

    native_request = {
        "anthropic_version": "bedrock-2023-05-31",
        "temperature": 0.5,
        "max_tokens": 512,
        "messages": messages,
        "system": [
            {
                "type": "text",
                "text": system
            }
        ],
    }

    try:
        response = client.invoke_model(modelId=model_id, body=json.dumps(native_request))
        model_response = json.loads(response["body"].read())
        return {"status": "success", "response": model_response["content"][0]["text"]}
    except (ClientError, Exception) as e:
        return {"status": "error", "message": str(e)}
