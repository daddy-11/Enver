#!/bin/bash
# ==============================================================================
# Enver AI Tech (enveraitech.com) — Google Cloud Run Production Deployment
# Region: asia-south1 (Mumbai)
# ==============================================================================

set -e

PROJECT_ID=$(gcloud config get-value project 2>/dev/null || echo "enveraitech-prod")
REGION="asia-south1"
SERVICE_NAME="enveraitech-com"
IMAGE_TAG="gcr.io/${PROJECT_ID}/${SERVICE_NAME}:latest"

echo "🚀 Building Docker container image via Cloud Build..."
gcloud builds submit --tag "${IMAGE_TAG}" .

echo "📦 Deploying to Google Cloud Run in region ${REGION}..."
gcloud run deploy "${SERVICE_NAME}" \
  --image "${IMAGE_TAG}" \
  --platform managed \
  --region "${REGION}" \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 1 \
  --max-instances 10 \
  --set-env-vars NODE_ENV=production

echo "✅ Production deployment complete!"
gcloud run services describe "${SERVICE_NAME}" --platform managed --region "${REGION}" --format 'value(status.url)'
