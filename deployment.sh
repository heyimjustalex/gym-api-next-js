# !/bin/bash
set -e
echo "Deploying to ${DEPLOYMENT_ENVIRONMENT}"
export CLOUDSDK_CORE_DISABLE_PROMPTS=1
echo $ACCOUNT_KEY_STAGING > service_key.txt
base64 -i service_key.txt -d > ${HOME}/gcloud-service-key.json
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

