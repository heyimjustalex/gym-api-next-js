gcloud version
gcloud auth activate-service-account ${ACCOUNT_ID} --key-file ${HOME}/gcloud-service-key.json
gcloud config set project $PROJECT_ID
gcloud --quiet config set container/cluster $CLUSTER_NAME
gcloud config set compute/zone $CLOUDSDK_COMPUTE_ZONE
gcloud --quiet container clusters get-credentials $CLUSTER_NAME
docker build -t gcr.io/${PROJECT_ID}/${REG_ID}:$CIRCLE_SHA1 .
gcloud docker -- push gcr.io/${PROJECT_ID}/${REG_ID}:$CIRCLE_SHA1
kubectl set image deployment/${DEPLOYMENT_NAME} ${CONTAINER_NAME}=gcr.io/${PROJECT_ID}/${REG_ID}:$CIRCLE_SHA1
echo " Successfully deployed to ${DEPLOYMENT_ENVIRONMENT}"