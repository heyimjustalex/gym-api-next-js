# !/bin/bash
set -e
echo "Deploying to ${DEPLOYMENT_ENVIRONMENT}"
export CLOUDSDK_CORE_DISABLE_PROMPTS=1
echo $GCP_PROJECT_KEY 
