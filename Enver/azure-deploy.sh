#!/usr/bin/env bash
# =========================================================================
# ENVER AI TECH — MICROSOFT AZURE DEPLOYMENT SCRIPT (BASH)
# =========================================================================
set -e

echo "=========================================="
echo "   ENVER AI TECH — AZURE DEPLOYMENT       "
echo "=========================================="

if ! command -v az &> /dev/null; then
    echo "[!] Azure CLI ('az') is not installed. Please install it from: https://aka.ms/installazurecliwindows"
    exit 1
fi

RESOURCE_GROUP="enver-ai-rg"
LOCATION="centralindia" # or "eastus", "westeurope"
CONTAINER_APP_NAME="enver-web-app"
ENVIRONMENT_NAME="enver-container-env"

echo "[Step 1/4] Ensuring Azure login..."
az account show > /dev/null || az login

echo "[Step 2/4] Ensuring Resource Group '$RESOURCE_GROUP'..."
az group create --name "$RESOURCE_GROUP" --location "$LOCATION" --output table

echo "[Step 3/4] Deploying via Azure Container Apps (Source to Cloud)..."
az containerapp up \
    --name "$CONTAINER_APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --location "$LOCATION" \
    --environment "$ENVIRONMENT_NAME" \
    --source . \
    --ingress external \
    --target-port 8080 \
    --env-vars NODE_ENV=production PORT=8080 \
    --output table

APP_URL=$(az containerapp show --name "$CONTAINER_APP_NAME" --resource-group "$RESOURCE_GROUP" --query "properties.configuration.ingress.fqdn" -o tsv)

echo "========================================================"
echo " [SUCCESS] ENVER AI TECH DEPLOYED TO AZURE CONTAINER APPS!"
echo " Live URL: https://$APP_URL"
echo "========================================================"
echo "To bind custom domain 'enveraitech.com':"
echo "az containerapp hostname add --name $CONTAINER_APP_NAME --resource-group $RESOURCE_GROUP --hostname enveraitech.com"
