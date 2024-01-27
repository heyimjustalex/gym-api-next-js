# !/bin/bash
set -e
echo "Deploying to ${DEPLOYMENT_ENVIRONMENT}"
export CLOUDSDK_CORE_DISABLE_PROMPTS=1
echo $ACCOUNT_KEY_STAGING > service_key.txt
base64 -i service_key.txt -d > ${HOME}/gcloud-service-key.json
curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-461.0.0-linux-x86_64.tar.gz
tar -xf google-cloud-cli-461.0.0-linux-x86_64.tar.gz
./google-cloud-sdk/install.sh

CLOUDSDK_INSTALL_DIR="$HOME/google-cloud-sdk"
cat ./google-cloud-sdk/path.bash.inc
echo $HOME/.bashrc


