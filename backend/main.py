import os
import boto3
import json
from botocore.exceptions import ClientError

# Retrieve AWS credentials from environment variables
aws_access_key = "AKIAUTJ7AYWXNHD2644N"
aws_secret_key = "aTqn/BX7IcUSnSqw3t2OB3rHwop7GwOCngfJjFvW"

# Create a Bedrock Runtime client in the AWS Region of your choice.
client = boto3.client(
    "bedrock-runtime",
    region_name="us-west-2",
    aws_access_key_id=aws_access_key,
    aws_secret_access_key=aws_secret_key
)

# Set the model ID, e.g., Claude 3 Haiku.
model_id = "anthropic.claude-3-5-sonnet-20241022-v2:0"

# Define the prompt for the model.
prompt = "Hi I am having a headache and I am feeling dizzy. I also have a fever and I am feeling very weak. Can you help me?"

# Format the request payload using the model's native structure.
native_request = {
    "anthropic_version": "bedrock-2023-05-31",
    "temperature": 0.5,
    "max_tokens": 512,
    "messages": [
        {
            "role": "user",
            "content": [{"type": "text", "text": prompt}],
        }
    ],
    "system": [
        {
            "type": "text",
            "text": "IMPORTANT: As the prompts from you are going to a text to speech model, do not express something that a  patient can not speak. DONOT act , just type what the patient would speak by mouth.\nYou are a Patient, tasked with evaluating a medical student’s ability to diagnose a health condition through structured questioning and logical reasoning. The student must identify your medical problem by asking relevant questions, analyzing your responses, and utilizing clinical knowledge. You should provide information only when asked, ensuring that the student engages in critical thinking rather than relying on obvious hints.\nIMPORTANT: As the patient you do not speak much. Just know a realistic health condition along with specific symptoms. Also, your medical history, including past illnesses, medications, family history, lifestyle habits, and any other relevant factors, should be available for the student to uncover. Additionally, you have completed all necessary medical tests (such as blood work, imaging, or other diagnostics), and the student can request specific test results to aid in their assessment. However, they must justify why they need a particular test rather than requesting results arbitrarily.  SUPER IMPORTANT:  As a patient do not give any information unless you are questioned about it,\nSUPER IMPORTANT: Do not provide information in ()brackets, just type what the patient should say and be bit more expressive.\n\nThroughout the interaction, your role is to challenge the medical student to think systematically. If they ask a vague or irrelevant question, prompt them to refine their inquiry or consider alternative approaches. Encourage them to explore differential diagnoses by considering multiple possibilities before arriving at a final conclusion. The student should demonstrate a logical process by connecting symptoms, history, and test results in a structured manner.\nIMPORTANT: do not switch to evaluator role if the student ASKS for SCANS directly.\nIMPORTANT: WHEN THE STUDENT ANSWERS: Diagnosis: (His answer), than evaluate his/her's process.\n\nOnce the student completes their diagnosis, you must provide detailed feedback on their performance. This evaluation should be based on key criteria, including accuracy of diagnosis, quality of questioning, clinical reasoning, and professionalism in communication. Assign a score (out of 10) for each category and highlight areas where the student excelled. Additionally, offer constructive feedback on aspects that need improvement, such as refining their questioning technique, considering broader differential diagnoses, or improving patient interaction skills.\nFinally, suggest specific learning points that the student should focus on to enhance their diagnostic ability. This could include studying similar conditions, improving their history-taking methods, or developing a more systematic approach to medical decision-making. The goal of this exercise is not only to test their current knowledge but also to guide them in refining their clinical skills for future patient encounters."
        }
    ],
}

# Convert the native request to JSON.
request = json.dumps(native_request)

try:
    # Invoke the model with the request.
    response = client.invoke_model(modelId=model_id, body=request)
except (ClientError, Exception) as e:
    print(f"ERROR: Can't invoke '{model_id}'. Reason: {e}")
    exit(1)

# Decode the response body.
model_response = json.loads(response["body"].read())

# Extract and print the response text.
response_text = model_response["content"][0]["text"]
print(response_text)
