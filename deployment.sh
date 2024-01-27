# !/bin/bash
set -e
echo "Deploying to ${DEPLOYMENT_ENVIRONMENT}"
export CLOUDSDK_CORE_DISABLE_PROMPTS=1
echo $GCP_PROJECT_KEY > service_key.txt
base64 -i service_key.txt -d > ${HOME}/gcloud-service-key.json
cat ${HOME}/gcloud-service-key.json


